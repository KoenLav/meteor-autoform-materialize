/*jshint esversion: 6 */

import { Template } from 'meteor/templating';
import Utility from '../../utilities';
import './time.html';

Template.afInputTime_materialize.helpers({
  atts: Utility.attsToggleInvalidClass
});
