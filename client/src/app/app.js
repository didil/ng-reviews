angular.module('ngReviews', [
  'templates-app',
  'templates-common',
  'ngReviews.products',
  'ngReviews.reviews',
  'ui.router',
  'cgBusy',
  'ngAnimate',
  'security',
  'xeditable'
])

  .constant('I18N.MESSAGES', {
    'errors.route.changeError': 'Route change error',
    'login.reason.notAuthorized': "You do not have the necessary access permissions.  Do you want to login as someone else?",
    'login.reason.notAuthenticated': "You must be logged in to access this part of the application.",
    'login.error.invalidCredentials': "Login failed.  Please check your credentials and try again.",
    'login.error.serverError': "There was a problem with authenticating: {{exception}}."
  })

  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/products/list');
  })

  .run(function (security, editableOptions) {
    // Get the current user when the application starts
    // (in case they are still logged in from a previous session)
    security.requestCurrentUser();

    editableOptions.theme = 'bs3';
  })

  .controller('AppCtrl', function ($scope) {
    $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
      if (angular.isDefined(toState.data.pageTitle)) {
        $scope.pageTitle = toState.data.pageTitle + ' | ngReviews';
      }
    });
  })

  .controller('HeaderCtrl', function ($scope, security) {
    $scope.isAuthenticated = security.isAuthenticated;
  });
