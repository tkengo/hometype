var customMatchers = {
  toBeEmpty: function(util, customEqualityTesters) {
    return {
      compare: function(actual, expected) {
        return {
          pass: actual == {} || actual == undefined,
          message: 'hoge' + actual + expected
        };
      }
    };
  }
};
