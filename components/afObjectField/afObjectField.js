/*jshint esversion: 6 */

Template.afObjectField_material.helpers({
  quickFieldsAtts: function () {
    return _.pick(this, 'name', 'id-prefix');
  }
});
