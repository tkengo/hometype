var Command = {};

Command.scrollDown = function() {
  Resource.Viewport.scrollDown(50);
};

Command.scrollUp = function() {
  Resource.Viewport.scrollUp(50);
};

Command.scrollDownHalf = function() {
  Resource.Viewport.scrollDown(Resource.Viewport.getWindowHeight() / 2);
};

Command.scrollUpHalf = function() {
  Resource.Viewport.scrollUp(Resource.Viewport.getWindowHeight() / 2);
};

Command.scrollDownPage = function() {
  Resource.Viewport.scrollDown(Resource.Viewport.getWindowHeight());
};

Command.scrollUpPage = function() {
  Resource.Viewport.scrollUp(Resource.Viewport.getWindowHeight());
};

Command.scrollToTop = function() {
  Resource.Viewport.scrollTo(0, 0);
};

Command.scrollToBottom = function() {
  Resource.Viewport.scrollTo(0, Resource.Viewport.getDocumentHeight());
};

Command.goToHintMode = function() {
  Resource.Mode.changeMode(ModeList.HINT_MODE);
  Resource.Viewport.clickableElement().each(function() {
    var screenOffsetTop     = Resource.Viewport.scrollPosition().top;
    var screenOffsetBottom  = screenOffsetTop + Resource.Viewport.getWindowHeight();
    var elementOffsetTop    = $(this).offset().top;
    var elementOffsetBottom = elementOffsetTop + $(this).height();

    if (elementOffsetBottom > screenOffsetTop && screenOffsetBottom > elementOffsetTop) {
      $(this).css('background-color', 'yellow');

      $('<div>').css({
        'position': 'absolute',
        'top': elementOffsetTop + 'px',
        'left': $(this).offset().left + 'px'
      }).text('hoge').appendTo($('body'));
    }
    else {
      $(this).css('background-color', '');
    }

    // var triggerNodePosition = $(this).offset().top - Resource.Viewport.getWindowHeight();
    // if (Resource.Viewport.scrollPosition().top > triggerNodePosition) {
    // }
  });
};
