angular.module('ngReviews.products', [
  'ui.router',
  'ngReviews.products.list'
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
