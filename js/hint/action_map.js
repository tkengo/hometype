var ActionMap = {
  'get': function(key) {
    return ActionMap[key] || ActionMap.default;
  },
  'm': 'mouseover',
  'y': 'yankUrl',
  'default': 'click'
};
