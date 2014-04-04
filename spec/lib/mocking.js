chrome = {
  runtime: {
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
