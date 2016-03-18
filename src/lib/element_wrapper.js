function w(element)
{
  return new ElementWrapper(element);
}

var ElementWrapper = (function() {
  var element = null;

  var object = function(e) {
    /**
     * The raw element.
     */
    this.raw = element = e;
  };

  object.prototype = {
    /**
     * Click this element.
     *
     * @param boolean commandKey
     */
    click: function(commandKey) {
      commandKey = commandKey || false;

      var event = document.createEvent('MouseEvents');
      event.initMouseEvent('click', true, true, window, 1, 0, 0, 0, 0, false, false, false, commandKey, 0, null);
      element.dispatchEvent(event);
    },

    /**
     * Mouse over this element.
     */
    mouseover: function() {
      var event = document.createEvent('MouseEvents');
      event.initMouseEvent('mouseover', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
      element.dispatchEvent(event);
    },

    /**
     * Check whether this element is editable.
     *
     * @return boolean Return true if this element is editable, otherwise false.
     */
    isEditable: function() {
      var tagName = element.tagName.toLowerCase();
      var editableType = [
        'date', 'datetime', 'datetime-local', 'email', 'month', 'number', 'password',
        'search', 'tel', 'text', 'time', 'url', 'week'
      ];

      return element.isContentEditable ||
             tagName == 'textarea'     ||
            (tagName == 'input' && Utility.inArray(editableType, element.type));
    },

    /**
     * Check whether this element is a select tag.
     *
     * @return boolean Return true if this element is a select tag, otherwise false.
     */
    isSelect: function() {
      return element.tagName.toLowerCase() == 'select'
    }
  };

  return object;
})();
