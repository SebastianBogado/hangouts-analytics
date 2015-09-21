'use strict';

angular.module('hangoutsAnalyticsApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('snapshots', {
        url: '/snapshots',
        templateUrl: 'app/snapshots/snapshots.html',
        controller: 'SnapshotsCtrl'
      })
      .state('snapshot', {
        url: '/snapshots/:id',
        templateUrl: 'app/ranking/ranking.html',
        controller: 'SnapshotCtrl'
      });
  });
