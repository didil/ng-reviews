angular.module('ngReviews.reviews', [
  'ui.router',
  'ngReviews.reviews.new',
  'ngReviews.reviews.list'
])
  .config(function ($stateProvider) {
    $stateProvider.state('reviews', {
      views: {
        "main": {
          templateUrl: 'reviews/reviews.tpl.html'
        }
      }
    });
  });
