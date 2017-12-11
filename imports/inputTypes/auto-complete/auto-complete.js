/*jshint esversion: 6 */

import { Template } from 'meteor/templating';
import './auto-complete.html';
import { attsToggleInvalidClass } from '../../utilities/attsToggleInvalidClass';
import './jquery.materialize-autocomplete';

//add autoform input
AutoForm.addInputType('autocomplete', {
  template: 'afAutoComplete_materialize',
  valueOut: function() {
    return this.val();
  }
});

// helper functions
const activate = (instance) => {
  // add active class to label
  let acInput = instance.$('#acInput_'+instance.data.atts.id);
  if(acInput.length >= 1) {
    const acInputGreatGrandParent = acInput.parent().parent().parent();
    const label = acInputGreatGrandParent.find('label');
    label.addClass('active');
  }
};
const deactivate = (instance) => {
  // add active class to label
  let acInput = instance.$('#acInput_'+instance.data.atts.id);
  if(acInput.length >= 1) {
    // console.log('acInput[0]', acInput[0]);
    const acInputGreatGrandParent = acInput.parent().parent().parent();
    const label = acInputGreatGrandParent.find('label');
    label.removeClass('active');
  }
};

//when created
Template.afAutoComplete_materialize.onCreated(() => {
  const instance = Template.instance();

  //initialise value
  const value = instance.data.value?instance.data.value:
      instance.data.atts.default;
  instance.value = new ReactiveVar(value);
});

//when rendered
Template.afAutoComplete_materialize.onRendered(() => {
  const instance = Template.instance();

  // normalise autoComplete attributes
  const attsAc = instance.data.atts.autoComplete?
      instance.data.atts.autoComplete:{};

  // if multiple is enabled
  if (attsAc.multiple) {

    // set hidden select multiple attribute
    instance.$('.ac-hidden').attr('multiple', 'multiple');
  }

  //get value
  let value = instance.value.get();

  // if there is no initialised value and there is a default value
  if(_.isUndefined(value) && instance.data.atts.default) {

    // set the default value as value
    value = instance.data.atts.default;
  }

  //initialise autocomplete options
  let options;
  if(instance.data.atts && instance.data.selectOptions) {
    options = _.clone(instance.data.selectOptions);
  }
  else {
    options = {};
  }

  // if there is a value
  if(value) {

    // if multiple
    if (attsAc.multiple && _.isArray(value)) {

      // select each option in value in the hidden select
      _.each(value, (val) => {
        const selector = '.ac-hidden option[value="'+val+'"]';
        instance.$(selector).attr('selected', true);
      });
    }

    // else - singular or non array
    else {

      // select the option matching value in the hidden select
      const selector = '.ac-hidden option[value="'+value+'"]';
      instance.$(selector).attr('selected', true);
    }

    // add active class to label
    activate(instance);
  }

  // build materialize autocomplete options
  const acOptions = {
    value: value,
    limit: attsAc.displayLimit?attsAc.displayLimit:20,
    multiple: {
      enable: attsAc.multiple?attsAc.multiple:false,
      minSize: attsAc.minSize?attsAc.minSize:1,
      maxSize: attsAc.maxSize?attsAc.maxSize:1,
      onAppend: function (item) {

        // add active class to label
        activate(instance);
      },
      onExist: function (item) {
        // Materialize.toast('Tag: ' + item.text + '(' + item.id + ') is already added!', 2000);
      },
    },
    dropdown: {
        el: instance.$('.ac-dropdown'),
        itemTemplate: '<li class="ac-item" data-id="<%= item.id %>" '+
            'data-text=\'<%= item.text %>\'><a href="javascript:void(0)">'+
            '<%= item.highlight %></a></li>'
    },
    appender: {
      el: instance.$('.ac-append'),
    },
    hidden: {
      enable: true,
      el: instance.$('.ac-hidden'),
      inputName: instance.data.atts.name,
      required: true,
      id: instance.data.atts.id
    },
    getData(value, callback) {
      // console.log('AutoComplete.getData:', value);

      // get all options starting with value
      const matchingOptions = _.filter(options, (option) => {
        return option.label.toUpperCase().startsWith(value.toUpperCase());
      });
      // console.log('AutoComplete.matchingOptions:', matchingOptions);

      // map matching options {id, text}
      let dataId = 0;
      const data = _.map(matchingOptions, (option) => {
        dataId++;

        //highlight the value part of the option label
        let highlight = '<strong>'+option.label.substring(0, value.length)+'</strong>'+
            option.label.substring(value.length, option.label.length);

        return {
          id: option.value,
          // id: dataId,
          text: option.label,
          highlight: highlight
        };
      });
      // console.log('AutoComplete.data:', data);

      // node style callback
      callback(value, data);
    }
    // onExist(item) {},
    // onExceed(maxSize, item) {}
  };

  // init materialize autocomplete form component
  instance.autocomplete = instance.$('input').materialize_autocomplete(acOptions);

  // if placeholder is defined
  if (instance.data.atts.placeholder) {

    // activate the label
    activate(instance);
  }
});

//helpers
Template.afAutoComplete_materialize.helpers({
  atts() {
    const instance = Template.instance();
    const atts = instance.data.atts;
    const val = instance.value.get();
    const result = {
      'id'                : 'acInput_'+atts.id,
      'data-schema-key'   : atts['data-schema-key'],
      'data-value'        : val,
      'value'             : val,
      'type'              : 'text',
      'data-activates'    : 'acDropdown_'+atts.id,
      'data-beloworigin'  : 'true',
      'autocomplete'      : 'off'
    };
    if (atts.placeholder) {
      result.placeholder = atts.placeholder;
    }
    return result;
  },
  hiddenAtts() {
    const instance = Template.instance();
    const atts = instance.data.atts;
    const result = {
      'id'                : atts.id,
      'data-schema-key'   : atts['data-schema-key'],
      'type'              : 'hidden',
      'class'             : 'validate ac-hidden'
    };
    if (atts.placeholder) {
      result.placeholder = atts.placeholder;
    }
    return result;
  },
  dropdownId() {
    const instance = Template.instance();
    return 'acDropdown_'+instance.data.atts.id;
  },
  value() {
    const instance = Template.instance();
    return instance.data.value?instance.data.value:instance.data.atts.default;
  }
});

// events
Template.afAutoComplete_materialize.events({

  // when clicked on the autocomplete input
  'focus .ac-input'(event, instance) {
    console.log('focus', instance.data.atts.id);

    // add active class to label
    activate(instance);
  },

  // when hidden select changes
  'change select'(event, instance) {
    console.log('change', instance.data.atts.id);
  },

  // when focus is lost
  'blur .ac-input'(event, instance) {
    console.log('blur', instance.data.atts.id);

    // get hidden value
    const hidden = instance.$('#'+instance.data.atts.id);
    console.log('hidden', hidden);

    // if hidden value is found
    if(hidden.length >= 1) {

      // get the hidden value
      let value = hidden.val();
      console.log('hidden value:', value);

      // if value is an array
      if (_.isArray(value)) {

        // get values without empty value
        value = _.filter(value, (val) => {
          return !_.isEmpty(val);
        });
      }

      // if there is no value
      if (_.isUndefined(value) || _.isEmpty(value)) {
        console.log('hidden value is empty or undefined');

        // remove active class to auto complete input
        deactivate(instance);
      }
    }
  }

});