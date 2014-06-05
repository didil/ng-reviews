angular.module('ngReviews.reviews.list', [
  'ui.router',
  'resources.review',
  'angularMoment',
  'ngAnimate'
])
  .config(function ($stateProvider) {
    $stateProvider.state('reviews.list', {
      url: '/reviews/list',
      controller: 'ReviewsListCtrl',
      templateUrl: 'reviews/list/reviews-list.tpl.html',
      data: { pageTitle: 'Reviews List' }
    });
  })
  .controller('ReviewsListCtrl', function ($scope, Review) {
    $scope.reviews = Review;
  });

