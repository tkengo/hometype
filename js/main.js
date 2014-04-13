/**
 * Copyright (c) 2013 Kengo Tateishi (@tkengo)
 * Licensed under MIT license.
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Entry point in Hometype.
 */

// Set key binding if it was changed.
HometypeOptions.getInstance().load(initialize);
HometypeOptions.getInstance().onLoaded(loadedCallback);

function initialize(options)
{
  // If current url is included in ignore url list, do nothing.
  if (isIgnored(options.ignore_urls)) {
    return;
  }

  loadedCallback(options);

  // Set an event listener to the key sequence object when options have loaded.
  var key = new KeySequence();
  key.onProcess(function (e, sequence, stack, currentKey) {
    // Get command candidates from input keys.
    var candidate = KeyMap.candidate(Mode.getCurrentMode(), sequence);

    if (candidate.length == 1 && candidate[0].key == sequence) {
      // Execute the command if decided.
      candidate[0].command(candidate[0].args);
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
}

function loadedCallback(options)
{
  KeyMap.clear();

  $.each($.extend(options.default_key_bind, options.key_bind), function(map, bind) {
    $.each(bind, function(key, command) {
      KeyMap[map](key, command);
    });
  });
}

function isIgnored(ignore_urls)
{
  var currentUrl = window.location.href.replace(/\/$/, '');
  for (var i in ignore_urls) {
    var ignoreUrl = ignore_urls[i];

    if (ignoreUrl.substr(0, 1) == '"' && ignoreUrl.substr(-1, 1) == '"') {
      if (currentUrl == ignoreUrl.replace(/"/g, '').replace(/\/$/, '')) {
        return true;
      }
    }
    else {
      ignoreUrl = ignoreUrl.replace(/\*/g, '.*');
      var regexp = new RegExp(ignoreUrl);

      if (regexp.test(currentUrl)) {
        return true;
      }
    }
  }
  return false;
}
