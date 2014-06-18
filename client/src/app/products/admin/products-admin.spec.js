describe('products section', function () {
  beforeEach(module('ngReviews.products'));

  describe('/products/admin', function () {
    var $rootScope, $state, $injector, $httpBackend, state = 'products.admin';
    var products = {};

    beforeEach(function () {
      inject(function (_$rootScope_, _$state_, _$httpBackend_, _$injector_, $templateCache) {
        $rootScope = _$rootScope_;
        $state = _$state_;
        $injector = _$injector_;
        $httpBackend = _$httpBackend_;

        $templateCache.put('products/products.tpl.html', '');
        $templateCache.put('products/admin/products-admin.tpl.html', '');

        $httpBackend.when('POST', '/users/sign_in.json').respond("true");
      });
    });

    it('should respond to URL', function () {
      expect($state.href(state)).to.equal('#/products/admin');
    });

    it('should resolve data', function () {
      $state.go(state);

      $rootScope.$digest();
      $httpBackend.flush();

      expect($state.current.name).to.equal(state);
    });
  });

  describe('ProductsAdminCtrl', function () {
    var $scope , $q , Product;
    var productsPromise, resetPromise;
    var product1 = {id: 1};
    var product2 = {id: 2};
    var products = [product1, product2];

    function mockProductQuery() {
      var defer = $q.defer();
      productsPromise = defer.promise;
      defer.resolve(products.slice());
      sinon.stub(Product, "query").returns(productsPromise);
    }

    beforeEach(inject(function (_$q_, $controller, _Product_, $rootScope) {
      $q = _$q_;
      Product = _Product_;

      mockProductQuery();

      $scope = $rootScope.$new();

      $controller('ProductsAdminCtrl', {$scope: $scope});
      $scope.$apply();
    }));

    it('should assign products', inject(function () {
      expect($scope.productsPromise).to.equal(productsPromise);
      expect($scope.products).to.deep.eq(products);
    }));

    describe("delete product", function () {
      beforeEach(function () {
        product1.remove = function () {
          return {then: function (fn) {
            fn();
          }};
        };
      });

      it('should delete product', inject(function () {
        $scope.destroy(product1);
        $scope.$apply();
        expect($scope.products).to.deep.eq([product2]);
      }));

    });

    describe('resets products', function () {
      function mockProductReset() {
        var defer = $q.defer();
        resetPromise = defer.promise;
        defer.resolve();
        sinon.stub(Product, "reset").returns(resetPromise);
      }

      beforeEach(function () {
        mockProductReset();
      });

      it('should reset products', function () {
        $scope.products = [product1];
        $scope.reset();
        $scope.$apply();
        expect($scope.products).to.deep.eq([product1, product2]);
      });

      afterEach(function () {
        Product.reset.restore();
      });
    });

    describe("updates", function () {
      var product1Copy = {};
      var savePromise;

      function mockProductSave(ok) {
        var defer = $q.defer();
        savePromise = defer.promise;
        if (ok) {
          defer.resolve();
        }
        else {
          defer.reject({data: {name: ["error"]}});
        }

        product1Copy.save = function () {
          return savePromise;
        };
      }

      beforeEach(function () {
        var cb = sinon.stub(angular, "copy");
        cb.withArgs(product1).returns(product1Copy);
      });

      describe("no errors", function () {
        beforeEach(function () {
          mockProductSave(true);
        });

        it("saves", function () {
          var promise = $scope.update(product1, "NewName");
          $scope.$apply();

          expect(product1Copy.name).to.equal("NewName");
          promise.then(function (result) {
            expect(result).to.eq(true);
          });
        });
      });

      describe("errors", function () {
        beforeEach(function () {
          mockProductSave(false);
        });

        it("saves", function () {
          var promise = $scope.update(product1, "NewName");
          $scope.$apply();

          expect(product1Copy.name).to.equal("NewName");
          promise.then(function (result) {
            expect(result).to.eq("Could not save: error");
          });
        });
      });

      afterEach(function () {
        angular.copy.restore();
      });

    });

    describe("creates", function () {
      var name = "new product";
      var product = {name: name};
      var createPromise;

      function mockProductCreate(ok) {
        var defer = $q.defer();
        createPromise = defer.promise;
        if (ok) {
          defer.resolve(product);
        }
        else {
          defer.reject({data: {name: ["error"]}});
        }

        Product.create = function (attrs) {
          if (attrs.name == name) {
            return  createPromise;
          }
        };
      }

      describe("ok", function () {
        beforeEach(function () {
          mockProductCreate(true);
        });

        it("creates product", function () {
          $scope.product = {name: name };
          $scope.create();
          $scope.$apply();
          expect($scope.products).to.deep.eq([product1, product2, product]);
          $scope.isCreatingProduct.should.eq(false);
        });
      });

      describe("fails", function () {
        beforeEach(function () {
          mockProductCreate(false);
        });

        it("creates product", function () {
          $scope.product = {name: name };
          $scope.create();
          $scope.$apply();
          expect($scope.products).to.deep.eq([product1, product2]);
          $scope.isCreatingProduct.should.eq(false);
        });
      });

    });

  });

});

