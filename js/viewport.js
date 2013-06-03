var _Viewport = function() {
};

_Viewport.prototype.scrollPosition = function() {
  return {
    top: document.body.scrollTop,
    left: document.body.scrollLeft
  }
};

_Viewport.prototype.getWindowWidth = function() {
  return window.innerWidth;
};

_Viewport.prototype.getWindowHeight = function() {
  return window.innerHeight;
};

_Viewport.prototype.getDocumentWidth = function() {
  return $(document).width();
};

_Viewport.prototype.getDocumentHeight = function() {
  return $(document).height();
};

_Viewport.prototype.scrollTo = function(x, y) {
  // $(document.body).animate({ scrollTop: y + 'px', scrollLeft: x + 'px' }, 100);
  document.body.scrollTop = y;
  document.body.scrollLeft = x;
};

_Viewport.prototype.scrollDown = function(value) {
  var pos = this.scrollPosition();
  this.scrollTo(pos.left, pos.top + value);
};

_Viewport.prototype.scrollUp = function(value) {
  var pos = this.scrollPosition();
  this.scrollTo(pos.left, pos.top - value);
};

_Viewport.prototype.scrollLeft = function(value) {
  var pos = this.scrollPosition();
  this.scrollTo(pos.left - value, pos.top);
};

_Viewport.prototype.scrollRight = function(value) {
  var pos = this.scrollPosition();
  this.scrollTo(pos.left + value, pos.top);
};

_Viewport.prototype.clickableElementInnerScreen = function() {
  var _this = this;
  var elements = [];
  $('a[href], *[onclick]').each(function() {
    var element = $(this);
    if (_this.isInnerScreen(element)) {
      elements.push(element);
    }
  });

  return elements;
};

_Viewport.prototype.createNewHintElement = function() {
  this.hintElement = new HintElementCollection();
  return this.hintElement;
};

_Viewport.prototype.getCurrentHintElement = function() {
  return this.hintElement;
};

_Viewport.prototype.isInnerScreen = function(element) {
  var screenOffsetTop     = this.scrollPosition().top;
  var screenOffsetBottom  = screenOffsetTop + this.getWindowHeight();
  var elementOffsetTop    = element.offset().top;
  var elementOffsetBottom = elementOffsetTop + element.height();

  return elementOffsetBottom > screenOffsetTop && screenOffsetBottom > elementOffsetTop;
};

_Viewport.prototype.setContentEditable = function(editable) {
  return $('html').attr('contenteditable', editable);
};

var Viewport = new _Viewport();
