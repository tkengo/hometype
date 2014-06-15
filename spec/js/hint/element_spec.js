describe('Element', function() {
  var element;
  var hintElement;
  var key = 'ab';
  var theme = 'yellow';

  beforeEach(function() {
    loadFixtures('hint/element.html');
    element = document.getElementById('no_class_target');
    hintElement = new HintElement(element, 0, key, theme);
    document.documentElement.appendChild(hintElement.getTipElement());
  });

  it('should create a hint tip element', function() {
    var tip = hintElement.getTipElement();

    expect(tip.tagName).toBe('DIV');
    expect(tip.innerText).toBe(key);
    expect(tip.id).toBe('hometype-hit-a-hint-element-' + key);
    expect(tip.className).toBe('hometype-hit-a-hint-' + theme + ' hometype-hit-a-hint-base');
  });

  it('should be given new class name', function() {
    expect(element.className).toBe('hometype-hit-a-hint-' + theme + '-area');
  });

  it('should return the source element', function() {
    expect(hintElement.getElement()).toBe(element);
  });

  it('should return the hint key', function() {
    expect(hintElement.getKey()).toBe(key);
  });

  describe('when the tip element be removed from dom', function() {
    beforeEach(function() {
      hintElement.removeHintTip();
    });

    it('should be able to be referenced it', function() {
      expect(hintElement.getTipElement().parentNode).toBeEmpty();
      expect(element.className).toBeEmpty();
    });
  });

  describe('when hint key was pushed', function() {
    beforeEach(function() {
      hintElement.setPushed();
    });

    it('should add a new class', function() {
      var className = hintElement.getTipElement().children[0].className;
      expect(className).toBe('hometype-hit-a-hint-pushed');
    });
  });

  describe('has classes', function() {
    beforeEach(function() {
      element = document.getElementById('class_target');
      hintElement = new HintElement(element, 0, key, theme);
    });

    it('should be given a new class name with existing class names', function() {
      expect(element.className).toBe('hoge hometype-hit-a-hint-' + theme + '-area');
    });
  });
});
