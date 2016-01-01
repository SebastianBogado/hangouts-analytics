'use strict';

describe('Controller: RankingCtrl', function () {

  // load the controller's module
  beforeEach(module('hangoutsAnalyticsApp'));
  beforeEach(module('socketMock'));

  var RankingCtrl, scope, httpBackend;

  // TODO IMPROVE: move this to a separate json file
  var participantsJSON = '[{"_id":{"$oid":"55f180843df4ef0300a2f39a"},"firstName":"Fernando","displayName":"Fernando Pereira","hangoutsUserId":"105014136998383952910","totalMessages":780,"photoUrl":"//lh6.googleusercontent.com/-toTQLdvGapQ/AAAAAAAAAAI/AAAAAAAAAAA/Kbx-2yX-b_0/photo.jpg","__v":0},{"_id":{"$oid":"55f180be3df4ef0300a2f3a1"},"firstName":"Tomás","displayName":"Tomás Reale","hangoutsUserId":"108052265675210923345","totalMessages":38,"photoUrl":"//lh5.googleusercontent.com/-7ySa2RNYW1U/AAAAAAAAAAI/AAAAAAAAAFY/ByAsdAxWNWI/photo.jpg","__v":0},{"_id":{"$oid":"55f181433df4ef0300a2f3a8"},"firstName":"Diego","displayName":"Diego Montoya","hangoutsUserId":"102252320546312913918","totalMessages":363,"photoUrl":"//lh4.googleusercontent.com/-fBm7oxLys8k/AAAAAAAAAAI/AAAAAAAAAAw/V6iaLcCy3MA/photo.jpg","__v":0},{"_id":{"$oid":"55f1833f3df4ef0300a2f3af"},"firstName":"Ezequiel","displayName":"Ezequiel Pérez Dittler","hangoutsUserId":"104596993213524307877","totalMessages":278,"photoUrl":"//lh6.googleusercontent.com/-SnTL3ZDqs5E/AAAAAAAAAAI/AAAAAAAACac/MR7Aux-YkaA/photo.jpg","__v":0},{"_id":{"$oid":"55f1854e3df4ef0300a2f3d3"},"firstName":"Tomás","displayName":"Tomás Reale","hangoutsUserId":"117602816094296509669","totalMessages":734,"photoUrl":"//lh3.googleusercontent.com/-xlymMuFhye0/AAAAAAAAAAI/AAAAAAAAAB8/3TdQ-yHgg04/photo.jpg","__v":0},{"_id":{"$oid":"55f186093df4ef0300a2f3dd"},"firstName":"Ignacio","displayName":"Ignacio Garay","hangoutsUserId":"110353082320576296810","totalMessages":916,"photoUrl":"//lh5.googleusercontent.com/-lHkXuqcbpg8/AAAAAAAAAAI/AAAAAAAAAMA/fhkzyKOdn_A/photo.jpg","__v":0},{"_id":{"$oid":"55f18c5f3df4ef0300a2f46c"},"firstName":"Sebastián","displayName":"Sebastián Piccoli","hangoutsUserId":"108207179940766494904","totalMessages":210,"photoUrl":"//lh4.googleusercontent.com/-ct2N7OS-nls/AAAAAAAAAAI/AAAAAAAAECo/XOLS4HGHzGg/photo.jpg","__v":0},{"_id":{"$oid":"55f18e4c3df4ef0300a2f497"},"firstName":"Javier","displayName":"Javier Choque","hangoutsUserId":"107277968435893284712","totalMessages":37,"photoUrl":"//lh5.googleusercontent.com/-6JhlPQ-fGiw/AAAAAAAAAAI/AAAAAAAAKOw/lsul1Kn-CBk/photo.jpg","__v":0},{"_id":{"$oid":"55f192dd17d1e20300ecee19"},"firstName":"Sebastian","displayName":"Sebastian Bogado","hangoutsUserId":"108707015503717986112","totalMessages":217,"photoUrl":"//lh5.googleusercontent.com/-iKV_wd5Pdrw/AAAAAAAAAAI/AAAAAAAAAI0/bK-OHkhSKRU/photo.jpg","__v":0},{"_id":{"$oid":"55f1951e17d1e20300ecee25"},"firstName":"Leandro","displayName":"Leandro Rodriguez","hangoutsUserId":"110766837594691480418","totalMessages":360,"photoUrl":"//lh3.googleusercontent.com/-fLAsoqJTy5c/AAAAAAAAAAI/AAAAAAAAARM/XoWqMVWI7N0/photo.jpg","__v":0},{"_id":{"$oid":"55f1972e17d1e20300ecee4b"},"firstName":"Lgd","displayName":"Lgd Hangouts","hangoutsUserId":"102065354608680424157","totalMessages":8,"photoUrl":"//lh4.googleusercontent.com/-dNVi9qh7de4/AAAAAAAAAAI/AAAAAAAAAA8/xlWglPYJ11c/photo.jpg","__v":0},{"_id":{"$oid":"55f1977c17d1e20300ecee4f"},"firstName":"Sebastián","displayName":"Sebastián Bogado","hangoutsUserId":"117569730666623876630","totalMessages":3,"photoUrl":"//lh6.googleusercontent.com/-Q9v7vFhQOvo/AAAAAAAAAAI/AAAAAAAAAAA/f8l6Kow78cg/s32-c/photo.jpg","__v":0},{"_id":{"$oid":"55f198b817d1e20300ecee60"},"firstName":"Federico","displayName":"Federico Piechotka","hangoutsUserId":"105044233330352016245","totalMessages":412,"photoUrl":"//lh5.googleusercontent.com/-FSekBoLy61I/AAAAAAAAAAI/AAAAAAAAAQo/WYXr5AOZXBE/photo.jpg","__v":0},{"_id":{"$oid":"55f19e1117d1e20300eceeca"},"firstName":"Alejandro","displayName":"Alejandro García Marra","hangoutsUserId":"101491559653244401586","totalMessages":326,"photoUrl":"//lh6.googleusercontent.com/-vdW3z6PHh1o/AAAAAAAAAAI/AAAAAAAAAVA/AIeKk5-OGI0/photo.jpg","__v":0},{"_id":{"$oid":"55f1d39217d1e20300ecf0fc"},"firstName":"Miguel","displayName":"Miguel Torres","hangoutsUserId":"109599809504399649443","totalMessages":4,"photoUrl":"//lh3.googleusercontent.com/-Hgf9bgMym3g/AAAAAAAAAAI/AAAAAAAAAAw/b2kgpsT37nw/photo.jpg","__v":0},{"_id":{"$oid":"55f31552dd8029030049aa1f"},"firstName":"Pablo","displayName":"Pablo Musumeci","hangoutsUserId":"109873869674647586139","totalMessages":152,"photoUrl":"//lh5.googleusercontent.com/-nJLO4i7FxNM/AAAAAAAAAAI/AAAAAAAAAYU/ywwj3TSsosg/photo.jpg","__v":0},{"_id":{"$oid":"55f3742d077f280300a6d117"},"firstName":"Federico","displayName":"Federico Barrios","hangoutsUserId":"116635570728884674290","totalMessages":10,"photoUrl":"//lh3.googleusercontent.com/-jE3sQgbWUaA/AAAAAAAAAAI/AAAAAAAAA0I/rSAzLZzbdww/photo.jpg","__v":0},{"_id":{"$oid":"55f6fddc0869a1030061f708"},"firstName":"Marco","displayName":"Marco Lotto","hangoutsUserId":"108301582732430337721","totalMessages":2,"photoUrl":"//lh3.googleusercontent.com/-zBsOuHTrF2I/AAAAAAAAAAI/AAAAAAAAADc/xx3rvr_CSj8/photo.jpg","__v":0},{"_id":{"$oid":"55f72e8aad625c0300390ac9"},"firstName":"Agustin","displayName":"Agustin Origone","hangoutsUserId":"117713938083421388576","totalMessages":4,"photoUrl":"//lh4.googleusercontent.com/-HCrzBTzLPgs/AAAAAAAAAAI/AAAAAAAAADI/vrDDanRfBRs/photo.jpg","__v":0}]';


  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $httpBackend) {
    httpBackend = $httpBackend;
    httpBackend
      .whenGET('/api/participants')
      .respond(participantsJSON);
    scope = $rootScope.$new();
    RankingCtrl = $controller('RankingCtrl', {
      $scope: scope
    });
  }));

  afterEach(function() {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  it('should get participants', function () {
    httpBackend.expectGET('/api/participants');
    expect(scope.participants).not.toBeDefined();
    httpBackend.flush();

    expect(scope.participants).toBeDefined();
    expect(scope.participants.length).toBe(19);
  });

  it('should sort participants by totalMessages desc', function () {
    httpBackend.expectGET('/api/participants');
    httpBackend.flush();
    scope.participants.forEach( function (participant, idx, participants) {
      if (idx > 0) {
        // Fuck jasmine v1.3, it doesn't have greater than or equal
        expect(participants[idx - 1].totalMessages >= participant.totalMessages).toBeTruthy();
      }
    });
  });

  it('should update participants through the socket', function () {
    httpBackend.expectGET('/api/participants');
    httpBackend.flush();
  });
});
