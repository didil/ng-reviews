describe('product resource', function () {
  beforeEach(module('resources.product'));

  function compareToProduct1(product){
    expect(product.id).to.equal(1);
    expect(product.name).to.equal("Grado PS1000 Pro Series Headphone");
    expect(product.imageUrl).to.equal("assets/41GzNqk3xrL._AA160_.jpg");
  }

  it('query', inject(function (Product) {
    var products = Product.query();

    expect(products.length).to.equal(3);
    compareToProduct1(products[0]);
  }));

  it('get', inject(function (Product) {
    var product = Product.get({id:1});

    compareToProduct1(product);
  }));
});