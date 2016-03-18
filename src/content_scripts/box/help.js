
var HELP_BOX_MARGIN = 20;

var box_html = 
  "<div class='hometype-help-box'> " +
  "  <div class='hometype-help-box-wrap'> " +
  "    <table id='_hometype-help-box-commands-normal'> " +
  "      <tbody><tr><th>normal mode</th></tr><tr></tr></tbody> " +
  "    </table> " +
  "  </div> " +
  "  <div class='hometype-help-box-wrap'> " +
  "    <table id='_hometype-help-box-commands-insert'> " +
  "      <tbody><tr><th>insert mode</th><th></th></tr></tbody> " +
  "    </table> " +
  "    <table id='_hometype-help-box-commands-visual'> " +
  "      <tbody><tr><th>visual mode</th><th></th></tr></tbody> " +
  "    </table> " +
  "  </div> " +
  "  <div class='hometype-help-box-wrap'> " +
  "    <table id='_hometype-help-box-commands-hint'> " +
  "      <tbody><tr><th>hint mode</th><th></th></tr></tbody> " +
  "    </table> " +
  "    <table id='_hometype-help-box-commands-command'> " +
  "      <tbody><tr><th>command mode</th><th></th></tr></tbody> " +
  "    </table> " +
  "  </div> " +
  "  <div class='hometype-help-box-wrap'> " +
  "    <table id='_hometype-help-box-commands-help'> " +
  "      <tbody><tr><th>help mode</th><th></th></tr></tbody> " +
  "    </table> " +
  "  </div> " +
  "</div> ";

var HometypeHelpBox = function() {
  var windowWidth = Viewport.getWindowSize().width;
  var box = $(box_html).width(windowWidth - HELP_BOX_MARGIN * 4);

  var normal_table = $('#_hometype-help-box-commands-normal', box);

  $.each(KeyMap.assignedCommands().normal, function(key, command) {
      var raw = $('tr:last', normal_table);
      raw.append($('<td>').addClass('hometype-help-box-commands-key').text(key + ' :'))
      raw.append($('<td>').addClass('hometype-help-box-commands-command').text(command))

      if ($('td', raw).length == 4) {
        normal_table.append($('<tr>'));
      }
  });

  $.each(KeyMap.assignedCommands(), function(mode, commands) {
    if (mode == 'normal') { return true; }

    $.each(commands, function(key, command) {
      $('#_hometype-help-box-commands-' + mode, box).append(
        $('<tr>')
        .append($('<td>').addClass('hometype-help-box-commands-key').text(key + ' :'))
        .append($('<td>').addClass('hometype-help-box-commands-command').text(command))
      );
    });
  });

  this.box = box;

  $(document).ready(function() {
    box.appendTo($('body'));
  });
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
