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
    var target = elements[0].getElement();
    if (target.tag() == 'select') {
      var children = target.children('option');
      var div = $('<div>').addClass('chromekey-select-box').appendTo($('body')).screenCenter();
      var ul = $('<ul>').appendTo(div);

      children.each(function() {;
        var li = $('<li>').text($(this).text()).attr('value', $(this).val()).click(function() {
          Command.cancelHintMode();
          target.val($(this).attr('value'));
          div.remove();
        }).appendTo(ul);
      });

      var a = [];
      $('li', ul).each(function() { a.push($(this)); });
      Viewport.createNewHintElement('yellow', a).show();
    }
    else {
      Command.cancelHintMode();
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
