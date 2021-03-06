/*jshint esversion: 6 */

import { Template } from 'meteor/templating';
import { AutoForm } from 'meteor/aldeed:autoform';
import './pickadate.html';
import moment from 'moment';

var DEFAULT_PICKADATE_FORMAT_SUBMIT = 'yyyy/mm/dd';

AutoForm.addInputType('pickadate', {
  template: 'afPickadate',
  valueIn: function(val, atts) {
    var result, timezoneId;
    result = val;
    timezoneId = atts.timezoneId;
    if (typeof timezoneId === 'string') {
      if (typeof moment.tz !== 'function') {
        throw new Error('If you specify a timezoneId, make sure that you\'ve added a moment-timezone package to your app');
      }
      if (val instanceof Date) {
        result = moment(
          AutoForm.Utility.dateToNormalizedLocalDateAndTimeString(val, timezoneId),
          'YYYY-MM-DD[T]HH:mm:ss.SSS'
        ).toDate();
      }
    }
    return result;
  },
  valueOut: function() {
    var picker = this.pickadate('picker');
    var item   = picker && picker.get('select');
    const value = item && item.obj;
    if (value) {
      return moment(value).format();
    } else {
      return null;
    }
  },
  valueConverters: {
    'string': function(val) {
      if (val instanceof Date) {
        return val.toString();
      } else {
        return val;
      }
    },
    'stringArray': function(val) {
      if (val instanceof Date) {
        return [val.toString()];
      }
      return val;
    },
    'number': function(val) {
      if (val instanceof Date) {
        return val.getTime();
      } else {
        return val;
      }
    },
    'numberArray': function(val) {
      if (val instanceof Date) {
        return [val.getTime()];
      }
      return val;
    },
    'dateArray': function(val) {
      if (val instanceof Date) {
        return [val];
      }
      return val;
    }
  },
  contextAdjust: function(context) {
    if (context.atts.timezoneId) {
      context.atts["data-timezone-id"] = context.atts.timezoneId;
    }
    delete context.atts.timezoneId;
    return context;
  }
});

Template.afPickadate.onRendered(() => {
  const instance = Template.instance();

  if (instance.data.value) {
    instance.$('input').parent().find('label').addClass('active');
  }

  //init pickadate
  const userOptions = instance.data.atts.pickadateOptions || {};
  // console.log('pickadate user options', userOptions);
  const opts = _.defaults(userOptions, {
    format: DEFAULT_PICKADATE_FORMAT_SUBMIT,
    hiddenName: true,
    closeOnSelect: true
  });
  const input = instance.$('input').pickadate(opts);

  //get picker
  const picker = input.pickadate('picker');

  //get label - seems not to be needed anymore
  // const qInput = $('#'+instance.data.atts.id);
  // console.log('pickatime.qInput', qInput);
  // const qParent = qInput.parent().parent().parent();
  // console.log('pickatime.qParent', qParent.html());
  // const qLabel = qParent.find('label');
  //console.log('pickatime.qLabel', qLabel);

  //autorun - reactive set picker to data value, min and max
  instance.autorun(() => {

    //when data changes
    const data = Template.currentData();

    //if data value is a date
    if (data.value instanceof Date) {

      //set picker select to value
      picker.set('select', data.value);

      //add active class to label - this seems not to be needed anymore
      // qLabel.addClass('active');
    }

    //if data min is a date
    if (data.min instanceof Date) {

      //set picker min date
      picker.set('min', data.min);
    }

    //if data max is a date
    if (data.max instanceof Date) {

      //set picket max date
      return picker.set('max', data.max);
    }
  });
});

Template.afPickadate.helpers({
  atts() {
    const instance = Template.instance();
    const atts = _.clone(instance.data.atts);
    delete atts.dateTimePickerOptions;
    delete atts.pickadateOptions;
    return atts;
  }
});
