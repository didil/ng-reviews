angular.module('resources.product', ['rails'])
  .factory('Product', function (railsResourceFactory) {
    return railsResourceFactory({
      url: '/api/v1/products',
      name: 'product'
    });
  });