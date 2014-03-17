/**
 * Copyright (c) 2013 Kengo Tateishi (@tkengo)
 * Licensed under MIT license.
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Manage options.
 */
var HometypeOptions = (function() {
  /**
   * Singleton instance of hometype option.
   */
  var instance = null;

  /**
   * Hometype options value.
   */
  var options = {};

  /**
   * Set options value to this object. This method is invoked in initialization
   * and receiving a notification from event page script when options value was
   * changed.
   */
  function setOptions(loadedOptions)
  {
    for (var key in results) {
      options[key] = results[key];
    }
  }

  /**
   * Create object for singleton instance.
   */
  function createInstance()
  {
    return {
      options: options
    };
  }

  // Load options.
  chrome.runtime.sendMessage({ command: 'getOptions' }, setOptions);

  // Set event listener to notify for this object when options value was changed.
  chrome.runtime.connect({ name: 'notifyOptions' }).onMessage.addListener(setOptions);

  // Return an object that has only 'getInstance' method to get singleton instance.
  return {
    getInstance: function() {
      if (instance == null) {
        instance = createInstance();
      }

      return instance;
    }
  };
})();

var Opt = HometypeOptions.getInstance().options;
