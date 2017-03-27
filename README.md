# developer-platform-generated
The result of generating the templates from kaltura/developer-platform, used for developer.kaltura.com

## Running
```
npm install
npm install -g forever
forever start server.js
```

### Environment Options
Several options can be set using environment variables:

* DEVELOPMENT - for use in active development, disables SSL and cache
* NO_SSL
* USE_CACHE
* ENABLE_CROSS_ORIGIN
* KALTURA_RECIPES_PORT
* DISCOURSE_HOST

#### Required in production
* KALTURA_SSO_SECRET
* KALTURA_SSO_PAYLOAD
* GITHUB_CLIENT_ID
* GITHUB_CLIENT_SECRET
* DISCOURSE_API_KEY - valid for forum.kaltura.org

## Building
Any changes that are pushed to the master branch will automatically
trigger a Travis build. Travis will use LucyBot to update the
`www/` folder with new HTML, CSS, and JS assets. Once Travis is
finished, simply pull the result and restart the server.

