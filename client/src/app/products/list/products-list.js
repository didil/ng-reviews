angular.module('ngReviews.products.list', [
  'ui.router',
  'resources.product'
])
  .config(function ($stateProvider) {
    $stateProvider.state('products.list', {
      url: '/products/list',
      controller: 'ProductsListCtrl',
      templateUrl: 'products/list/products-list.tpl.html',
      data: { pageTitle: 'Products List' }
    });
  })
  .controller('ProductsListCtrl', function ($scope, Product) {
    $scope.productsPromise = Product.query();
    $scope.productsPromise.then(function (products) {
      $scope.products = products;
    });
  });

