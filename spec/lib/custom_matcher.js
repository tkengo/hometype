var customMatchers = {
  toBeEmpty: function(util, customEqualityTesters) {
    return {
      compare: function(actual, expected) {
        return {
          pass: util.equals(actual, {}) || actual == '' || actual == undefined || (actual.length && actual.length == 0)
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
