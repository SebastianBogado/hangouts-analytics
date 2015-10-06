'use strict';

describe('Controller: RankingCtrl', function () {

  // load the controller's module
  beforeEach(module('hangoutsAnalyticsApp'));
  beforeEach(module('socketMock'));

  var RankingCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RankingCtrl = $controller('RankingCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
