describe('Executer', function() {
  var executer;

  beforeEach(function() {
    Command.testCommand = function() { };
    spyOn(Command, 'testCommand');

    KeyMap.nmap('a',  'testCommand');
    KeyMap.nmap('ba', 'testCommand');
    KeyMap.nmap('bb', 'testCommand');
    KeyMap.nmap('c',  '@testCommand');
  });

  describe('was passed a mode and key to arguments', function() {
    beforeEach(function() {
      executer = new Executer(ModeList.NORMAL_MODE, 'a');
    });

    it('should be fix a candidate', function() {
      expect(executer.fixedCandidate()).toBe(true);
      expect(executer.noCandidate()).toBe(false);
    });

    it('should invoke a command', function() {
      expect(executer.execute()).toBe(true);
      expect(Command.testCommand).toHaveBeenCalled();
    });
  });

  describe('was passed a mode and key to arguments with previous option', function() {
    beforeEach(function() {
      executer = new Executer(ModeList.NORMAL_MODE, 'c');
    });

    it('should be fix a candidate', function() {
      expect(executer.fixedCandidate()).toBe(true);
      expect(executer.noCandidate()).toBe(false);
    });

    it('should invoke a command', function() {
      expect(executer.execute()).toBe(true);
      expect(Command.testCommand).toHaveBeenCalled();
    });
  });

  describe('was passed non fixed candidate value to arguments', function() {
    beforeEach(function() {
      executer = new Executer(ModeList.NORMAL_MODE, 'b');
    });

    it('should be fix a candidate', function() {
      expect(executer.fixedCandidate()).toBe(false);
      expect(executer.noCandidate()).toBe(false);
    });

    it('should invoke a command', function() {
      expect(executer.execute()).toBe(false);
    });
  });

  describe('was passed fixed candidate value to arguments', function() {
    beforeEach(function() {
      executer = new Executer(ModeList.NORMAL_MODE, 'ba');
    });

    it('should be fix a candidate', function() {
      expect(executer.fixedCandidate()).toBe(true);
      expect(executer.noCandidate()).toBe(false);
    });

    it('should invoke a command', function() {
      expect(executer.execute()).toBe(true);
      expect(Command.testCommand).toHaveBeenCalled();
    });
  });

  describe('was passed no candidate value to arguments', function() {
    beforeEach(function() {
      executer = new Executer(ModeList.NORMAL_MODE, 'baa');
    });

    it('should be fix a candidate', function() {
      expect(executer.fixedCandidate()).toBe(false);
      expect(executer.noCandidate()).toBe(true);
    });

    it('should invoke a command', function() {
      expect(executer.execute()).toBe(false);
    });
  });

  describe('was passed a command name to arguments', function() {
    beforeEach(function() {
      executer = new Executer('testCommand');
    });

    it('should be fix a candidate', function() {
      expect(executer.fixedCandidate()).toBe(true);
      expect(executer.noCandidate()).toBe(false);
    });

    it('should invoke a command', function() {
      expect(executer.execute()).toBe(true);
      expect(Command.testCommand).toHaveBeenCalled();
    });
  });

  describe('was passed a command name to arguments with previous option', function() {
    beforeEach(function() {
      executer = new Executer('@testCommand');
    });

    it('should be fix a candidate', function() {
      expect(executer.fixedCandidate()).toBe(true);
      expect(executer.noCandidate()).toBe(false);
    });

    it('should invoke a command', function() {
      expect(executer.execute()).toBe(true);
      expect(Command.testCommand).toHaveBeenCalled();
    });
  });

  describe('was passed a command name with options to arguments', function() {
    beforeEach(function() {
      executer = new Executer('testCommand --option1 --option2');
    });

    it('should be fix a command', function() {
      expect(executer.fixedCandidate()).toBe(true);
      expect(executer.noCandidate()).toBe(false);
    });

    it('should invoke a command with options', function() {
      var option = { option1: true, option2: true };
      expect(executer.execute()).toBe(true);
      expect(Command.testCommand).toHaveBeenCalledWith(option);
    });
  });

  describe('was passed nonexistent command name to arguments', function() {
    beforeEach(function() {
      executer = new Executer('nonexistentCommand');
    });

    it('should be fix a command', function() {
      expect(executer.fixedCandidate()).toBe(true);
      expect(executer.noCandidate()).toBe(false);
    });

    it('should not invoke a command', function() {
      expect(executer.execute()).toBe(false);
    });
  });
});
