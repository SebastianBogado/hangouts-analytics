'use strict';

angular.module('hangoutsAnalyticsApp')
  .directive('rankingBarChart', function () {
    return {
      templateUrl: 'app/ranking/rankingBarChart/rankingBarChart.html',
      restrict: 'EA',
      scope: {
        participants: '='
      },
      controller: function ($scope) {
        $scope.chartLabels = [];
        $scope.chartMessageCount = [];

        $scope.$watch('participants', function updateChartData(newVal) {
          if (!newVal) return;

          $scope.chartLabels = _.pluck($scope.participants, 'displayName');
          $scope.chartMessageCount[0] = _.pluck($scope.participants, 'totalMessages');
        }, true);

      }
    };
  });
