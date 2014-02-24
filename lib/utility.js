var Utility = {};

Utility.clickElement = function(element, commandKey) {
  commandKey = commandKey || false;

  var event = document.createEvent('MouseEvents');
  event.initMouseEvent('click', true, true, window, 1, 0, 0, 0, 0, false, false, false, commandKey, 0, null);
  element.get(0).dispatchEvent(event);
};

Utility.openUrl = function(url, newTab) {
  var link = Viewport.createLink(url);
  Utility.clickElement(link, newTab);
  link.remove();
};

/**
 * Check if a word is included in specified properties in target object.
 *
 * @param Object  target     Target object.
 * @param string  word       Search word.
 * @param array   properties Searched properties.
 * @param boolean ignoreCase Search by ignore case if this argument is true.
 * @return boolean Return true if a word is included in specified properties in target object.
 */
Utility.includedInProperties = function(target, word, properties, ignoreCase) {
  ignoreCase = ignoreCase || true;

  if (ignoreCase) {
    word = word.toLowerCase();
  }

  var included = false;

  for (var i in properties) {
    var propertyValue = target[properties[i]];
    if (ignoreCase) {
      propertyValue = propertyValue.toLowerCase();
    }

    if (propertyValue.indexOf(word) > -1) {
      included = true;
      break;
    }
  }

  return included;
};
