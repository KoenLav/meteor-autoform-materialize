/*jshint esversion: 6 */

import { Template } from 'meteor/templating';
import Utility from '../../utilities';
import './email.html';

Template.afInputEmail_materialize.helpers({
  atts: Utility.attsToggleInvalidClass
});
