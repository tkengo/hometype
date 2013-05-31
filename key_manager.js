var KeyManager = {};

KeyManager.onKeyDown = function(event) {
  var keyCode = event.keyCode;

  if (keyCode == KeyCode.CTRL || keyCode == KeyCode.SHIFT || keyCode == KeyCode.ALT) {
    return false;
  }

  var key = KeyIdentifiers.toChar(event.keyIdentifier);

  if (event.shiftKey) {
    key = key.toUpperCase();
  }
  if (event.ctrlKey) {
    key = 'C-' + key;
  }

  KeyMap.getCommand(key).call();
};
