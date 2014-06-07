angular.module('ngReviews.reviews.new', [
  'ui.router',
  'ui.bootstrap',
  'resources.review'
])
  .config(function config($stateProvider) {
    $stateProvider.state('reviews.new', {
      url: '/reviews/new/:productId',
      controller: 'ReviewsNewCtrl',
      templateUrl: 'reviews/new/reviews-new.tpl.html',
      data: { pageTitle: 'New Review' },
      resolve: {
        product: ['$stateParams', 'Product', function ($stateParams, Product) {
          return Product.get($stateParams.productId);
        }]
      }
    });
  })
  .controller('ReviewsNewCtrl', function ($scope, $state, product, Review) {
    $scope.product = product;
    $scope.review = {productId: product.id };

    $scope.save = function () {
      $scope.review.productName = $scope.product.name;
      $scope.review.createdAt = new Date();

      Review.$add($scope.review);
      $state.go('reviews.list');
    };
  });

