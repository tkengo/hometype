// ヒントモードの時のキー
var HintKeys = 'jfhklasdgyuiopqwertnmzxcvb';

var HintElement = function() {
  this.elements = Viewport.clickableElementInnerScreen();

  this.keyIndex1 = 0;
  this.keyIndex2 = 0;

  this.hintKeys = [];
};

HintElement.prototype.getElements = function() {
  return this.elements;
};

HintElement.prototype.setHintTip = function(index, key) {
  var element = this.elements[index];
  element.addClass('chromekey-hit-a-hint-area');

  var tipElement = $('<div>').css({
    'top': (element.offset().top - 10) + 'px',
    'left': (element.offset().left - 10) + 'px'
  }).attr('id', 'chromekey-hit-a-hint-' + index).addClass('chromekey-hit-a-hint');

  for (var i in key) {
    tipElement.append($('<span>').text(key[i]));
  }

  tipElement.appendTo($('body'));

  this.hintKeys.push({
    index: index,
    key: key
  });
};

HintElement.prototype.setRedFirstKey = function(index) {
  $($('#chromekey-hit-a-hint-' + index).children()[0]).css('color', 'red');
};

HintElement.prototype.hideHintTip = function(index) {
  this.elements[index].removeClass('chromekey-hit-a-hint-area');
  $('#chromekey-hit-a-hint-' + index).fadeOut(100);
};

HintElement.prototype.getMatchedElements = function(key) {
  var results = [];

  for (var i in this.hintKeys) {
    var hintKey = this.hintKeys[i];
    if (hintKey.key.indexOf(key) == 0) {
      results.push({
        element: this.elements[hintKey.index],
        index: i
      });
    }
  }
  
  return results;
};

HintElement.prototype.hideUnmatchedElements = function(key) {
  for (var i in this.hintKeys) {
    var hintKey = this.hintKeys[i];
    if (hintKey.key.indexOf(key) != 0) {
      this.hideHintTip(hintKey.index);
    }
  }
};

HintElement.prototype.removeAllHint = function() {
  $('.chromekey-hit-a-hint').fadeOut(100, function() {
    $('div.chromekey-hit-a-hint').remove();
  });
  $('.chromekey-hit-a-hint-area').removeClass('chromekey-hit-a-hint-area');;
  $('body').css('overflow', this.originalBodyOverflow);
};

HintElement.prototype.show = function() {
  $('.chromekey-hit-a-hint').fadeIn(100);

  this.originalBodyOverflow = $('body').css('overflow');
  $('body').css('overflow', 'hidden');
};

HintElement.prototype.nextHintKey = function() {
  var multiKey = this.elements.length > HintKeys.length;

  var key1 = HintKeys[this.keyIndex1];
  var key2 = '';

  if (multiKey) {
    key2 = HintKeys[this.keyIndex2++];
    if (this.keyIndex2 == HintKeys.length) {
      this.keyIndex2 = 0;
      this.keyIndex1++;
    }
  }
  else {
    this.keyIndex1++;
  }

  return key2 + key1;
};
