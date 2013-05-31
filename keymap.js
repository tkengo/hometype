var KeyMap = {};

_nmap = {
};

KeyMap.assign = function(key, command) {
  _nmap[key] = command;
};

KeyMap.command = function(key) {
  var count = 0;

  for (map in _nmap) {
    if (map.indexOf(key) == 0) {
      count++;
    }
  }

  return count == 1 ? Command[_nmap[key]] : undefined;
};

KeyMap.map = function() {
  return _nmap;
};
