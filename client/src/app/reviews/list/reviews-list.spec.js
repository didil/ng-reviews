describe('reviews list section', function () {
  beforeEach(module('ngReviews.reviews'));

  describe('/products/list', function () {
    var $scope = {};
    var Review = {};

    beforeEach(inject(function ($controller) {
      $controller('ReviewsListCtrl', { $scope: $scope, Review: Review });
    }));

    it('should assign products', inject(function () {
      expect($scope.reviews).to.equal(Review);
    }));
  });

  describe('/reviews/list', function () {
    var $rootScope, $state, $injector, state = 'reviews.list';

    beforeEach(function () {
      inject(function (_$rootScope_, _$state_, _$injector_, $templateCache) {
        $rootScope = _$rootScope_;
        $state = _$state_;
        $injector = _$injector_;

        $templateCache.put('reviews/reviews.tpl.html', '');
        $templateCache.put('reviews/list/reviews-list.tpl.html', '');
      });
    });

    it('should respond to URL', function () {
      expect($state.href(state)).to.equal('#/reviews/list');
    });

    it('should resolve data', function () {
      $rootScope.$apply(function () {
        $state.go(state);
      });

      expect($state.current.name).to.equal(state);
    });
  });

});

