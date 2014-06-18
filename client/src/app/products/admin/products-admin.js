angular.module('ngReviews.products.admin', [
  'ui.router',
  'resources.product',
  'xeditable',
  'security',
  'ddConfirmClick'
])
  .config(function ($stateProvider, securityAuthorizationProvider) {
    $stateProvider.state('products.admin', {
      url: '/products/admin',
      controller: 'ProductsAdminCtrl',
      templateUrl: 'products/admin/products-admin.tpl.html',
      data: { pageTitle: 'Products Admin' },
      resolve: {
        authenticatedUser: securityAuthorizationProvider.requireAuthenticatedUser
      }
    });
  })
  .controller('ProductsAdminCtrl', function ($scope, Product, $q) {
    var ctrl = this;

    this.refresh = function () {
      $scope.productsPromise = Product.query();
      $scope.productsPromise.then(function (products) {
        $scope.products = products;
      });
    };

    $scope.destroy = function (product) {
      product.remove().then(function () {
        $scope.products.splice($scope.products.indexOf(product), 1);
      });
    };

    $scope.reset = function () {
      $scope.products = null;
      Product.reset().then(function () {
        ctrl.refresh();
      });
    };

    $scope.update = function (product, name) {
      var defer = $q.defer();

      var productCopy = angular.copy(product);
      productCopy.name = name;
      productCopy.save().then(function () {
        defer.resolve(true);
      }, function (res) {
        defer.resolve("Could not save: " + res.data.name.join(", "));
      });

      return defer.promise;
    };

    $scope.create = function () {
      $scope.isCreatingProduct = true;
      $scope.productCreatePromise = Product.create({
        name: $scope.product.name
      });
      $scope.productCreatePromise.then(function (product) {
        $scope.isCreatingProduct = false;
        $scope.product.name = "";
        $scope.products.push(product);
      }, function () {
        $scope.isCreatingProduct = false;
      });
    };

    ctrl.refresh();
  });