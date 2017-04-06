Package.describe({
  name: 'mozfet:autoform-materialize',
  summary: 'Materialize theme for Autoform',
  version: '1.0.0',
  git: 'https://github.com/mozfet/meteor-autoform-materialize.git'
});

Package.onUse(function(api) {
  api.versionsFrom('1.4.3.2');
  api.use(['templating@1.3.2', 'underscore@1.0.10', 'reactive-var@1.0.11', 'blaze@2.3.2'], 'client');
  api.use('ecmascript@0.6.3');
  api.use('momentjs:moment@2.18.1');
  api.use('aldeed:autoform@6.0.0', 'client');
  api.use('fourseven:scss@3.13.0', 'client');
  api.use('poetic:materialize-scss@1.97.6_1', 'client')
  api.addFiles(['index.js'], 'client');
});
