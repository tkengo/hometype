var Dom = {};

/**
 * Get clickable and insertable and selectable xpath.
 * For hint mode.
 */
Dom.clickableAndInsertableXPath = function() {
  return [
    "//a", "//textarea", "//button", "//select", "//area",
    "//input[not(@type='hidden' or @disabled or @readonly)]",
    "//*[contains(@class, 'button') or @onclick or @tabindex or @role='button' or @contenteditable='true' or @contenteditable='']"
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
 * Search all elements in xpath.
 *
 * @param string xpath
 * @return array Elements.
 */
Dom.searchVisibleElementsFrom = function(xpath) {
  var stackingContexts = [];

  var all = document.evaluate('//*', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  for (var i = 0; i < all.snapshotLength; i++) {
    var element = all.snapshotItem(i);
    var computedStyle = window.getComputedStyle(element, null);

    if (element.children.length == 0 && computedStyle.getPropertyValue('background-color') == 'rgba(0, 0, 0, 0)') {
      continue;
    }
    if (!Dom.isVisibleInDisplay(element)) {
      continue;
    }

    var position = computedStyle.getPropertyValue('position');
    var zIndex = parseInt(computedStyle.getPropertyValue('z-index'));

    if (position != 'static' && zIndex > 0) {
      stackingContexts.push({ el: element, zIndex: zIndex });
    }
  }

  var results = document.evaluate(xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

  var s = new StackingContext();

  var targets = [];

  for (var i = 0; i < results.snapshotLength; i++) {
    var targetElement = results.snapshotItem(i);
    var inspectionElement = targetElement;

    // var clickable = targetElement.tagName == 'A' ||
    //                 targetElement.tagName == 'TEXTAREA' ||
    //                 targetElement.tagName == 'BUTTON' ||
    //                 targetElement.tagName == 'SELECT' ||
    //                 targetElement.tagName == 'AREA' ||
    //                 targetElement.class.indexOf('button') > -1 ||
    //                 targetElement.onclick ||
    //                 targetElement.tabIndex ||
    //                 window.getComputedStyle(targetElement, null).getPropertyValue('cursor') == 'pointer';
    if (targetElement.tagName == 'AREA') {
      inspectionElement = Dom.searchParentImageOf(targetElement);
    }

    if (!Dom.isVisibleInDisplay(inspectionElement)) {
      continue;
    }

    // var computedStyle = window.getComputedStyle(element, null);
    // var zIndex = computedStyle.getPropertyValue('z-index');
    // zIndex = zIndex == 'auto' ? 0 : parseInt(zIndex);
    // var isOverHidden = false;
    // for (var stackingContextIndex in stackingContexts) {
    //   var context = stackingContexts[stackingContextIndex];
    //   if (Dom.isInner(context.el, inspectionElement) && zIndex < context.zIndex) {
    //     isOverHidden = true;
    //     break;
    //   }
    // }
    // if (isOverHidden) {
    //   continue;
    // }
    if (s.isOverHidden(inspectionElement)) {
      continue;
    }

    var parentNode = inspectionElement;
    var stayInBox = true;
    while (parentNode = parentNode.parentNode) {
      computedStyle = window.getComputedStyle(parentNode, null);
      if (!computedStyle) {
        break;
      }

      if (computedStyle.getPropertyValue('overflow') == 'hidden') {
        var parentNodeRect = parentNode.getBoundingClientRect();
        var elementRect    = inspectionElement.getBoundingClientRect();
        stayInBox = parentNodeRect.top    <= elementRect.top  &&
                    parentNodeRect.left   <= elementRect.left &&
                    parentNodeRect.bottom >= elementRect.top  &&
                    parentNodeRect.right  >= elementRect.left;
        break;
      }
    }
    if (!stayInBox) {
      continue;
    }

    targets.push(targetElement);
  }

  return targets;
};

Dom.isVisibleInDisplay = function(element) {
  var visibleInOffset = element.offsetWidth > 0 && element.offsetHeight > 0;
  if (!visibleInOffset) {
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

Dom.isInner = function(outerElement, innerElement) {
  var outerRect = outerElement.getBoundingClientRect();
  var innerRect = innerElement.getBoundingClientRect();

  return outerRect.top    <= innerRect.top  &&
         outerRect.left   <= innerRect.left &&
         outerRect.bottom >= innerRect.top  &&
         outerRect.right  >= innerRect.left;
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
