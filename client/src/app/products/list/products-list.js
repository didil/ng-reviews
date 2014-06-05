angular.module('ngReviews.products.list', [
  'ui.router',
  'resources.product'
])
  .config(function ($stateProvider) {
    $stateProvider.state('products.list', {
      url: '/products/list',
      controller: 'ProductsListCtrl',
      templateUrl: 'products/list/products-list.tpl.html',
      data: { pageTitle: 'Products List' },
      resolve: {
        products: ['Product', function (Product) {
          return Product.query();
        }]
      }
    });
  })
  .controller('ProductsListCtrl', function ($scope, products) {
    $scope.products = products;
  });

