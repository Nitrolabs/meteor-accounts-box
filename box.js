Accounts.oauth.registerService('box');

if (Meteor.isClient) {
    Meteor.loginWithBox = function(options, callback) {
        // support a callback without options
        if (!callback && typeof options === "function") {
            callback = options;
            options = {};
        }
        if (!options)
            options = {};


        var credentialRequestCompleteCallback = Accounts.oauth.credentialRequestCompleteHandler(callback);
        Box.requestCredential(options, credentialRequestCompleteCallback);
    };
} else {
    // XXX: decide what to put here
    Accounts.addAutopublishFields({
        forLoggedInUser: [],
        forOtherUsers: []
    });
}
