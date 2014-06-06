/**
 * Copyright (c) 2013 Kengo Tateishi (@tkengo)
 * Licensed under MIT license.
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Hometype command executer.
 */

/**
 * Create Executer instance with a command name or a binding key, and then
 * invoke 'execute' method to execute the command.
 *
 * How to specify a command:
 *   1. Only command name                            'commandName'
 *   2. With arguments                               'commandName --hoge --moge'
 *   3. Take over the option from previous execution '@commandName'
 */
var Executer = (function() {
  /**
   * Store option of previous execution to this property.
   */
  var previousOptions = {};

  /**
   * Constructor.
   *
   * If arguments are passed the current mode and key, Executer searches
   * a command from related them, and set a command candidate.
   *
   * If arguments are passed only a command name, Executer set it to
   * a command candidate.
   *
   * And 'execute' method in this object will invoke frmo a command candidate.
   * If it has only one candidate, the command is executed. Otherwise, not.
   *
   * @param string mode The current mode or a command name.
   * @param string key  Key.
   */
  var constructor = function(mode, key) {
    if (!key) {
      key = '__undefined__';
      var command = mode;
    }

    this.key        = key;
    this.candidates = [];

    if (key == '__undefined__') {
      this.candidates.push({ command: command, key: key });
    } else {
      var commands = KeyMap.assignedCommands();
      var maps = commands[mode];
      for (keyMap in maps) {
        if (keyMap.indexOf(key) == 0) {
          this.candidates.push({ command: maps[keyMap], key: keyMap });
        }
      }
    }
  };

  /**
   * Store or get a previous options.
   *
   * If args is omitted, get options.
   * If args is passed, set options.
   */
  constructor.previousOptions = function(command, args) {
    if (args) {
      previousOptions[command] = args || {};
    } else {
      return previousOptions[command] || {};
    }
  };

  return constructor;
})();

/**
 * Check if whether this object has a command that should be executed.
 */
Executer.prototype.noCandidate = function() {
  return this.candidates.length == 0;
};

/**
 * Check if whether a command that should be executed is fixed.
 */
Executer.prototype.fixedCandidate = function() {
  return this.candidates.length == 1 && this.candidates[0].key == this.key;
};

/**
 * Execute a command.
 */
Executer.prototype.execute = function() {
  if (!this.fixedCandidate()) {
    return false;
  }

  var commands = [],
      map      = this.candidates[0].command.split(' ');

  for (var i = 0; i < map.length; i++) {
    if (map[i].substr(0, 2) != '--') {
      var command = map[i];
      var previouse = false;
      if (command.substr(0, 1) == '@') {
        previouse = true;
        command = command.substr(1);
      }

      if (Command[command]) {
        commands.push({ command: command, args: {}, previouse: previouse });
      } else {
        return false;
      }
    } else {
      commands[commands.length - 1].args[map[i].replace('--', '')] = true;
    }
  }

  for (var i = 0; i < commands.length; i++) {
    var command = commands[i].command,
        args    = commands[i].previouse ? Executer.previousOptions(command) : commands[i].args;

    Command[command](args);

    Executer.previousOptions(command, args);
  }

  return true;
};
