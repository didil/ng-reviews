describe('review resource', function () {
  beforeEach(module('resources.review'));

  var firebaseUri = "https://ng-reviews.firebaseio.com/reviews";
  var ref = {};
  var $firebase = {};
  var Review = {};

  beforeEach(module(function ($provide) {
    $firebase = sinon.stub().withArgs(ref).returns(Review);

    $provide.value('$firebase', $firebase);
  }));

  beforeEach(inject(function () {
    sinon.stub(window, "Firebase").withArgs(firebaseUri).returns(ref);
  }));

  it('Review', inject(function (_Review_) {
    expect(_Review_).to.equal(Review);
  }));

});