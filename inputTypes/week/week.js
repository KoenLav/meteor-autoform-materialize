/*jshint esversion: 6 */

import { Template } from 'meteor/templating';
import Utility from '../../utilities';
import './week.html';

Template.afInputWeek_materialize.helpers({
  atts: Utility.attsToggleInvalidClass
});
