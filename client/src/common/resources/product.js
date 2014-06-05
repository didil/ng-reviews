angular.module('resources.product', [])
  .factory('Product', function () {
    var Product = {};

    var products = [
      {
        id: 1,
        name: "Grado PS1000 Pro Series Headphone",
        imageUrl: "/assets/41GzNqk3xrL._AA160_.jpg"
      },
      {
        id: 2,
        name: "Ultrasone EDITION 10 Headphones",
        imageUrl: "/assets/41lVYBj-gnL._AA160_.jpg"
      },
      {
        id: 3,
        name: "Sennheiser HD800 Over-Ear Headphone",
        imageUrl: "/assets/41mRUE8SOSL._AA160_.jpg"
      }
    ];


    Product.query = function () {
      return products;
    };

    Product.get = function (conditions) {
      return products[conditions.id -1];
    };

    return Product;
  });