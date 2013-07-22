var Utility = {};

Utility.clickElement = function(element, commandKey) {
  commandKey = commandKey || false;

  var event = document.createEvent('MouseEvents');
  event.initMouseEvent('click', true, true, window, 1, 0, 0, 0, 0, false, false, false, commandKey, 0, null);
  element.get(0).dispatchEvent(event);
  element.focus();
};

Utility.openUrl = function(url, newTab) {
  var link = Viewport.createLink(url);
  Utility.clickElement(link, newTab);
  link.remove();
};

/**
 * オブジェクトのプロパティに単語が含まれているかどうかをチェックします。
 *
 * @param Object  target     オブジェクト
 * @param string  word       検索する単語
 * @param array   properties 検索対象のプロパティのリスト
 * @param boolean ignoreCase trueであれば大文字小文字を無視する
 * @return boolean 単語が含まれていればture
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
