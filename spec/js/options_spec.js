beforeEach(function() {
  this.addMatchers(customMatchers);
});

describe('HometypeOption', function() {
  beforeEach(function() {
    this.instance = HometypeOptions.getInstance();
  });

  it('should be singleton object', function() {
    expect(this.instance).toBe(HometypeOptions.getInstance());
  });

  it('should modify option value', function() {
    expect(this.instance.option).toBeEmpty();
  });
});
