/*jshint esversion: 6 */

import { Template } from 'meteor/templating';
import Utility from '../../utilities';
import './boolean-checkbox.html';

Template.afCheckbox_materialize.helpers({
 atts: Utility.attsToggleInvalidClass
});
