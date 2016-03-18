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
 */
function initialize(options)
{
  // If current url is included in ignore url list, do nothing.
  if (isIgnored(options.ignore_urls)) {
    return;
  }

  KeyMap.setDefault(HometypeDefaultOptions.default_key_bind);
  bindCommand(options);

  // Set an event listener to the key sequence object when options have loaded.
  var key = new KeySequence();
  key.onProcess(function (e, sequence, stack, currentKey) {
    // Adjust the current mode before key processing.
    adjustCurrentMode();

    var processor       = Mode.getProcessor();
    var delegation      = 'onKeyDown' in processor;
    var executer        = new Executer(Mode.getCurrentMode(), sequence);
    var stopPropagation = (executer.hasCandidates() || delegation) && !Dom.isEditable(document.activeElement);

    // Execute a command and reset key sequence.
    // Delegate process to the processor of the current mode if a command was not found.
    if (executer.noCandidate()) {
      if (delegation && processor.onKeyDown(stack, currentKey, e)) {
        this.reset();
      }
    } else if (executer.execute()) {
      this.reset();
    }

    if (stopPropagation) {
      e.stopPropagation();
      e.preventDefault();
    }
  });

  $(document).ready(function() {
    chrome.runtime.sendMessage({ command: 'getContinuousState' }, function(status) {
      if (status) {
        new Executer('followLink --continuous').execute();
      }
    });
  });
}

/**
 * Adjust the current mode.
 *
 * 1. If active element is editable and the current mode is the normal mode,
 *    change the current mode to the insert mode.
 * 2. If active element is not editable and the current mode is the insert mode,
 *    change the current mode to the normal mode.
 */
function adjustCurrentMode()
{
  var isEditable = Dom.isEditable(document.activeElement);
  if (isEditable && Mode.isNormalMode()) {
    Mode.changeMode(ModeList.INSERT_MODE);
  }
  if (!isEditable && Mode.isInsertMode()) {
    Mode.changeMode(ModeList.NORMAL_MODE);
  }
}

/**
 * bind a command to a key.
 */
function bindCommand(options)
{
  KeyMap.clear();

  for (var map in options.key_bind.remap) {
    KeyMap.remap(ModeList.from(map), options.key_bind.remap[map]);
  }
  for (var map in options.key_bind.noremap) {
    KeyMap.noremap(ModeList.from(map), options.key_bind.noremap[map]);
  }
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
