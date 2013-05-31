var KeyMap = {};

_nmap = {
};

KeyMap.assign = function(key, command) {
  _nmap[key] = command;
};

KeyMap.getCommand = function(key) {
  return Command[_nmap[key]];
};
