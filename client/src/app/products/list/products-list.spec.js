describe('products section', function () {
  beforeEach(module('ngReviews.products'));

  describe('ProductsListCtrl', function () {
    var $scope = {};
    var products = [];

    beforeEach(inject(function ($controller) {
      $controller('ProductsListCtrl', {$scope: $scope, products: products});
    }));

    it('should assign products', inject(function () {
      expect($scope.products).to.equal(products);
    }));
  });

  describe('/products/list', function () {
    var $rootScope, $state, $injector, state = 'products.list';
    var products = {};

    beforeEach(function () {
      module(function ($provide) {
        $provide.value('Product', {
          query: function () {
            return products;
          }
        });
      });

      inject(function (_$rootScope_, _$state_, _$injector_, $templateCache) {
        $rootScope = _$rootScope_;
        $state = _$state_;
        $injector = _$injector_;

        $templateCache.put('products/products.tpl.html', '');
        $templateCache.put('products/list/products-list.tpl.html', '');
      });
    });

    it('should respond to URL', function () {
      expect($state.href(state)).to.equal('#/products/list');
    });

    it('should resolve data', function () {
      $rootScope.$apply(function () {
        $state.go(state);
      });

      expect($state.current.name).to.equal(state);
      // Call invoke to inject dependencies and run function
      expect($injector.invoke($state.current.resolve.products)).to.equal(products);
    });
  });

});

