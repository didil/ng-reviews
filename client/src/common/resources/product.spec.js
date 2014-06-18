describe('product resource', function () {
  var $httpBackend , Product;

  beforeEach(module('resources.product'));

  beforeEach(inject(function (_$httpBackend_, _Product_) {
    $httpBackend = _$httpBackend_;
    Product = _Product_;
  }));

  describe("resets", function () {
    beforeEach(function () {
      $httpBackend.when('POST', '/api/v1/products/reset').respond("true");
    });

    it("posts reset", function () {
      var promise = Product.reset();

      $httpBackend.flush();

      promise.then(function (response) {
        expect(response).to.eq("true");
      });
    });
  });


  describe("creates", function () {
    var attrs = {name: "My name"};

    beforeEach(function () {
      $httpBackend.when('POST', '/api/v1/products', {product: attrs}).respond("true");
    });

    it("posts create", function () {
      var promise = Product.create(attrs);

      $httpBackend.flush();

      promise.then(function (product) {
        expect(product.name).to.eq(attrs.name);
      });
    });
  });

  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

});