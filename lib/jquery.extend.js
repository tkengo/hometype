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
