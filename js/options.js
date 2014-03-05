/**
 * Copyright (c) 2013 Kengo Tateishi (@tkengo)
 * Licensed under MIT license.
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Manage options.
 *
 * Create instance and initialize it.
 * var options = new HometypeOptions();
 * options.init();
 *
 * Option object has option value in object prototype.
 * You can access to option value below:
 * options.option_name1
 * options.option_name2
 */
var HometypeOptions = function() {
  this.options = HometypeDefaultOptions;

  // Set an event listener to notify for this object when option value was changed.
  var port = chrome.runtime.connect({ name: 'notifyOptions' });
  port.onMessage.addListener($.proxy(this.notifyOptions, this));
};

/**
 * Callback method that is called when option value was changed.
 * Changed option value will be saved this object.
 *
 * @param Object results Changed option value hash.
 */
HometypeOptions.prototype.notifyOptions = function(results) {
  this.options = $.extend(this.options, results);
  for (var key in results) {
    HometypeOptions.prototype[key] = results[key];
  }
};

/**
 * Initialization. All option is loaded into this object.
 *
 * @param function callback Callback method that is called when option has loaded.
 */
HometypeOptions.prototype.init = function(callback) {
  var getOptionsCallback = function(response) {
    for (var key in this.options) {
      if (response[key]) {
        this.options[key] = response[key];
      }
      HometypeOptions.prototype[key] = this.options[key];
    }

    if (typeof callback == 'function') {
      callback();
    }
  };

  chrome.runtime.sendMessage({ command: 'getOptions' }, $.proxy(getOptionsCallback, this));
};
