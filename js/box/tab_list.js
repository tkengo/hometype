/**
 * Copyright (c) 2013 Kengo Tateishi (@tkengo)
 * Licensed under MIT license.
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Select box.
 */
var HometypeTabListBox = function(tabs) {
  var box = $('<div>').addClass('hometype-tab-list-box');
  for (var i = 0; i < tabs.length; i++) {
    var tab = tabs[i];
    var tabElement = $('<div>').addClass('hometype-tab-element').text(tab.title).appendTo(box);
    $('<span>').addClass('hometype-tab-element-hint-key').text('[1]').prependTo(tabElement);
    $('<img>').attr('src', tab.favIconUrl).attr('width', '16').prependTo(tabElement);
  }
  box.appendTo($('body')).screenCenter();
};
