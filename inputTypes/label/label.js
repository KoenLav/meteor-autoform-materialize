/*jshint esversion: 6 */

import { Template } from 'meteor/templating';
import Utility from '../../utilities';
import './label.html';

Template.afLabel_materialize.helpers({
  atts: function() {
    var labelAtts;
    labelAtts = this.afFieldLabelAtts;
    return labelAtts;
  }
});
