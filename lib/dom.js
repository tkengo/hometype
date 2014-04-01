var Dom = {};

/**
 * Get all clickable and visible elements in document.
 */
Dom.getClickableAndVisibleElements = function() {
  xpath = [
    "//a", "//textarea", "//button", "//select",
    "//input[not(@type='hidden' or @disabled or @readonly)]",
    "//*[@onclick or @tabindex or @contenteditable='true' or @contenteditable='']"
  ].join(' | ');
  results = document.evaluate(xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null)

  var targets = [];

  for (var i = 0; i < results.snapshotLength; i++) {
    var element = results.snapshotItem(i);
    var visibleInOffset = element.offsetWidth > 0 && element.offsetHeight > 0;
    if (!visibleInOffset) {
      continue;
    }

    var rect = element.getClientRects()[0] || {};
    var visibleInPosition = rect.bottom > 0 && rect.top  < window.innerHeight &&
                            rect.right  > 0 && rect.left < window.innerWidth;
    if (!visibleInPosition) {
      continue;
    }

    var computedStyle  = window.getComputedStyle(element, null);
    var visibleInStyle = computedStyle.getPropertyValue('visibility') == 'visible' &&
                         computedStyle.getPropertyValue('display')    != 'none'    &&
                         computedStyle.getPropertyValue('opacity')    != '100';
    if (!visibleInStyle) {
      continue;
    }

    var parentNode = element;
    var stayInBox = true;
    while (parentNode = parentNode.parentNode) {
      computedStyle = window.getComputedStyle(parentNode, null);
      if (!computedStyle) {
        break;
      }

      if (computedStyle.getPropertyValue('overflow') == 'hidden') {
        stayInBox = parentNode.offsetHeight > element.offsetTop &&
                    parentNode.offsetWidth  > element.offsetLeft;
        break;
      }
    }
    if (!stayInBox) {
      continue;
    }

    targets.push(element);
  }

  return targets;
};
