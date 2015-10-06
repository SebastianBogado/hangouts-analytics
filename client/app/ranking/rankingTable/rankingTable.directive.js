'use strict';

angular.module('hangoutsAnalyticsApp')
  .directive('rankingTable', function () {
    return {
      templateUrl: 'app/ranking/rankingTable/rankingTable.html',
      restrict: 'EA',
      replace: true,
      scope: {
        participants: '='
      },
      controller: function ($scope) {

        $scope.$watch('participants', function updateMaxMessages(newVal) {
          if (!newVal) return;

          $scope.maxMessages = _.max(newVal, _.property('totalMessages')).totalMessages;
        }, true);

        $scope.getFontSize = function getFontSize(lgdTotalMessages, maxMessages) {
          var ratio = lgdTotalMessages / maxMessages;

          return Math.max(.35, ratio);
        };

        $scope.getImgWidth = function getImgWidth(lgdTotalMessages, maxMessages) {
          return $scope.getFontSize(lgdTotalMessages, maxMessages) + 0.1;
        };
      }
    };
  });
