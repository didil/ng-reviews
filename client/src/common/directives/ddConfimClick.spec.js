describe('Directive: ddConfirmClick', function () {
  var element, scope, compile, $q, dialogs,
    validTemplate = ' <button class="btn btn-info" dd-confirm-click="reset()" dd-confirm-title="My Title"  dd-confirm-text="My Text">Reset with confirm</button>';

  function createDirective(template) {
    var elm;

    scope.reset = sinon.spy();

    elm = compile(template)(scope);

    return elm;
  }

  beforeEach(function () {
    module('ddConfirmClick');

    inject(function ($rootScope, $compile, _dialogs_, _$q_) {
      scope = $rootScope.$new();
      compile = $compile;
      dialogs = _dialogs_;
      $q = _$q_;
    });
  });

  function mockDialog(dialogs, confirmed) {
    var defer = $q.defer();
    var resultPromise = defer.promise;
    if (confirmed) {
      defer.resolve();
    } else {
      defer.reject();
    }
    defer.resolve();

    var dlg = {result: resultPromise};
    var cb = sinon.stub(dialogs, "confirm");
    cb.withArgs("My Title", "My Text").returns(dlg);
  }

  describe("confirmed", function () {
    beforeEach(function () {
      mockDialog(dialogs, true);
      element = createDirective(validTemplate);
    });

    it('should call cb on click', inject(function () {
      element[0].click();
      scope.$apply();
      expect(scope.reset.calledOnce).to.equal(true);
    }));

    afterEach(function () {
      dialogs.confirm.restore();
    });
  });

  describe("not confirmed", function () {
    beforeEach(function () {
      mockDialog(dialogs, false);
      element = createDirective(validTemplate);
    });

    it('should not call cb on click', inject(function () {
      element[0].click();
      scope.$apply();
      expect(scope.reset.called).to.equal(false);
    }));

    afterEach(function () {
      dialogs.confirm.restore();
    });
  });

});