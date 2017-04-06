/*jshint esversion: 6 */

export const optionAtts = function() {
  var atts, item;
  item = this;
  atts = {
    value: item.value
  };
  if (item.selected) {
    atts.selected = '';
  }
  return atts;
};
