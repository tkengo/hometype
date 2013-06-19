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

  $.fn.isInnerScreen = function() {
    var element = this;

    if (element.tag == 'area') {
      element = element.parent().parent();
    }

    var screenOffsetTop     = document.body.scrollTop;
    var screenOffsetBottom  = screenOffsetTop + window.innerHeight;
    var elementOffsetTop    = element.offset().top;
    var elementOffsetBottom = elementOffsetTop + element.height();

    return element.is(':visible') &&
           elementOffsetBottom >= screenOffsetTop &&
           screenOffsetBottom  >= elementOffsetTop;
  };
})(jQuery);
