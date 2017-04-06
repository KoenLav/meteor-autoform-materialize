/*jshint esversion: 6 */

import { Template } from 'meteor/templating';
import Utility from '../../utilities';
import './select.html';

Template.afSelect_materialize.helpers({
  atts: Utility.attsToggleInvalidClass,
  optionAtts: Utility.optionAtts
});

Template.afSelect_materialize.onRendered(Utility.initializeSelect);
