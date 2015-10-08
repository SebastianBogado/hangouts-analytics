# LGD Hangouts Analytics


## Heroku
```
rm -rf dist
heroku git:clone -a hangouts-analytics dist
```


## Openshift
```
rm -rf dist
rhc git-clone hangoutsanalytics
mv $_ dist
cd $_
git remote rename origin openshift
```


# Run the app

The first time you'll need set two env vars in local.env.js

The trick is that you need to get the OAuth2 token manually, so you'll run


```
grunt serve
```

And you'll see in the console 
```
TOKEN URL: https://someurl.
```
Go there, select your account, and get the token.

Now you're ready to set both

* HANGOUTS_TOKEN: GMail OAuth2 token
* GMAIL_ACCOUNT: GMail account that will be used


I should automate this, I know. kb.


After you've successfully run the app for the first time, and connected to Hangouts, you'll
You'll need to create cookies collection on hangoutsanalytics-test db and copy the cookie from
its counterpart on hangoutsanalytics-dev so that when you run ```grunt test``` 
the app will have the cookies needed


# Build 

```
grunt
```


# Cron jobs

Every time you run your local server, it'll check cron jobs defined in seed.js,
and create them if needed.
