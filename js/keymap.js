var KeyMap = {};

_map = {
  normal: {},
  hint: {},
  visual: {}
};

KeyMap.assign = function(mode, key, command) {
  _map[mode][key] = command;
};

KeyMap.nmap = function(key, command) {
  KeyMap.assign(ModeList.NORMAL_MODE, key, command);
};

KeyMap.fmap = function(key, command) {
  KeyMap.assign(ModeList.HINT_MODE, key, command);
};

KeyMap.vmap = function(key, command) {
  KeyMap.assign(ModeList.VISUAL_MODE, key, command);
};

KeyMap.candidate = function(mode, key) {
  var result = [];

  for (map in _map[mode]) {
    if (map.indexOf(key) == 0) {
      result.push({
        key: map,
        command: Command[_map[mode][map]]
      });
    }
  }

  return result;
};

KeyMap.command = function(mode, key) {
  return Command[_map[mode][key]];
};
