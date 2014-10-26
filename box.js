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
    Accounts.addAutopublishFields({
        forLoggedInUser: _.map(
            Box.whitelistedFields,
            function (subfield) { return 'services.box.' + subfield; }),

        forOtherUsers: _.map(
            // even with autopublish, no legitimate web app should be
            // publishing all users' emails
            _.without(Box.whitelistedFields, 'email', 'verified_email'),
            function (subfield) { return 'services.box.' + subfield; })
    });
}
