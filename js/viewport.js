/**
 * Copyright (c) 2013 Kengo Tateishi (@tkengo)
 * Licensed under MIT license.
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * 画面オブジェクト
 */
var ChromekeyScreen = function() {
};

/**
 * 現在のスクロール位置を取得します。
 *
 * @return Object topとleftのキーを持つハッシュ
 */
ChromekeyScreen.prototype.getScrollPosition = function() {
  return {
    top: document.body.scrollTop,
    left: document.body.scrollLeft
  };
};

/**
 * ウィンドウのサイズを取得します。
 *
 * @return Object widthとheightのキーを持つハッシュ
 */
ChromekeyScreen.prototype.getWindowSize = function() {
  return {
    width: window.innerWidth,
    height: window.innerHeight
  };
};

/**
 * ドキュメントのサイズを取得します。
 *
 * @return Object widthとheightのキーを持つハッシュ
 */
ChromekeyScreen.prototype.getDocumentSize = function() {
  return {
    width: $(document).width(),
    height: $(document).height()
  };
};

/**
 * 指定位置にスクロールします。
 *
 * @param integer x 縦位置
 * @param integer y 横位置
 */
ChromekeyScreen.prototype.scrollTo = function(x, y) {
  document.body.scrollTop = y;
  document.body.scrollLeft = x;
};

/**
 * 指定した量だけ縦方向にスクロールします。
 * プラスの値を指定すると下方向へ
 * マイナスの量を指定すると上方向へ
 * スクロールします。
 *
 * @param integer value スクロール量
 */
ChromekeyScreen.prototype.scrollVertical = function(value) {
  var pos = this.getScrollPosition();
  this.scrollTo(pos.left, pos.top + value);
};

/**
 * 指定した量だけ横方向にスクロールします。
 * プラスの値を指定すると右方向へ
 * マイナスの量を指定すると左方向へ
 * スクロールします。
 *
 * @param integer value スクロール量
 */
ChromekeyScreen.prototype.scrollHorizontal = function(value) {
  var pos = this.getScrollPosition();
  this.scrollTo(pos.left - value, pos.top);
};

ChromekeyScreen.prototype.setContentEditable = function(element) {
  element.attr('contenteditable', true);
  element.attr('data-chromekey-not-insert-mode', 'true');
  element.attr('data-chromekey-contenteditable', 'true');
  $('<div>').addClass('chromekey-contenteditable').css({
    width: element.innerWidth() + 10,
    height: element.innerHeight() + 10,
    top: element.offset().top - 5,
    left: element.offset().left - 5
  }).appendTo($('body')).click(function() {
    element.focus();
  });
};

ChromekeyScreen.prototype.resetContentEditable = function() {
  var element = this.getCurrentContentEditable();
  element.removeAttr('contenteditable');
  element.removeAttr('data-chromekey-not-insert-mode');
  element.removeAttr('data-chromekey-contenteditable');
  $('.chromekey-contenteditable').remove();
  $(document.activeElement).blur();
};

ChromekeyScreen.prototype.getCurrentContentEditable = function() {
  return $('[data-chromekey-contenteditable=true]');
};

ChromekeyScreen.prototype.getNextContentEditableElement = function(current) {
  var next = null;

  while (current.length > 0) {
    next = current.next();
    if (next.length > 0) {
      if (next.is(':visualable:visible')) {
        break;
      }
      else {
        current = next;
      }
    }
    else {
      current = current.parent();
    }
  }
  
  return next;
};

ChromekeyScreen.prototype.getPrevContentEditableElement = function(current) {
  var prev = null;

  while (current.length > 0) {
    prev = current.prev();
    if (prev.length > 0) {
      if (prev.is(':visualable:visible')) {
        break;
      }
      else {
        current = prev;
      }
    }
    else {
      current = current.parent();
    }
  }
  
  return prev;
};

/**
 * DOMにリンク要素を追加します。
 *
 * @param string  url    リンク先URL
 * @param element parant リンクの親となる要素。
 *                       省略された場合はbody以下にリンクを追加します。
 */
ChromekeyScreen.prototype.createLink = function(url, parent) {
  var parent = $(parent || 'body');
  return $('<a>').attr('href', url).appendTo(parent);
};

var Viewport = new ChromekeyScreen();
