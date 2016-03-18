var Utility = {};

Utility.clickElement = function(element, commandKey) {
  commandKey = commandKey || false;

  var event = document.createEvent('MouseEvents');
  event.initMouseEvent('click', true, true, window, 1, 0, 0, 0, 0, false, false, false, commandKey, 0, null);
  element.get(0).dispatchEvent(event);
};

/**
 * Open the url in the current tab.
 *
 * @param string url Target url.
 */
Utility.openUrl = function(url) {
  var params = { url: url };
  chrome.runtime.sendMessage({ command: 'openUrl', params: params });
};

/**
 * Open the url in a new window.
 *
 * @param string url Target url.
 */
Utility.openUrlInNewWindow = function(url) {
  var params = {
    url: url,
    newWindow: true
  };
  chrome.runtime.sendMessage({ command: 'openUrl', params: params });
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

/**
 * Do zero padding for passed number.
 *
 * @param integer number zero padding target.
 * @param integer length length.
 * @return string zero padded number.
 */
Utility.pad = function(number, length) {
  var str = '' + number;
  while (str.length < length) {
    str = '0' + str;
  }

  return str;
};

/**
 * Check if a value is included in an array.
 *
 * @param array array A target array.
 * @param mixed value Check value.
 * @return boolean Return true if the value is included in the array.
 */
Utility.inArray = function(array, value) {
  for (var i = 0; i < array.length; i++) {
    if (array[i] === value) {
      return true;
    }
  }

  return false;
};

/**
 * Collect a hash key and return it.
 *
 * @param array  arrayOfHash A target array that has a hash.
 * @param string key         A key you want to collect.
 * @return array Collected value list.
 */
Utility.collect = function(arrayOfHash, key) {
  var items = [];

  for (var i = 0; i < arrayOfHash.length; i++) {
    items.push(arrayOfHash[i][key]);
  }

  return items;
};
