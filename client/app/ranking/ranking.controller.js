'use strict';

angular.module('hangoutsAnalyticsApp')
  .controller('RankingCtrl', function ($scope) {
    $scope.participants = [{
      displayName: 'Sebastián Bogado',
      photoUrl: 'https://lh6.googleusercontent.com/-Q9v7vFhQOvo/AAAAAAAAAAI/AAAAAAAAAAA/f8l6Kow78cg/s32-c/photo.jpg',
      totalMessages: 12,
    }, {
      displayName: 'Sebastián Bogado',
      photoUrl: 'https://lh6.googleusercontent.com/-Q9v7vFhQOvo/AAAAAAAAAAI/AAAAAAAAAAA/f8l6Kow78cg/s32-c/photo.jpg',
      totalMessages: 123,
    }];

    $scope.totalMessages = _.reduce($scope.participants, function (total, participant) {
      return total + participant.totalMessages;
    }, 0);

    var MAX_FONT = 40,
      MIN_FONT = 12;
    $scope.getFontSize = function (lgdTotalMessages, totalMessages) {
      var ratio = lgdTotalMessages / totalMessages,
        font = MAX_FONT * ratio;

      return Math.max(MIN_FONT, font);
    };
  });
