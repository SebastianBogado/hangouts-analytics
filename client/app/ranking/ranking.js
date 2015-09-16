'use strict';

angular.module('hangoutsAnalyticsApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('ranking', {
        url: '/ranking',
        templateUrl: 'app/ranking/ranking.html',
        controller: 'RankingCtrl'
      });
  });
