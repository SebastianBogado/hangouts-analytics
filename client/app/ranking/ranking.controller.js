'use strict';

angular.module('hangoutsAnalyticsApp')
  .controller('RankingCtrl', function ($scope, $http, socket) {

    $http.get('/api/participants').
      then(function(response) {
        $scope.participants = response.data;

        $scope.maxMessages = _.max($scope.participants, _.iteratee('totalMessages'));

        socket.syncUpdates('participant', $scope.participants, function (ev, item) {
          if (ev === 'delete') {
            $scope.maxMessages = _.max($scope.participants, _.iteratee('totalMessages'));
          } else if (ev === 'updated') {
            $scope.maxMessages = Math.max($scope.maxMessages, item.totalMessages);
          }
        });
      });


    //$scope.participants = [{
    //  displayName: 'Sebastián Bogado',
    //  photoUrl: 'https://lh6.googleusercontent.com/-Q9v7vFhQOvo/AAAAAAAAAAI/AAAAAAAAAAA/f8l6Kow78cg/s32-c/photo.jpg',
    //  totalMessages: 12,
    //}, {
    //  displayName: 'Sebastián Bogado',
    //  photoUrl: 'https://lh6.googleusercontent.com/-Q9v7vFhQOvo/AAAAAAAAAAI/AAAAAAAAAAA/f8l6Kow78cg/s32-c/photo.jpg',
    //  totalMessages: 123,
    //}];

    var MAX_FONT = 40,
      MIN_FONT = 14;
    $scope.getFontSize = function getFontSize(lgdTotalMessages, maxMessages) {
      var ratio = lgdTotalMessages / maxMessages,
        font = MAX_FONT * ratio;

      return Math.max(MIN_FONT, font);
    };
  });
