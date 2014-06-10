describe('new review section', function () {
  beforeEach(module('ngReviews.reviews'));

  var productId = 5;

  describe('ReviewNewCtrl', function () {
    var $scope;
    var productPromise;
    var product = {id: productId, name: "My Product"};
    var addStub;
    var goStub;

    beforeEach(inject(function ($controller, Review, Product, $state, $q, $rootScope, $stateParams) {
      var defer = $q.defer();
      defer.resolve(product);
      productPromise = defer.promise;
      var cb = sinon.stub(Product,"get");
      cb.withArgs(productId).returns(productPromise);

      addStub = sinon.stub(Review, "$add");
      goStub = sinon.stub($state, "go");

      $scope = $rootScope.$new();

      $stateParams.productId = productId;

      $controller('ReviewsNewCtrl', { $scope: $scope, $stateParams: $stateParams });
    }));

    it('should assign product', inject(function () {
      expect($scope.productPromise).to.equal(productPromise);
      expect($scope.review).to.deep.equal({});

      $scope.$digest();

      expect($scope.product).to.equal(product);
    }));

    describe("saves", function () {
      beforeEach(function () {
        this.clock = sinon.useFakeTimers();
      });

      it('saves review', inject(function () {
        $scope.review = {quality: 5};

        $scope.$digest();
        $scope.save();

        expect($scope.review.quality).to.equal(5);
        expect($scope.review.productId).to.equal(product.id);
        expect($scope.review.productName).to.equal(product.name);
        expect($scope.review.createdAt).to.deep.equal(new Date());
        expect(addStub).to.have.been.calledWith($scope.review);
        expect(goStub).to.have.been.calledWith('reviews.list');
      }));

      afterEach(function () {
        this.clock.restore();
      });

    });

  });

  describe('/reviews/new', function () {
    var $rootScope, $state, $injector, state = 'reviews.new';

    beforeEach(function () {
      inject(function (_$rootScope_, _$state_, _$injector_, $templateCache) {
        $rootScope = _$rootScope_;
        $state = _$state_;
        $injector = _$injector_;

        $templateCache.put('reviews/reviews.tpl.html', '');
        $templateCache.put('reviews/new/reviews-new.tpl.html', '');
      });
    });

    it('should respond to URL', function () {
      expect($state.href(state, {productId: productId})).to.equal('#/reviews/new/5');
    });

    it('should resolve data', function () {
      $rootScope.$apply(function () {
        $state.go(state, {productId: productId});
      });

      expect($state.current.name).to.equal(state);
    });
  });

});

