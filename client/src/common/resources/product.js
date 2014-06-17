angular.module('resources.product', ['rails'])
  .factory('Product', function (railsResourceFactory) {
    var baseUrl = '/api/v1/products';

    var Product = railsResourceFactory({
      url: baseUrl,
      name: 'product'
    });

    Product.reset = function () {
      return Product.$post(baseUrl + '/reset');
    };

    return  Product;
  });