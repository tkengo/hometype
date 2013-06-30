var ChromekeyOptions = function() {
  this.options = {};
};

ChromekeyOptions.prototype.init = function(callback) {
  chrome.runtime.sendMessage({
    command: 'getOptions'
  }, $.proxy(function(response) {
    this.options = $.extend(this.options, ChromekeyOptions.defaultOptions);
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

ChromekeyOptions.defaultOptions = {
  command_interval: 300
};

ChromekeyOptions.prototype.get = function(key) {
  if (key) {
    return this.options[key];
  }
  else {
    return this.options;
  }
};
