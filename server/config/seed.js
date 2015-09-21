/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Thing = require('../api/thing/thing.model');
var User = require('../api/user/user.model');
var Cron = require('../api/cron/cron.model');

Thing.find({}).remove(function() {
  Thing.create({
    name : 'Development Tools',
    info : 'Integration with popular tools such as Bower, Grunt, Karma, Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, Stylus, Sass, CoffeeScript, and Less.'
  }, {
    name : 'Server and Client integration',
    info : 'Built with a powerful and fun stack: MongoDB, Express, AngularJS, and Node.'
  }, {
    name : 'Smart Build System',
    info : 'Build system ignores `spec` files, allowing you to keep tests alongside code. Automatic injection of scripts and styles into your index.html'
  },  {
    name : 'Modular Structure',
    info : 'Best practice client and server structures allow for more code reusability and maximum scalability'
  },  {
    name : 'Optimized Build',
    info : 'Build process packs up your templates as a single JavaScript payload, minifies your scripts/css/images, and rewrites asset names for caching.'
  },{
    name : 'Deployment Ready',
    info : 'Easily deploy your app to Heroku or Openshift with the heroku and openshift subgenerators'
  });
});

User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test'
  }, {
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'admin'
  }, function() {
      console.log('finished populating users');
    }
  );
});

var cronSeeds = [{
  name: 'dailyMessages',
  description: 'Counts daily messages',
  unixExpression: '0 0 0 * * 2-6',
  file: './snapshot.daily'
}, {
  name: 'weeklyMessages',
  description: 'Counts weekly messages',
  unixExpression: '0 0 0 * * 6',
  file: './snapshot.weekly'
}, {
  name: 'monthlyMessages',
  description: 'Counts monthly messages',
  unixExpression: '0 0 0 1 * *',
  file: './snapshot.monthly'
}, {
  name: 'yearlyMessages',
  description: 'Counts yearly messages',
  unixExpression: '0 0 0 1 0 *',
  file: './snapshot.yearly'
}];


cronSeeds.forEach( function (cronSeed) {

  Cron.findOne({name: cronSeed.name}, function (err, cron) {
    if (err) return console.error(err);

    if (!cron) {
      console.log('Creating cron %s', cronSeed.name);
      Cron.create(cronSeed);
    } else {
      console.log('Cron %s already exists', cronSeed.name);
    }
  });
});
