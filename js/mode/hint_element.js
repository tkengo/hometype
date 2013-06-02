var HintElement = function(srcElement, index, key) {
  this.className = Mode.getCurrentMode() == ModeList.NHINT_MODE ?
    'chromekey-hit-a-hint-n' :
    'chromekey-hit-a-hint';
  this.index = index;

  this.srcElement = srcElement;
  this.srcElement.addClass(this.className + '-area');

  this.tipElement = $('<div>').css({
    'top': (srcElement.offset().top - 10) + 'px',
    'left': (srcElement.offset().left - 10) + 'px'
  }).addClass(this.className).addClass('chromekey-hit-a-hint-base');

  for (var i in key) {
    this.tipElement.append($('<span>').text(key[i]));
  }

  this.tipElement.appendTo($('body'));
};

HintElement.prototype.getElement = function() {
  return this.srcElement;
};

HintElement.prototype.getTipElement = function() {
  return this.tipElement;
};

HintElement.prototype.setRedFirstKey = function() {
  $(this.tipElement.children()[0]).css('color', 'red');
};

HintElement.prototype.hideHintTip = function() {
  this.getElement().removeClass(this.className + '-area');
  this.tipElement.fadeOut(100);
};

HintElement.prototype.click = function() {
  var element = this.getElement();

  if (Mode.getCurrentMode() == ModeList.NHINT_MODE && element.get(0).tagName.toLowerCase() == 'a') {
    window.open(element.attr('href'), null);
  }
  else {
    element.get(0).click();
  }
};
