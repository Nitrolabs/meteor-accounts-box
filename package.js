Package.describe({
  name: 'gcampax:accounts-box',
  summary: 'OAuth2 integration with Box cloud storage service',
  version: '1.0.0',
  git: 'https://github.com/gcampax/meteor-accounts-box'
});

Package.onUse(function(api) {
  api.versionsFrom('undefined');
  api.use('accounts-base', ['client', 'server']);
  // Export Accounts (etc) to packages using this one.
  api.imply('accounts-base', ['client', 'server']);
  api.use('accounts-oauth', ['client', 'server']);

  api.addFiles('box.js');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('gcampax:accounts-box');

  api.addFiles('box-tests.js');
});
