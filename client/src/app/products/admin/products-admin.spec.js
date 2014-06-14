describe('products section', function () {
  beforeEach(module('ngReviews.products'));

  describe('/products/admin', function () {
    var $rootScope, $state, $injector, state = 'products.admin';
    var products = {};

    beforeEach(function () {
      inject(function (_$rootScope_, _$state_, _$injector_, $templateCache) {
        $rootScope = _$rootScope_;
        $state = _$state_;
        $injector = _$injector_;

        $templateCache.put('products/products.tpl.html', '');
        $templateCache.put('products/admin/products-admin.tpl.html', '');
      });
    });

    it('should respond to URL', function () {
      expect($state.href(state)).to.equal('#/products/admin');
    });

    it('should resolve data', function () {
      $rootScope.$apply(function () {
        $state.go(state);
      });

      expect($state.current.name).to.equal(state);
    });
  });

  describe('ProductsAdminCtrl', function () {
    var $scope;
    var productsPromise;
    var product1 = {};
    var product2 = {};
    var products = [product1, product2];

    function mockProductQuery($q, Product) {
      var defer = $q.defer();
      productsPromise = defer.promise;
      defer.resolve(products);
      sinon.stub(Product, "query").returns(productsPromise);
    }

    function mockDialog(dialogs){
      var defer = $q.defer();
      var resultPromise = defer.promise;
      defer.resolve();

      var dlg = {result: resultPromise};
      sinon.stub(dialogs, "confirm").returns(dlg);
    }

    beforeEach(inject(function ($q, $controller, Product, $rootScope, dialogs) {
      mockProductQuery($q, Product);
      mockDialog(dialogs);

      $scope = $rootScope.$new();

      $controller('ProductsAdminCtrl', {$scope: $scope});
    }));

    it('should assign products', inject(function () {
      expect($scope.productsPromise).to.equal(productsPromise);
      $scope.$apply();
      expect($scope.products).to.equal(products);
    }));

    it('should delete product', inject(function () {
     throw "Pending test";
    }));

  });

});

