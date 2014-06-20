/**
 * Copyright (c) 2013 Kengo Tateishi (@tkengo)
 * Licensed under MIT license.
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Manage favicon.
 */
var TabIcon = function() {
  this.oldUrl = '';
  this.changed = false;
  this.link = document.querySelector("link[rel~='icon']");
  this.hasFavicon = !!this.link;
};

TabIcon.prototype.set = function(index) {
  if (!this.hasFavicon) {
    this.link = document.createElement("link");
    this.link.setAttribute("rel", "shortcut icon");
    document.head.appendChild(this.link);
  }
  this.link.type = "image/x-icon";

  if (this.link.href) {
    this.oldUrl = this.link.href;
  } else {
    this.oldUrl = document.querySelector("meta[itemprop='image']").content;
    this.hasFavicon = true;
  }
  this.changed = true;
  this.link.href = 'http://tkengo.github.io/hometype/icons/' + index + '.png';
};

TabIcon.prototype.undo = function() {
  if (!this.changed) {
    return;
  }

  if (this.hasFavicon) {
    this.link.href = this.oldUrl;
  } else {
    this.link.parentNode.removeChild(this.link);
  }

  this.changed = false;
};
