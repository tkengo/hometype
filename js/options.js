var ChromekeyOptions = function() {
  this.options = {};
  var port = chrome.runtime.connect({ name: 'notifyOptions' });
  port.onMessage.addListener($.proxy(this.onMessage, this));
};

ChromekeyOptions.prototype.onMessage = function(results) {
  this.options = $.extend(this.options, results);
  for (var key in results) {
    ChromekeyOptions.prototype[key] = results[key];
  }
};

ChromekeyOptions.prototype.init = function(callback) {
  chrome.runtime.sendMessage({
    command: 'getOptions'
  }, $.proxy(function(response) {
    this.options = $.extend(this.options, ChromekeyDefaultOptions);
    for (var key in this.options) {
      var option = response[key];
      if (option) {
        this.options[key] = option;
      }

      ChromekeyOptions.prototype[key] = this.options[key];
    }
    
    if (typeof callback == 'function') {
      callback.call();
    }
  }, this));
};

ChromekeyOptions.prototype.get = function(key) {
  if (key) {
    return this.options[key];
  }
  else {
    return this.options;
  }
};
