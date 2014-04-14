describe('KeyMap', function() {
  var key     = 'a';
  var command = 'testCommand';

  beforeEach(function() {
    KeyMap.clear();
  });

  it('should assign a key to a command in any modes', function() {
    var mode    = ModeList.NORMAL_MODE;

    KeyMap.assign(mode, key, command);
    expect(_map[mode][key]).toBe(command);
  });

  it('should assign a key to a command in the normal mode', function() {
    KeyMap.nmap(key, command);
    expect(_map[ModeList.NORMAL_MODE][key]).toBe(command);
  });

  it('should assign a key to a command in the insert mode', function() {
    KeyMap.imap(key, command);
    expect(_map[ModeList.INSERT_MODE][key]).toBe(command);
  });

  it('should assign a key to a command in the hint mode', function() {
    KeyMap.fmap(key, command);
    expect(_map[ModeList.HINT_MODE][key]).toBe(command);
  });

  it('should assign a key to a command in the visual mode', function() {
    KeyMap.vmap(key, command);
    expect(_map[ModeList.VISUAL_MODE][key]).toBe(command);
  });

  it('should assign a key to a command in the command mode', function() {
    KeyMap.cmap(key, command);
    expect(_map[ModeList.COMMAND_MODE][key]).toBe(command);
  });

  it('should assign a key to a command in the help mode', function() {
    KeyMap.hmap(key, command);
    expect(_map[ModeList.HELP_MODE][key]).toBe(command);
  });

  describe('command candidate', function() {
    beforeEach(function() {
      KeyMap.nmap('aa', 'noop');
      KeyMap.nmap('ab', 'noop');
      KeyMap.nmap('ac', 'noop --args');
    });

    it('should get candidate', function() {
      expect(KeyMap.candidate(ModeList.NORMAL_MODE, 'a')).toHave(3);
      expect(KeyMap.candidate(ModeList.NORMAL_MODE, 'aa')).toHave(1);
    });

    it('should not get candidate in the other mode', function() {
      expect(KeyMap.candidate(ModeList.HINT_MODE, 'a')).toBeEmpty();
    });

    it('should include key, command, args in return value', function() {
      var candidate = KeyMap.candidate(ModeList.NORMAL_MODE, 'ac');
      expect(candidate[0].key).toBe('ac');
      expect(candidate[0].command).toBe(Command['noop']);
      expect(candidate[0].args.args).toBe(true);
    });
  });
});
