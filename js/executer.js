var Executer = (function() {
  var previousOptions = {};

  var constructor = function(mode, key) {
    this.key        = key;
    this.candidates = [];

    var commands = KeyMap.assignedCommands();

    var maps = commands[mode];
    for (keyMap in maps) {
      if (keyMap.indexOf(key) == 0) {
        this.candidates.push({ command: maps[keyMap], key: keyMap });
      }
    }
  };

  constructor.previousOptions = function(command, args) {
    if (args) {
      previousOptions[command] = args || {};
    } else {
      return previousOptions[command] || {};
    }
  };

  return constructor;
})();

Executer.prototype.noCommand = function() {
  return this.candidates.length == 0;
};

Executer.prototype.fixedCommand = function() {
  return this.candidates.length == 1 && this.candidates[0].key == this.key;
};

Executer.prototype.execute = function() {
  if (!this.fixedCommand()) {
    return false;
  }

  var commands = [],
      map      = this.candidates[0].command.split(' ');

  for (var i = 0; i < map.length; i++) {
    if (map[i].substr(0, 2) != '--') {
      commands.push({ command: map[i], args: {} });
    } else {
      commands[commands.length - 1].args[map[i].replace('--', '')] = true;
    }
  }

  for (var i = 0; i < commands.length; i++) {
    var command = commands[i].command,
        args    = commands[i].args;

    if (command.substr(0, 1) == '@') {
      command = command.substr(1);
      args    = Executer.previousOptions(command);
    }
    Command[command](args);

    Executer.previousOptions(command, args);
  }

  return true;
};
