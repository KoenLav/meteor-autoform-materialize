/*jshint esversion: 6 */

export const selectedAttsAdjust = function() {
  var atts = _.clone(this.atts);

  if (this.selected) {
    atts.checked = "";
  }

  atts.id = atts.id + "_" + this._id;
  delete atts['data-schema-key'];
  return atts;
};
