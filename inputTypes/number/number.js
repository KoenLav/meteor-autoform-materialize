/*jshint esversion: 6 */

import { Template } from 'meteor/templating';
import Utility from '../../utilities';
import './number.html';

Template.afInputNumber_materialize.helpers({
  atts: Utility.attsToggleInvalidClass
});
