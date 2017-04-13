Box = {};

// For now, might add more fields later
Box.whitelistedFields = ['id', 'login', 'name', 'given_name'];

OAuth.registerService('box', 2, null, function(query) {

  var response = getTokens(query);
  var accessToken = response.accessToken;
  var identity = getIdentity(accessToken);
  var serviceData = {
    accessToken: accessToken,
    expiresAt: Date.now() + (1000 * response.expiresIn),
    picture: identity.avatar_url,
  };

  var fields = _.pick(identity, Box.whitelistedFields);
  _.extend(serviceData, fields);

  // Add a proxy for the email address to match other accounts-oauth packages
  serviceData.email = serviceData.login;

  // only set the token in serviceData if it's there. this ensures
  // that we don't lose old ones (since we only get this on the first
  // log in attempt)
  if (response.refreshToken)
    serviceData.refreshToken = response.refreshToken;

  return {
    serviceData: serviceData,
    options: {profile: {name: identity.name, avatar: identity.avatar_url}}
  };
});

// returns an object containing:
// - accessToken
// - expiresIn: lifetime of token in seconds
// - refreshToken, if this is the first authorization request
var getTokens = function (query) {
  var config = ServiceConfiguration.configurations.findOne({service: 'box'});
  if (!config)
    throw new ServiceConfiguration.ConfigError();

  var response;
  try {
    response = HTTP.post(
      "https://app.box.com/api/oauth2/token", {params: {
        code: query.code,
        client_id: config.clientId,
        client_secret: OAuth.openSecret(config.secret),
        redirect_uri: OAuth._redirectUri('box', config, {}, {secure: true}),
        grant_type: 'authorization_code'
      }});
  } catch (err) {
    throw _.extend(new Error("Failed to complete OAuth handshake with Box. " + err.message),
                   {response: err.response});
  }

  if (response.data.error) { // if the http response was a json object with an error attribute
    throw new Error("Failed to complete OAuth handshake with Box. " + response.data.error);
  } else {
    return {
      accessToken: response.data.access_token,
      refreshToken: response.data.refresh_token,
      expiresIn: response.data.expires_in
    };
  }
};

var getIdentity = function (accessToken) {
  try {
    return HTTP.get(
      "https://www.box.com/api/2.0/users/me",
      {params: {access_token: accessToken}}).data;
  } catch (err) {
    throw _.extend(new Error("Failed to fetch identity from Box. " + err.message),
                   {response: err.response});
  }
};


Box.retrieveCredential = function(credentialToken, credentialSecret) {
  return OAuth.retrieveCredential(credentialToken, credentialSecret);
};
