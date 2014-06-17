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
    var $scope , $q , dialogs, Product;
    var productsPromise;
    var product1 = {id: 1};
    var product2 = {id: 2};
    var products = [product1, product2];

    function mockProductQuery() {
      var defer = $q.defer();
      productsPromise = defer.promise;
      defer.resolve(products);
      sinon.stub(Product, "query").returns(productsPromise);
    }

    function mockProductReset() {
      var defer = $q.defer();
      resetPromise = defer.promise;
      defer.resolve();
      sinon.stub(Product, "reset").returns(resetPromise);
    }

    function mockDialog(dialogs, confirmed) {
      var defer = $q.defer();
      var resultPromise = defer.promise;
      if (confirmed) {
        defer.resolve();
      } else {
        defer.reject();
      }
      defer.resolve();

      var dlg = {result: resultPromise};
      sinon.stub(dialogs, "confirm").returns(dlg);
    }

    beforeEach(inject(function (_$q_, $controller, _Product_, $rootScope, _dialogs_) {
      dialogs = _dialogs_;
      $q = _$q_;
      Product = _Product_;

      mockProductQuery();

      $scope = $rootScope.$new();

      $controller('ProductsAdminCtrl', {$scope: $scope});
      $scope.$apply();
    }));

    it('should assign products', inject(function () {
      expect($scope.productsPromise).to.equal(productsPromise);
      expect($scope.products).to.equal(products);
    }));

    describe("delete product", function () {
      beforeEach(function () {
        product1.remove = function () {
          return {then: function (fn) {
            fn();
          }};
        };
      });

      describe("confirmed", function () {
        beforeEach(function () {
          mockDialog(dialogs, true);
        });

        it('should delete product', inject(function () {
          $scope.destroy(product1);
          $scope.$apply();
          expect($scope.products).to.deep.eq([product2]);
        }));
      });

      describe("not confirmed", function () {
        beforeEach(function () {
          mockDialog(dialogs, false);
        });

        it('should delete product', inject(function () {
          $scope.destroy(product1);
          $scope.$apply();
          expect($scope.products).to.equal(products);
        }));
      });
    });

    describe('resets products', function () {
      beforeEach(function () {
        mockProductReset();
      });

      it('should reset products', inject(function () {
        $scope.products = [product1];
        $scope.reset();
        $scope.$apply();
        expect($scope.products).to.equal(products);
      }));

    });

  });

});

