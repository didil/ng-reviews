angular.module('ngReviews.products.admin', [
  'ui.router',
  'resources.product',
  'dialogs.main'
])
  .config(function ($stateProvider) {
    $stateProvider.state('products.admin', {
      url: '/products/admin',
      controller: 'ProductsAdminCtrl',
      templateUrl: 'products/admin/products-admin.tpl.html',
      data: { pageTitle: 'Products Admin' }
    });
  })
  .controller('ProductsAdminCtrl', function ($scope, Product,dialogs) {
    $scope.productsPromise = Product.query();
    $scope.productsPromise.then(function (products) {
      $scope.products = products;
    });

    $scope.destroy = function (product) {
      var dlg = dialogs.confirm("Delete Product ?", "Are you sure you want to delete this product ?");
      dlg.result.then(function(btn){
        product.remove().then(function () {
          $scope.products.splice( $scope.products.indexOf(product), 1 );
        });
      });
    };
  });

