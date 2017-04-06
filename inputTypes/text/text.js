/*jshint esversion: 6 */

import { Template } from 'meteor/templating';
import Utility from '../../utilities';
import './text.html';

Template.afInputText_materialize.helpers({
  atts: Utility.attsToggleInvalidClass
})
