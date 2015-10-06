'use strict';

angular.module('hangoutsAnalyticsApp')
  .directive('rankingPieChart', function () {
    return {
      templateUrl: 'app/ranking/rankingPieChart/rankingPieChart.html',
      restrict: 'EA',
      scope: {
        participants: '='
      },
      controller: function ($scope) {
        $scope.chartLabels = [];
        $scope.chartMessageCount = [];

        $scope.$watch('participants', function updateChartData(newVal) {
          if (!newVal) { return; }

          $scope.chartLabels = _.pluck($scope.participants, 'displayName');
          $scope.chartMessageCount = _.pluck($scope.participants, 'totalMessages');
        }, true);

      }
    };
  });
