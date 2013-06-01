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

Command.closeTab = function() {
  chrome.runtime.sendMessage('closeTab');
};

Command.goToHintMode = function() {
  Resource.Mode.changeMode(ModeList.HINT_MODE);
  $('div.chromekey-hit-a-hint').remove();

  Resource.Viewport.clickableElement().each(function() {
    if (Resource.Viewport.isInnerScreen($(this))) {
      $(this).addClass('chromekey-hit-a-hint-area');

      $('<div>').css({
        'top': ($(this).offset().top - 10) + 'px',
        'left': ($(this).offset().left - 10) + 'px'
      }).addClass('chromekey-hit-a-hint').text('a').appendTo($('body'));
    }
    else {
      $(this).removeClass('chromekey-hit-a-hint-area');
    }
  });
};
