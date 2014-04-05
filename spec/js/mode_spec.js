describe('HometypeMode', function() {
  beforeEach(function() {
    this.instance = new HometypeMode();
  });

  it('should be normal mode at first', function() {
    expect(this.instance.getCurrentMode()).toBe(ModeList.NORMAL_MODE);
  });

  it('should return current mode', function() {
    var newMode = ModeList.HINT_MODE;

    this.instance.changeMode(newMode);
    expect(this.instance.getCurrentMode()).toBe(newMode);
  });

  describe('changing mode', function() {
    var callbacks = {
      callback1: function() { },
      callback2: function() { },
      callback3: null
    };

    beforeEach(function() {
      spyOn(callbacks, 'callback1');
      spyOn(callbacks, 'callback2');

      this.instance.onModeChange(callbacks.callback1);
      this.instance.onModeChange(callbacks.callback2);
      this.instance.onModeChange(callbacks.callback3);
    });

    it('should invoke a callback method when the current mode was changed', function() {
      this.instance.changeMode(ModeList.HINT_MODE);

      expect(callbacks.callback1).toHaveBeenCalled();
      expect(callbacks.callback2).toHaveBeenCalled();
    });

    it('should do noop when the current mode was not changed', function() {
      this.instance.changeMode(ModeList.NORMAL_MODE);

      expect(callbacks.callback1).not.toHaveBeenCalled();
      expect(callbacks.callback2).not.toHaveBeenCalled();
    });
  });

  describe('entering particular mode', function() {
    it('should return hint processor when enter hint mode', function() {
      var processor = this.instance.enterHintMode('theme', []);
      expect(processor.createHints).toBeDefined();
    });

    it('should return visual processor when enter visual mode', function() {
      var processor = this.instance.enterVisualMode($('<div>'));
      expect(processor).toEqual(this.instance.getProcessor(ModeList.VISUAL_MODE));
    });
  });
});
