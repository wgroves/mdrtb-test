// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID'        : 'your-secret-clientID-here', // your App ID
        'clientSecret'    : 'your-client-secret-here', // your App Secret
        'callbackURL'     : 'http://localhost:8080/auth/facebook/callback',
        'profileURL': 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email'

    },

    'twitterAuth' : {
        'consumerKey'        : 'your-consumer-key-here',
        'consumerSecret'     : 'your-client-secret-here',
        'callbackURL'        : 'http://localhost:8080/auth/twitter/callback'
    },

    'googleAuth' : {
        'clientID'         : '1006083435434-j4n89qob4kjrfm6a9r7u3jtp02npl7qu.apps.googleusercontent.com',
        'clientSecret'     : '1kcJl8X_p-Er9acD6wf0bjpb',
        'callbackURL'      : 'http://localhost:8080/auth/google/callback'
    }

};
