OKTA AUTHORIZATION SERVER INFORMATION

AUTHORIZATION SERVER
-Use Okta as your authorization server to retain all of your user information and grant users tokens to control their authorization and authentication

WHAT IS AN AUTHORIZATION SERVER
-At its core, an authorization server is simply an engine for minting OpenID Connect or OAuth 2.0 tokens
-An authorization server is also used to apply access policies 
-Each authorization server has a unique issuer URI and its own signing key for tokens to keep a proper boundary between security domains

WHAT YOU CAN USE AN AUTHORIZATION SERVER FOR
-You can use an authorization server to perform Single Sign-On (SSO) with Okta for your OpenID Connect apps
-You can also use an authorization server to secure your own APIs and provide user authorization to access your web services
-OpenID Connect is used to authenticate users with a web app
-The app uses the ID token that is returned from the authorization server to know if a user is authenticated and to obtain profile information about the user, such as their username or locale
-OAuth 2.0 is used to authorize user access to an API. An access token is used by the resource server to validate a user's level of authorization/access
-When using OpenID Connect or OAuth, the authorization server authenticates a user and issues an ID token and/or an access token
-Note: You can't mix tokens between different authorization servers. By design, authorization servers don't have trust relationships with each other

CUSTOM AUTHORIZATION SERVER
-You use a Custom Authorization Server to create and apply authorization policies to secure your APIs
-An access token that is minted by a Custom Authorization Server is consumed by your APIs
-Okta allows you to create multiple Custom Authorization Servers within a single Okta org that you can use to protect your own resource servers
-Within each authorization server, you can define your own custom OAuth 2.0 scopes, claims, and access policies to support authorization for your APIs

DEFAULT CUSTOM AUTHORIZATION SERVER
-Okta provides a pre-configured Custom Authorization Server called default
-It includes a basic access policy and a rule to quickly get you started
-For simple use cases, this out-of-the-box Custom Authorization Server is usually all that you need
-To use the default Custom Authorization Server, use default as the authorization server ID:
    https://${yourOktaDomian}/api/v1/authorizationServers/default
-For Custom Authorization Servers that you create yourself, the ${authorizationServerId} is a random ID such as aus9o8wzkhckw9TLa0h7z
    https://${yourOktaDomain}/api/v1/authorizationServers/${authorizationServerId}


CUSTOM AUTHORIZATION SERVER DISCOVERY ENDPOINTS
-The following endpoints return OpenID Connect or OAuth 2.0 metadata related to a Custom Authorization Server
-Clients can use this information to programmatically configure their interactions with Okta
-Custom scopes and custom claims aren't returned
-The OpenID and OAuth discovery endpoints for a Custom Authorization Server are:
    OpenID: https://${yourOktaDomain}/oauth2/${authorizationServerId}/.well-known/openid-configuration
    OAuth: https://${yourOktaDomain}/oauth2/${authorizationServerId}/.well-known/oauth-authorization-server
-The OpenID and OAuth discovery endpoints for the default Custom Authorization Server are:
    OpenID: https://${yourOktaDomain}/oauth2/default/.well-known/openid-configuration
    OAuth: https://${yourOktaDomain}/oauth2/default/.well-known/oauth-authorization-server

WHICH AUTHORIZATION SERVER SHOULD YOU USE
-Only the Org Authorization Server can mint access tokens that contain Okta API scopes
-If your application has requirements such as additional scopes, customizing rules for when to grant scopes, or you need additional authorization servers with different scopes and claims, then you need to create a Custom Authorization Server
-The following table describes which capabilities are supported by the Custom Authorization Server (includes the Default Custom Authorization Server) and which are supported by the Okta Org Authorization Server

    Capabilities                                        Custom Authorization Server         Org Authorization Server
    SSO with OpenID Connect                             YES                                 YES
    Use Okta Developer SDKs & Widgets for SSO           YES                                 YES
    Retrieve user profile in ID Token                   YES                                 YES
    Apply authorization policies to custom APIs         YES                                 NO
    Add custom scopes or claims to tokens               YES                                 NO
    Integrate with an API Gateway                       YES                                 NO
    Machine-to-Machine or Microservices                 YES                                 NO
    Mint Access Tokens with Okta API Scopes             NO                                  YES

OAUTH 2.0
-The OAuth 2.0 protocol controls authorization to access a protected resource, like your web app, native app, or API service
-OAuth 2.0 is a standard that apps use to provide client applications with access
-If you would like to grant access to your application data in a secure way, then you want to use the OAuth 2.0 protocol
-At the core of both OAuth 2.0 and its OpenID Connect extension is the authorization server
-An authorization server is simply an OAuth 2.0 token minting engine
-Each authorization server has a unique issuer URI and its own signing key for tokens to keep a proper boundary between security domains
-In the context of this guide Okta is your authorization server

SCOPES
-Scopes specify what access privileges are being requested as part of the authorization
-For example, the email scope requests access to the user's email address
-There are certain reserved scopes that are created with any Okta authorization server that are listed on the OpenID Connect & OAuth 2.0 Scopes section
-The scopes associated with access tokens determine which claims are available when they are used to access the OIDC /userinfo endpoint
-The following scopes are supported:
    Property            Description                                                                     Required
    openid              Identifies the request as an openID Connect request                             YES
    profile             Requests access to the end user's default profile claims                        NO
    email               Requests access to the email and email_verified claims                          NO
    phone               Requests access to the phone_number and phone_number_verified claims            NO
    address             Requests access to the address claim                                            NO
    groups              Requests access to the groups claim                                             NO
    offline_access      Requests a refresh token used to obtain more access tokens without              NO
                        re-prompting the user for authentication

CLAIMS
-Tokens contain claims that are statements about the subject (for example: name, role, or email address)

ACCESS POLICIES
-Access policies help you secure your APIs by defining different access and refresh token lifetimes for a given combination of grant type, user, and scope
-You create policy rules to determine if an application should be permitted to access specific information from your protected APIs and for how long
-Access policies are specific to a particular authorization server and the client applications that you designate for the policy
-Access policies are containers for rules
-Each access policy applies to a particular OpenID Connect application, and the rules that it contains define different access and refresh token lifetimes depending on the nature of the token request


DOCUMENTATION LINKS
-Authorization Server Link:
    https://developer.okta.com/docs/concepts/auth-servers/#org-authorization-server-discovery-endpoints 
-Scopes Links:
    https://developer.okta.com/docs/guides/customize-authz-server/create-scopes/ 
    https://developer.okta.com/docs/reference/api/oidc/#scopes 
-Claims Link:
    https://developer.okta.com/docs/guides/customize-authz-server/create-claims/
-Access Policies Links:
    https://developer.okta.com/docs/guides/customize-authz-server/create-access-policies/ 
    https://developer.okta.com/docs/guides/configure-access-policy/overview/ 


