'use strict';

describe('Controller: SnapshotsCtrl', function () {

  // load the controller's module
  beforeEach(module('hangoutsAnalyticsApp'));

  var SnapshotsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SnapshotsCtrl = $controller('SnapshotsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
