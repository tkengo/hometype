var listeners = {};

chrome = {
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
