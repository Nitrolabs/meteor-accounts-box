## accounts-box

Box.com OAuth2 login service for use with Meteor Auth

### Package Dependencies

* accounts-base
* accounts-oauth

### Usage

1. `meteor add accounts-box`
2. Read the 'Integrating with Login Services' section of [Getting Started with Auth](https://github.com/meteor/meteor/wiki/Getting-started-with-Auth) and make sure you set up your config and secret correctly.
3. Call `Meteor.loginWithBox();`
4. You also have access to a `Box` API object, to control the lower layers of the client
   and server flows. Don't use it unless you know what you're doing!

The redirect URI must be set to '${yoursiteurl}/_oauth/box?'
Note the final question mark.

### Credits

* Shamelessly based on the core `accounts-google` and `google` packages.
