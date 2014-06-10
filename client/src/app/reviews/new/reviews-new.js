angular.module('ngReviews.reviews.new', [
  'ui.router',
  'ui.bootstrap',
  'resources.review',
  'resources.product'
])
  .config(function config($stateProvider) {
    $stateProvider.state('reviews.new', {
      url: '/reviews/new/:productId',
      controller: 'ReviewsNewCtrl',
      templateUrl: 'reviews/new/reviews-new.tpl.html',
      data: { pageTitle: 'New Review' }
    });
  })
  .controller('ReviewsNewCtrl', function ($scope, $state, Product, Review , $stateParams) {
    $scope.productPromise = Product.get($stateParams.productId);
    $scope.productPromise.then(function(product){
      $scope.product = product;
    });

    $scope.review = {};

    $scope.save = function () {
      $scope.review.productId = $scope.product.id;
      $scope.review.productName = $scope.product.name;
      $scope.review.createdAt = new Date();

      Review.$add($scope.review);
      $state.go('reviews.list');
    };
  });

