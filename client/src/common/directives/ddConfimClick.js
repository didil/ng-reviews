angular.module('ddConfirmClick', ['dialogs.main'])

  .directive('ddConfirmClick', function (dialogs) {
    return{
      restrict: 'A',
      scope: {
        ddConfirmClick: '&'
      },
      link: function (scope, element, attrs) {
        element.bind('click', function () {
          var dlg = dialogs.confirm(attrs.ddConfirmTitle || "Confirm", attrs.ddConfirmText || "Are you sure ?");
          dlg.result.then(function () {
              scope.ddConfirmClick();
            }
          );
        });
      }
    };
  });