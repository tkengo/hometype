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

  var all = document.evaluate('//*', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  for (var i = 0; i < all.snapshotLength; i++) {
    var element = all.snapshotItem(i);
    var computedStyle = window.getComputedStyle(element, null);

    var isEmpty = element.children.length == 0 && computedStyle.getPropertyValue('background-color') == 'rgba(0, 0, 0, 0)';
    if (isEmpty || !Dom.isVisibleInDisplay(element)) {
      continue;
    }

    if (computedStyle.getPropertyValue('position') != 'static' &&
        computedStyle.getPropertyValue('z-index')  != 'auto') {
      this.push(element);
    }
  }
};

StackingContext.prototype.push = function(element) {
  var context = this.searchContext(element);
  if (context) {
    context.children.push({
      element: element,
      children: []
    });
  }
};

StackingContext.prototype.searchContext = function(searchElement) {
  var hoge = function(context, element) {
    if (context.element == element) {
      return context;
    }
    if (context.children.length == 0) {
      return false;
    }

    for (var i = 0; i < context.children.length; i++) {
      var returnContext = hoge(context.children[i], element);
      if (returnContext) {
        return returnContext;
      }
    }

    return false;
  };

  var parentNode = searchElement;
  while (parentNode) {
    var context = hoge(this.stackTree.root, parentNode);
    if (context) {
      return context;
    }
    parentNode = parentNode.parentNode;
  }

  return false;
};

StackingContext.prototype.isOverHidden = function(element) {
  var zIndex = window.getComputedStyle(element, null).getPropertyValue('z-index');
  zIndex = zIndex == 'auto' ? 0 : parseInt(zIndex);

  var context = this.searchContext(element);
  for (var i = 0; i < context.children.length; i++) {
    var contextElemet = context.children[i].element;
    var contextZIndex = window.getComputedStyle(contextElemet, null).getPropertyValue('z-index');
    contextZIndex = contextZIndex == 'auto' ? 0 : parseInt(contextZIndex);
    if (Dom.isInner(contextElemet, element) && zIndex < contextZIndex) {
      return true;
    }
  }

  return false;
};
