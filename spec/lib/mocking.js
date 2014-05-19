var listeners = {};

chrome = {
  storage: {
    onChanged: {
      addListener: function() {
      }
    },
    sync: {
      get: function() {
      }
    }
  },
  runtime: {
    sendMessage: function(params, callback) {
    },
    connect: function(connectInfo) {
      return {
        onMessage: {
          addListener: function(listener) {
          }
        }
      };
    }
  }
};
