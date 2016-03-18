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
   * Callback functions that is invoked when an option value was loaded or changed.
   */
  var callbacks = [];

  /**
   * Set options value to this object. This method is invoked in initialization
   * and receiving a notification from event page script when options value was
   * changed.
   */
  function setOptions(results)
  {
    var oldOptions = $.extend(options, {});
    options = $.extend(options, results);

    $.each(callbacks, function(index, callback) {
      if (typeof callback == 'function') {
        callback(options, oldOptions);
      }
    });
  }

  /**
   * Create object for singleton instance.
   */
  function createInstance()
  {
    return {
      /**
       * options value
       */
      options: options,
      /**
       * Load options in this instance.
       */
      load: function(callback) {
        chrome.storage.sync.get('options', function(results) {
          var options = $.extend({}, HometypeDefaultOptions, results.options);
          if (typeof callback == 'function') {
            callback(options);
          }
          setOptions(options);
        });
      },
      /**
       * Set callback method that is invoked when an option value was loaded or changed.
       */
      onLoaded: function(callback) {
        callbacks.push(callback);
      }
    };
  }

  // Set event listener to notify for this object when options value was changed.
  chrome.storage.onChanged.addListener(function(changes, areaName) {
    setOptions(changes.options.newValue);
  });

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
