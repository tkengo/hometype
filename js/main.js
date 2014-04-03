/**
 * Copyright (c) 2013 Kengo Tateishi (@tkengo)
 * Licensed under MIT license.
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Entry point in Hometype.
 */

// Set key binding if it was changed.
var loadCallback = function(options) {
  KeyMap.clear();

  $.each($.extend(options.default_key_bind, options.key_bind), function(map, bind) {
    $.each(bind, function(key, command) {
      KeyMap[map](key, command);
    });
  });
};
HometypeOptions.getInstance().load(loadCallback);
HometypeOptions.getInstance().onLoaded(loadCallback);

// Set an event listener to the key sequence object when options have loaded.
var key = new KeySequence();
key.onProcess(function (e, sequence, stack, currentKey) {
  // Get command candidates from input keys.
  var candidate = KeyMap.candidate(Mode.getCurrentMode(), sequence);

  if (candidate.length == 1 && candidate[0].key == sequence) {
    // Execute the command if decided.
    candidate[0].command.apply(window, candidate[0].args);
    e.stopPropagation();
    e.preventDefault();

    // Reset key sequence to wait next command.
    this.reset();
  }
  else if (candidate.length == 0) {
    // Delegate key event to current mode processor if command candidates was not found.
    if (Mode.getProcessor().onKeyDown(stack, currentKey, e)) {
      this.reset();
    }
  }
});

$(document).ready(function() {
  // Enter the insert mode if focus to a textarea.
  // Otherwise, Return the normal mode.
  var focusTargets = ':text, :password, textarea, [contenteditable]';
  $(document).on('focus', focusTargets, function() {
    if (!$(this).is('[data-hometype-not-insert-mode]')) {
      Mode.changeMode(ModeList.INSERT_MODE);
    }
  }).on('blur', focusTargets, function() {
    if (!$(this).is('[data-hometype-not-insert-mode]')) {
      Mode.changeMode(ModeList.NORMAL_MODE);
    }
  });
  $(document.activeElement).blur();
});
