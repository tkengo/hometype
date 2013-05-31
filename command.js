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
