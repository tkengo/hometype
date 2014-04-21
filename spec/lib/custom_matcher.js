var customMatchers = {
  toBeEmpty: function(util, customEqualityTesters) {
    return {
      compare: function(actual, expected) {
        return {
          pass: util.equals(actual, {}) || actual == undefined || !actual.length
        };
      }
    };
  },
  toHave: function(util, customEqualityTesters) {
    return {
      compare: function(actual, expected) {
        return {
          pass: actual.length == expected
        };
      }
    };
  }
};
