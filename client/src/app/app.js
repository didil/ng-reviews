angular.module('ngReviews', [
  'templates-app',
  'templates-common',
  'ngReviews.products',
  'ngReviews.reviews',
  'ui.router',
  'ngAnimate'
])
  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/products/list');
  })
  .run(function run() {
  })
  .controller('AppCtrl', function ($scope) {
    $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
      if (angular.isDefined(toState.data.pageTitle)) {
        $scope.pageTitle = toState.data.pageTitle + ' | ngReviews';
      }
    });
  });

