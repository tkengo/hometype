var Dom = {};

/**
 * Get clickable and insertable and selectable xpath.
 * For hint mode.
 */
Dom.clickableAndInsertableXPath = function() {
  return [
    "//a", "//textarea", "//button", "//select", "//area",
    "//input[not(@type='hidden' or @disabled or @readonly)]",
    "//*[@onclick or @onmousedown or @tabindex or @role='button' or @role='tab' or @role='link' or @contenteditable='true' or @contenteditable='']"
  ].join(' | ');
};

/**
 * Get visualable xpath.
 * For visual mode.
 */
Dom.visualableXPath = function() {
  return [
    "//code", "//div", "//td", "//th", "//li", "//section", "//h1", "//h2", "//h3", "//h4"
  ].join(' | ');
};

/**
 * Search all visible elements in xpath.
 *
 * @param string xpath
 * @return array Elements.
 */
Dom.searchVisibleElementsFrom = function(xpath) {
  var results = document.evaluate(xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  var targets = [];

  for (var i = 0; i < results.snapshotLength; i++) {
    var targetElement = results.snapshotItem(i);
    var inspectionElement = targetElement;

    if (targetElement.tagName == 'AREA') {
      inspectionElement = Dom.searchParentImageOf(targetElement);
    }

    if (!inspectionElement ||
        !Dom.isVisibleInDisplay(inspectionElement) ||
        !Dom.stayInOverflowHiddenBox(inspectionElement)) {
      continue;
    }

    targets.push(targetElement);
  }

  return targets;
};

/**
 * Check if whether an element is visible in the display.
 *
 * @param Element element a target element.
 * @return boolean return true if it is visible and otherwise, return false.
 */
Dom.isVisibleInDisplay = function(element) {
  var visibleInOffset = element.offsetWidth > 0 && element.offsetHeight > 0;
  if (!visibleInOffset) {
    // If the element has floated child, it is visible even if it has zero size
    // box bounding.
    for (var i = 0; i < element.childNodes.length; i++) {
      var child = element.childNodes[i];
      var style = window.getComputedStyle(child, null);
      if (style && style.getPropertyValue('float') != 'none' && Dom.isVisibleInDisplay(child)) {
        return true;
      }
    }

    return false;
  }

  var rect = element.getClientRects()[0] || {};
  var visibleInPosition = rect.bottom > 0 && rect.top  < window.innerHeight &&
                          rect.right  > 0 && rect.left < window.innerWidth;
  if (!visibleInPosition) {
    return false;
  }

  var computedStyle  = window.getComputedStyle(element, null);
  var visibleInStyle = computedStyle.getPropertyValue('visibility') == 'visible' &&
                       computedStyle.getPropertyValue('display')    != 'none'    &&
                       computedStyle.getPropertyValue('opacity')    != '100';
  if (!visibleInStyle) {
    return false;
  }

  return true;
};

/**
 * Check if whether an element is put to inner of the other element.
 *
 * @param Element outerElement
 * @param Element innerElement
 * @return boolean return true if innerElement is put to inner of outerElement
 *                 and otherwise, return false.
 */
Dom.isInner = function(outerElement, innerElement) {
  var outerRect = outerElement.getBoundingClientRect();
  var innerRect = innerElement.getBoundingClientRect();

  return outerRect.top    <= innerRect.top  &&
         outerRect.left   <= innerRect.left &&
         outerRect.bottom >= innerRect.top  &&
         outerRect.right  >= innerRect.left;
};

Dom.stayInOverflowHiddenBox = function(element) {
  var parentNode   = element;
  var stayInBox    = true;
  var fixedElement = undefined;

  while (parentNode = parentNode.parentNode) {
    computedStyle = window.getComputedStyle(parentNode, null);
    if (!computedStyle) {
      break;
    }

    if (computedStyle.getPropertyValue('position') == 'fixed') {
      fixedElement = parentNode;
    }

    if (computedStyle.getPropertyValue('overflow') == 'hidden') {
      var parentNodeRect = parentNode.getBoundingClientRect();
      var elementRect    = element.getBoundingClientRect();
      stayInBox = fixedElement ||
                 (parentNodeRect.top    <= elementRect.top  &&
                  parentNodeRect.left   <= elementRect.left &&
                  parentNodeRect.bottom >= elementRect.top  &&
                  parentNodeRect.right  >= elementRect.left);
      break;
    }
  }

  return stayInBox;
};

/**
 * Search parent image of specified area element
 *
 * @param Element element An area tag element you want to search a parent image element.
 * @return Element If a parent element is found return it, otherwise undefined.
 */
Dom.searchParentImageOf = function(element) {
  var map   = element.parentNode;
  var xpath = "//img[@usemap='#" + map.name + "']";

  var results = document.evaluate(xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  if (results.snapshotLength > 0) {
    return results.snapshotItem(0);
  }

  return undefined;
};

/**
 * Check if whether an element is editable.
 *
 * @param Element element A target element.
 * @return boolean Return true if an element is editable, otherwise false.
 */
Dom.isEditable = function(element) {
  var tagName = element.tagName.toLowerCase();
  var editableType = [
    'date', 'datetime', 'datetime-local', 'email', 'month', 'number', 'password',
    'search', 'tel', 'text', 'time', 'url', 'week'
  ];

  return element.isContentEditable ||
         tagName == 'textarea'     ||
        (tagName == 'input' && Utility.inArray(editableType, element.type));
};

/**
 * Do HTML escape for a text.
 *
 * @param string text A target text.
 */
Dom.escapeHTML = function(text) {
  var pre = document.createElement('pre');
  pre.appendChild(document.createTextNode(text));
  return pre.innerHTML;
};

Dom.highlight = function(element, text, option) {
  option = option || { ignoreCase: false };

  if (element.nodeType == 3) {
    var pos = -1;
    if (option.ignoreCase) {
      pos = element.data.toLowerCase().indexOf(text.toLowerCase());
    } else {
      pos = element.data.indexOf(text);
    }

    if (pos > -1) {
      var matchedNode     = element.splitText(pos);
      var highlightedNode = document.createElement('span');

      matchedNode.splitText(text.length);
      highlightedNode.className = 'hometype-matched-text';
      highlightedNode.appendChild(document.createTextNode(matchedNode.data));
      element.parentNode.replaceChild(highlightedNode, matchedNode);
      return true;
    }

    return false;
  } else if (element.nodeType == 1 &&
             element.childNodes &&
             element.className.indexOf('hometype-matched-text') == -1 &&
            !element.tagName.match(/(script|style)/i)) {
    var nodes = element.childNodes;
    for (var i = 0; i < nodes.length; i++) {
      if (Dom.highlight(nodes[i], text, option)) {
        i++;
      }
    }
  }
};

Dom.removeHighlight = function(element) {
  var results = document.evaluate(".//span[@class='hometype-matched-text']", element, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  for (var i = 0; i < results.snapshotLength; i++) {
    var item       = results.snapshotItem(i);
    var parentNode = item.parentNode;

    parentNode.replaceChild(item.firstChild, item);
    parentNode.normalize();
  }
};
