describe('new review section', function () {
  beforeEach(module('ngReviews.reviews'));

  describe('ReviewNewCtrl', function () {
    var $scope = {};
    var product = {id: 3, name: "My Product"};
    var addStub;
    var goStub;

    beforeEach(inject(function ($controller, Review, $state) {
      addStub = sinon.stub(Review, "$add");
      goStub = sinon.stub($state, "go");

      $controller('ReviewsNewCtrl', { $scope: $scope, product: product });
    }));

    it('should assign products', inject(function () {
      expect($scope.product).to.equal(product);
      expect($scope.review).to.deep.equal({productId: product.id});
    }));

    describe("saves", function () {
      beforeEach(function () {
        this.clock = sinon.useFakeTimers();
      });

      it('saves review', inject(function () {
        $scope.review = {quality: 5, productId: product.id};

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
    var Product = { get : function(){}};
    var product = {};
    var productId = 5;

    beforeEach(function () {
      sinon.stub(Product,"get").withArgs(3).returns(product);

      module(function ($provide) {
        $provide.value('Product', Product);
      });

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
      // Call invoke to inject dependencies and run function
      expect($injector.invoke($state.current.resolve.product)).to.equal(product);
    });
  });

});

