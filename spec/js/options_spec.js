describe('HometypeOption', function() {
  beforeEach(function() {
    this.instance = HometypeOptions.getInstance();
  });

  it('should be singleton object', function() {
    expect(this.instance).toBe(HometypeOptions.getInstance());
  });

  it('should have empty option value at first', function() {
    expect(this.instance.options).toBeEmpty();
  });

  describe('loading options', function() {
    var option = { lv1: { lv2_1: 'test1', lv2_2: 'test2' } };
    var loadedCallback = { callback: function() { } };;

    beforeEach(function(done) {
      spyOn(loadedCallback, 'callback');
      loadOption.call(this, done, option, loadedCallback.callback);
    });

    it('should be loaded options value', function(done) {
      expect(this.instance.options).toEqual(option);
      done();
    });

    it('should invoke callback', function(done) {
      expect(loadedCallback.callback).toHaveBeenCalled();
      done();
    });
  });

  describe('callback registration', function() {
    var loadedCallback = { callback: function() { } };;

    beforeEach(function(done) {
      spyOn(loadedCallback, 'callback');
      this.instance.onLoaded(loadedCallback.callback);

      loadOption.call(this, done, {});
    });

    it('should invoke callback method when option value was changed', function(done) {
      expect(loadedCallback.callback).toHaveBeenCalled();
      done();
    });
  });
});

function loadOption(done, option, loadedCallback) {
  chrome.runtime.sendMessage = function(params, callback) {
    callback(option);
    done();
  };
  this.instance.load(loadedCallback);
}
