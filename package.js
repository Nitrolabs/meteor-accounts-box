Package.describe({
  name: 'gcampax:accounts-box',
  summary: 'OAuth2 integration with Box cloud storage service',
  version: '1.0.2',
  git: 'https://github.com/gcampax/meteor-accounts-box'
});

Package.onUse(function(api) {
    api.versionsFrom('0.9.4');
    api.use('accounts-base', ['client', 'server']);
    // Export Accounts (etc) to packages using this one.
    api.imply('accounts-base', ['client', 'server']);
    api.use('accounts-oauth', ['client', 'server']);
    api.use('oauth2', ['client', 'server']);
    api.use('oauth', ['client', 'server']);
    api.use('http', ['server']);
    api.use(['underscore', 'service-configuration'], ['client', 'server']);
    api.use(['random', 'templating'], 'client');

    api.export('Box');

    api.addFiles(['box_configure.html', 'box_configure.js'],'client');
    api.addFiles('box_server.js', 'server');
    api.addFiles('box_client.js', 'client');
    api.addFiles('box.js', ['client', 'server']);
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('gcampax:accounts-box');

  api.addFiles('box-tests.js');
});
