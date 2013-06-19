var HintMode = function() {
  this.newTab = false;
};

HintMode.prototype.onKeyDown = function(stack, currentKey, e) {
  e.stopPropagation();
  e.preventDefault();

  var hint = Viewport.getCurrentHintElement();
  var elements = hint.getMatchedElements(stack);

  if (elements.length == 0) {
    Command.cancelHintMode();
    return true;
  }
  else if (elements.length == 1 && elements[0].getKey() == stack) {
    Command.cancelHintMode();
    var target = elements[0].getElement();
    if (target.tag() == 'select') {
      var children = target.children();

      var div = $('<div>').addClass('chromekey-select-box').appendTo($('body')).screenCenter();
      var ul = $('<ul>').appendTo(div);

      var multiKey = children.length > HintKeys.length;
      var keyIndex1 = 0, keyIndex2 = 0;
      children.each(function() {;
        var key1 = HintKeys[keyIndex1];
        var key2 = '';

        if (multiKey) {
          key2 = HintKeys[keyIndex2++];
          if (keyIndex2 == HintKeys.length) {
            keyIndex2 = 0;
            keyIndex1++;
          }
        }
        else {
          keyIndex1++;
        }
        var li = $('<li>').appendTo(ul);
        $('<div>').text(key2 + key1).addClass('chromekey-hit-a-hint-yellow').appendTo(li);
        $('<div>').text($(this).text()).appendTo(li);
      });
    }
    else {
      var event = document.createEvent('MouseEvents');
      event.initMouseEvent('click', true, true, window, 1, 0, 0, 0, 0, false, false, false, this.newTab, 0, null);
      target.get(0).dispatchEvent(event);
      target.focus();
    }

    return true;
  }
  else {
    hint.hideUnmatchedElements(stack);
    for (var i in elements) {
      elements[i].setPushed();
    }
    return false;
  }
};

HintMode.prototype.setOpenNewTab = function(newTab) {
  this.newTab = newTab;
};
