var listeners = {};

chrome = {
  runtime: {
    connect: function(connectInfo) {
      return {
        onMessage: {
          addListener: function(listener) {
            listeners['chrome.runtime.connect.onMessage'] = listener;
          }
        }
      };
    }
  }
};

mock = {
  fireEvent: function() {
    var event = arguments[0];
    var params = [];

    for (var i = 1; i < arguments.length; i++) {
      params.push(arguments[i]);
    }

    if (listeners[event]) {
      listeners[event].apply(this, params);
    }
  }
};
