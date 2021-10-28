const config = {
  issuer: 'https://example-882474.okta.com', //process.env.REACT_APP_OKTA_ISSUER_URI,
  redirectUri: window.location.origin + '/implicit/callback',
  clientId: 'example', //process.env.REACT_APP_CLIENT_ID,
  pkce: true,
  scopes: ['openid', 'email', 'profile'],
};

export { config };
