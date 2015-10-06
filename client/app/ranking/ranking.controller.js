'use strict';

angular.module('hangoutsAnalyticsApp')
  .controller('RankingCtrl', function ($scope, $http, socket) {

    $http.get('/api/participants')
      .then(function(response) {
        $scope.participants = sortParticipants(response.data);

        socket.syncUpdates('participant', $scope.participants, function (ev, item) {
          $scope.participants = sortParticipants($scope.participants);
        });
      });


    function sortParticipants(participants) {
      return _.sortBy(participants, _.property('totalMessages')).reverse();
    }

  });
