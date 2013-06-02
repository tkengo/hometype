var HintElement = function(srcElement, index, key) {
  this.index = index;

  this.srcElement = srcElement;
  this.srcElement.addClass('chromekey-hit-a-hint-area');

  this.tipElement = $('<div>').css({
    'top': (srcElement.offset().top - 10) + 'px',
    'left': (srcElement.offset().left - 10) + 'px'
  }).addClass('chromekey-hit-a-hint');

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
  this.getElement().removeClass('chromekey-hit-a-hint-area');
  this.tipElement.fadeOut(100);
};

HintElement.prototype.click = function() {
  this.getElement().get(0).click();
};
