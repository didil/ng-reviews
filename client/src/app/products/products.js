angular.module('ngReviews.products', [
  'ui.router',
  'ngReviews.products.list',
  'ngReviews.products.admin'
])
  .config(function ($stateProvider) {
    $stateProvider.state('products', {
      views: {
        "main": {
          templateUrl: 'products/products.tpl.html'
        }
      }
    });
  });
