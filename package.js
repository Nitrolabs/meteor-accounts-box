Package.describe({
  name: 'nitrolabs:accounts-box',
  summary: 'OAuth2 integration with Box cloud storage service',
  version: '1.1.2',
  git: 'https://github.com/Nitrolabs/meteor-dropbox-oauth'
});

Package.onUse(function(api) {
    api.versionsFrom('1.0');
    api.use('accounts-base', ['client', 'server']);
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
  api.use('nitrolabs:accounts-box');
  api.addFiles('box-tests.js');
});
