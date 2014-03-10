
var HELP_BOX_HEIGHT = 400;
var HELP_BOX_MARGIN = 20;

var HometypeHelpBox = function() {
  var windowWidth = Viewport.getWindowSize().width;

  var box = $('<div>').addClass('hometype-help-box')
                      .attr('id', '_hometype-help-box')
                      .width(windowWidth - HELP_BOX_MARGIN * 4)
                      .height(HELP_BOX_HEIGHT);

  var command_list = $('<ul>').addClass('hometype-commands-list');

  this.box = box;

  $.each(KeyMap.assignedCommands(), function(mode, commands) {
    $.each(commands, function(key, command) {
      var list = $('<li>');
      list.text(mode + ': ' + key + ' ' + command);
      list.appendTo(command_list);
    });
  });

  command_list.appendTo(this.box);

  $(document).ready($.proxy(function() {
    this.box.appendTo($('body'));
  }, this));
};

HometypeHelpBox.prototype.show = function() {
  // Calculate position.
  var scrollTop = Viewport.getScrollPosition().top;

  // Place command box to calculated position and show it.
  this.box.css({
    top: scrollTop * 1.2,
    left: HELP_BOX_MARGIN
  }).fadeIn(300);

  this.box.fadeIn(300);
};

HometypeHelpBox.prototype.hide = function() {
  this.box.hide();
};

var HelpBox = new HometypeHelpBox();
