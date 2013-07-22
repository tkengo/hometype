var _Viewport = function() {
  this.visualableTags = 'div:screen, section:screen, th:screen, td:screen, header:screen';
};

_Viewport.prototype.getScrollPosition = function() {
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
  document.body.scrollTop = y;
  document.body.scrollLeft = x;
};

_Viewport.prototype.scrollDown = function(value) {
  var pos = this.getScrollPosition();
  this.scrollTo(pos.left, pos.top + value);
};

_Viewport.prototype.scrollUp = function(value) {
  var pos = this.getScrollPosition();
  this.scrollTo(pos.left, pos.top - value);
};

_Viewport.prototype.scrollLeft = function(value) {
  var pos = this.getScrollPosition();
  this.scrollTo(pos.left - value, pos.top);
};

_Viewport.prototype.scrollRight = function(value) {
  var pos = this.getScrollPosition();
  this.scrollTo(pos.left + value, pos.top);
};

_Viewport.prototype.divElementInnerScreen = function() {
  var _this = this;
  var elements = [];
  $(this.visualableTags).each(function() {
    var element = $(this);
    elements.push(element);
  });

  return elements;
};

_Viewport.prototype.setContentEditable = function(element) {
  element.attr('contenteditable', true);
  element.attr('data-chromekey-not-insert-mode', 'true');
  element.attr('data-chromekey-contenteditable', 'true');
  $('<div>').addClass('chromekey-contenteditable').css({
    width: element.innerWidth() + 10,
    height: element.innerHeight() + 10,
    top: element.offset().top - 5,
    left: element.offset().left - 5
  }).appendTo($('body')).click(function() {
    element.focus();
  });
};

_Viewport.prototype.resetContentEditable = function() {
  var element = this.getCurrentContentEditable();
  element.removeAttr('contenteditable');
  element.removeAttr('data-chromekey-not-insert-mode');
  element.removeAttr('data-chromekey-contenteditable');
  $('.chromekey-contenteditable').remove();
  $(document.activeElement).blur();
};

_Viewport.prototype.getCurrentContentEditable = function() {
  return $('[data-chromekey-contenteditable=true]');
};

_Viewport.prototype.getNextContentEditableElement = function(current) {
  var next = null;

  while (current.length > 0) {
    next = current.next();
    if (next.length > 0) {
      if (next.is(this.visualableTags) && next.is(':visible')) {
        break;
      }
      else {
        current = next;
      }
    }
    else {
      current = current.parent();
    }
  }
  
  return next;
};

_Viewport.prototype.getPrevContentEditableElement = function(current) {
  var prev = null;

  while (current.length > 0) {
    prev = current.prev();
    if (prev.length > 0) {
      if (prev.is(this.visualableTags) && prev.is(':visible')) {
        break;
      }
      else {
        current = prev;
      }
    }
    else {
      current = current.parent();
    }
  }
  
  return prev;
};

_Viewport.prototype.createLink = function(url, parent) {
  var parent = $(parent || 'body');
  return $('<a>').attr('href', url).appendTo(parent);
};

var Viewport = new _Viewport();
