var HintAction = {
  run: function(action, element, processor, option) {
    return HintAction[action].call(processor, element, option);
  },

  /**
   * Click action.
   *
   * 1. If element is form tag, focus to it.
   * 2. If element is select tag, open the select box.
   * 3. Otherwise, emulate click event for an element.
   */
  click: function(element, option) {
    var e = w(element);

    if (e.isEditable()) {
      e.focus();
    } else if (e.isSelect()) {
      var selectBox = new HometypeSelectBox($(e.raw));
      this.createHints('yellow', selectBox.getListElements());
      this.onNotifyLeaveMode(function() { selectBox.remove(); });
      return false;
    } else {
      if (option.continuous) {
        var timer = setTimeout(function() { new Executer('@followLink').execute(); }, 300);
        window.onbeforeunload = function() { clearInterval(timer); };
      }
      e.click(option.new || false);
      if (option.continuous) {
        window.onbeforeunload = undefined;
        return false;
      }
    }

    return true;
  },

  /**
   * Mouse over action.
   */
  mouseover: function(element) {
    w(element).mouseover();
  },

  /**
   * Yank url action.
   */
  yankUrl: function(element) {
    if (element.tagName.toLowerCase() == 'a' && element.href) {
      chrome.runtime.sendMessage({ command: 'copyToClipboard', params: element.href });
    }
  },

  /**
   * Open a url in a new window.
   */
  openNewWindow: function(element) {
    if (element.tagName.toLowerCase() == 'a' && element.href) {
      Utility.openUrlInNewWindow(element.href);
    }
  }
};
