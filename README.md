# hangouts-analytics

rm -rf dist
heroku git:clone -a hangouts-analytics dist


Set this env var in local.env.js:
HANGOUTS_TOKEN: GMail OAuth2 token
GMAIL_ACCOUNT: GMail account that will be used
