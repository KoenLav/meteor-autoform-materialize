/*jshint esversion: 6 */

import { Template } from 'meteor/templating';
import Utility from '../../utilities';
import './search.html';

Template.afInputSearch_materialize.helpers({
  atts: Utility.attsToggleInvalidClass
});
