describe('HometypeOption', function() {
  beforeEach(function() {
    this.instance = HometypeOptions.getInstance();
  });

  it('should be singleton object', function() {
    expect(this.instance).toBe(HometypeOptions.getInstance());
  });

  it('should modify option value', function() {
    expect(this.instance.options).toBeEmpty();

    var option1 = { lv1: { lv2_1: 'test1', lv2_2: 'test2' } };
    mock.fireEvent('chrome.runtime.connect.onMessage', option1);
    expect(this.instance.options).toBe(option1);
//
//     var option2 = { lv1: { lv2_2: 'deep merge' } };
//     this.instance.setOption(option2);
//     expect(this.instance.option).toBe({ lv1: { lv2_1: 'test1', lv2_2: 'deep merge' } });
  });
});
