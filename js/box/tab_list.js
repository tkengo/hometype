/**
 * Copyright (c) 2013 Kengo Tateishi (@tkengo)
 * Licensed under MIT license.
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Tab list box.
 */
var HometypeTabListBox = function(tabs) {
  var hintKeys = Opt.tab_selection_hint_keys;

  this.tabs      = tabs;
  this.sourceMap = {};

  var box = $('<div>').addClass('hometype-tab-list-box');
  for (var i = 0; i < tabs.length; i++) {
    var tab     = tabs[i];
    var hintKey = hintKeys[i];

    var tabElement = $('<div>').addClass('hometype-tab-element').text(tab.title).appendTo(box);
    $('<span>').addClass('hometype-tab-element-hint-key').text('[' + hintKey + ']').prependTo(tabElement);
    $('<img>').attr('src', tab.favIconUrl).attr('width', '16').prependTo(tabElement);

    this.sourceMap[hintKey] = tab;
  }
  box.appendTo($('body')).screenCenter();

  this.box = box;
};

/**
 * Remove this box from DOM.
 */
HometypeTabListBox.prototype.remove = function() {
  this.box.remove();
};

/**
 * Get tab by hint key.
 *
 * @param string hintKey hint key.
 * @return Object Tab.
 */
HometypeTabListBox.prototype.getBy = function(hintKey) {
  return this.sourceMap[hintKey];
};
