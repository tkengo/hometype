/**
 * Copyright (c) 2013 Kengo Tateishi (@tkengo)
 * Licensed under MIT license.
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Entry point in Hometype.
 */

// Load options and initialize Hometype
HometypeOptions.getInstance().load(initialize);
HometypeOptions.getInstance().onLoaded(bindCommand);

/**
 * Initialize Hometype
 *
 * 1. Check whether if the current url is matched in ignore url list.
 * 2. Bind a command.
 * 3. Register event onProcess in KyeSequence object.
 * 4. Register event onFocus and onBlur to detect focusing to form.
 */
function initialize(options)
{
  // If current url is included in ignore url list, do nothing.
  if (isIgnored(options.ignore_urls)) {
    return;
  }

  bindCommand(options);

  // Set an event listener to the key sequence object when options have loaded.
  var key = new KeySequence();
  key.onProcess(function (e, sequence, stack, currentKey) {
    var isEditable = Dom.isEditable(document.activeElement);
    if (isEditable && Mode.isNormalMode()) {
      Mode.changeMode(ModeList.INSERT_MODE);
    }
    if (!isEditable && Mode.isInsertMode()) {
      Mode.changeMode(ModeList.NORMAL_MODE);
    }

    var executer = new Executer(Mode.getCurrentMode(), sequence);
    if (executer.noCandidate()) {
      if (Mode.getProcessor().onKeyDown(stack, currentKey, e)) {
        this.reset();
      }
    } else if (executer.execute()) {
      e.stopPropagation();
      e.preventDefault();
      this.reset();
    }
  });

  $(document).ready(function() {
    chrome.runtime.sendMessage({ command: 'getContinuousState' }, function(status) {
      if (status) {
        new Executer('enterHintMode --continuous').execute();
      }
    });

    var favicon = new TabIcon();
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
      if (request.message == 'setFavicon') {
        favicon.set(request.index);
      } else if (request.message == 'undoFavicon') {
        favicon.undo();
      }
    });
  });
}

/**
 * bind a command to a key.
 */
function bindCommand(options)
{
  KeyMap.clear();

  $.each($.extend(true, {}, options.default_key_bind, options.key_bind), function(map, bind) {
    $.each(bind, function(key, command) {
      KeyMap[map](key, command);
    });
  });
}

/**
 * Check ignore urls
 */
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
