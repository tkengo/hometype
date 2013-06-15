var HintElement = function(srcElement, index, key, hintTheme) {
  this.className = 'chromekey-hit-a-hint-' + hintTheme;
  this.index     = index;
  this.key       = key;

  this.srcElement = srcElement;
  this.srcElement.addClass(this.className + '-area');

  this.tipElement = this.createTipElement();
  this.tipElement.appendTo($('body'));
};

HintElement.prototype.createTipElement = function() {
  var top = 0, left = 0;
  if (this.srcElement.get(0).tagName.toLowerCase() == 'area') {
    var coords = this.srcElement.attr('coords').split(',');
    top = coords[1];
    left = coords[0];
  }
  else {
    top  = this.srcElement.offset().top - 10;
    left = this.srcElement.offset().left - 10;
  }

  var div = $('<div>').css({
    'top': top + 'px',
    'left': left + 'px'
  }).addClass(this.className).addClass('chromekey-hit-a-hint-base');

  for (var i in this.key) {
    div.append($('<span>').text(this.key[i]));
  }

  return div;
};

HintElement.prototype.getElement = function() {
  return this.srcElement;
};

HintElement.prototype.getTipElement = function() {
  return this.tipElement;
};

HintElement.prototype.getKey = function() {
  return this.key;
};

HintElement.prototype.setPushed = function() {
  $(this.tipElement.children()[0]).addClass('chromekey-hit-a-hint-pushed');
};

HintElement.prototype.hideHintTip = function() {
  this.getElement().removeClass(this.className + '-area');
  this.tipElement.fadeOut(100);
};
