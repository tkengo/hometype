(function($) {
  $.fn.screenCenter = function() {
    return this.each(function() {
      var windowWidth         = window.innerWidth;
      var windowHeight        = window.innerHeight;
      var elementWidth        = $(this).outerWidth();
      var elementHeight       = $(this).outerHeight();
      var screenOffsetTop     = document.body.scrollTop;

      var top  = screenOffsetTop + (windowHeight / 2) - (elementHeight / 2);
      var left =                   (windowWidth  / 2) - (elementWidth  / 2);

      $(this).css({
        position: 'absolute',
        top: top,
        left: left
      });
    });
  };

  $.fn.isInner = function(target) {
    if (!target) {
      return false;
    }

    var targetElementOffset = target.offset();
    var srcElementOffset    = $(this).offset();

    var outerBoxPosition = {};
    outerBoxPosition.top    = targetElementOffset.top;
    outerBoxPosition.left   = targetElementOffset.left;
    outerBoxPosition.bottom = outerBoxPosition.top  + target.height();
    outerBoxPosition.right  = outerBoxPosition.left + target.width();

    return outerBoxPosition.top    <= srcElementOffset.top  &&
           outerBoxPosition.left   <= srcElementOffset.left &&
           outerBoxPosition.bottom >= srcElementOffset.top  &&
           outerBoxPosition.right  >= srcElementOffset.left;
  };

  $.fn.tag = function() {
    return this.get(0).tagName.toLowerCase();
  };

  $.extend($.expr.filters, {
    clickable: function(element) {
      return (/^(select|a|area)$/i.test(element.nodeName) || $.css(element, 'cursor') === 'pointer') &&
             element.innerHTML !== '';
    },
    submittable: function(element) {
      return element.nodeName.toLowerCase() === 'input' &&
             /^(submit|reset|image|radio)$/.test(element.type);
    },
    visualable: function(element) {
      return /^(div|section|th|td|header)$/i.test(element.nodeName);
    },
    insertable: function(element) {
      var isInput           = element.nodeName.toLowerCase() === 'input' && /^(text|password|tel)$/.test(element.type);
      var isTextarea        = element.nodeName.toLowerCase() === 'textarea'
      var isContentEditable = element.getAttribute('contenteditable') === 'true'

      return isInput || isTextarea || isContentEditable;
    },
    screen: function(element) {
      var docElem = element.ownerDocument.documentElement;

      if (!jQuery.contains(docElem, element)) {
        return false;
      }

      var box = element.getBoundingClientRect();
      var screenOffsetTop     = document.body.scrollTop;
      var screenOffsetBottom  = screenOffsetTop + window.innerHeight;
      var elementOffsetTop    = box.top + window.pageYOffset - docElem.clientTop;
      var elementOffsetBottom = elementOffsetTop + element.offsetHeight;

      return $.expr.filters.visible(element) &&
             $.css(element, 'visibility') !== 'hidden' &&
             elementOffsetBottom >= screenOffsetTop &&
             screenOffsetBottom  >= elementOffsetTop;
    }
  });
})(jQuery);
