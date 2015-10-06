'use strict';

angular.module('hangoutsAnalyticsApp')
  .controller('RankingCtrl', function ($scope, $http, socket) {

    // TODO IMPROVE: chart logic mixed with table logic
    $scope.chartLabels = [];
    $scope.chartMessageCount = [];
    $http.get('/api/participants')
      .then(function(response) {
        $scope.participants = _.sortBy(response.data, _.property('totalMessages')).reverse();
        $scope.chartLabels = _.pluck($scope.participants, 'displayName');
        $scope.chartMessageCount[0] = _.pluck($scope.participants, 'totalMessages');

        //$scope.maxMessages = _.max($scope.participants, _.property('totalMessages')).totalMessages;

        socket.syncUpdates('participant', $scope.participants, function (ev, item) {
          //if (ev === 'delete') {
          //  $scope.maxMessages = _.max($scope.participants, _.property('totalMessages')).totalMessages;
          //} else if (ev === 'updated') {
          //  $scope.maxMessages = Math.max($scope.maxMessages, item.totalMessages);
          //}

          $scope.participants = _.sortBy($scope.participants, _.property('totalMessages')).reverse();
          $scope.chartLabels = _.pluck($scope.participants, 'displayName');
          $scope.chartMessageCount[0] = _.pluck($scope.participants, 'totalMessages');
        });
      });
  });
