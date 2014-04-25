/**
 * Copyright (c) 2013 Kengo Tateishi (@tkengo)
 * Licensed under MIT license.
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Manage "Stacking Context"
 */
var StackingContext = function() {
  this.stackTree = {
    root: {
      element: document.documentElement,
      children: []
    }
  };
  this.flattenStack = [ document.documentElement ];

  var all = document.evaluate('//*', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  for (var i = 0; i < all.snapshotLength; i++) {
    var element = all.snapshotItem(i);
    var computedStyle = window.getComputedStyle(element, null);

    var isEmpty = element.children.length == 0 && computedStyle.getPropertyValue('background-color') == 'rgba(0, 0, 0, 0)';
    if (isEmpty || !Dom.isVisibleInDisplay(element)) {
      continue;
    }

    var position = computedStyle.getPropertyValue('position');
    var zIndex = computedStyle.getPropertyValue('z-index');

    if (position != 'static' && zIndex != 'auto') {
      this.push(element);
    }
  }
};

StackingContext.prototype.push = function(element) {
  var parentNode = element;
  while (parentNode = parentNode.parentNode) {
    for (var i in this.flattenStack) {

    }
  }
};

StackingContext.prototype.isStack = function(searchElement) {
  if (this.stackTree.root == searchElement) {
    return true;
  }

  var hoge = function(context, element) {
    if (context.element == element) {
      return true;
    }
    if (context.children.length == 0) {
      return false;
    }

    for (var i in element.children) {
      if (hoge(element.children[i])) {
        return true;
      }
    }
  };

  return hoge(this.stackTree.root, searchElement);
};
