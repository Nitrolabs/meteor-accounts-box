Package.describe({
  name: 'gcampax:accounts-box',
  summary: 'OAuth2 integration with Box cloud storage service',
  version: '1.0.0',
  git: 'https://github.com/gcampax/meteor-accounts-box'
});

Package.on_use(function(api) {
    api.versionsFrom('0.9.4');
    api.use('accounts-base', ['client', 'server']);
    // Export Accounts (etc) to packages using this one.
    api.imply('accounts-base', ['client', 'server']);
    api.use('accounts-oauth', ['client', 'server']);
    api.use('oauth2', ['client', 'server']);
    api.use('http', ['server']);
    api.use(['underscore', 'service-configuration'], ['client', 'server']);
    api.use(['random', 'templating'], 'client');

    api.export('Box');

    api.add_files('box.js', ['client', 'server']);
    api.add_files(
        ['box_configure.html', 'box_configure.js'],
        'client');
    api.add_files('box_server.js', 'server');
    api.add_files('box_client.js', 'client');
});

Package.on_test(function(api) {
  api.use('tinytest');
  api.use('gcampax:accounts-box');

  api.addFiles('box-tests.js');
});
