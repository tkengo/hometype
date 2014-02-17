/**
 * Copyright (c) 2013 Kengo Tateishi (@tkengo)
 * Licensed under MIT license.
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * ヒントエレメント
 */

/**
 * コンストラクタ
 *
 * @param element srcElement ヒントエレメントを付けるソースとなる要素
 * @param integer index      ヒントエレメントのインデックス
 * @param array   key        ヒントに設定するキー
 * @param string  hintTheme  ヒントエレメントのテーマ
 */
var HintElement = function(srcElement, index, key, hintTheme) {
  this.className = 'chromekey-hit-a-hint-' + hintTheme;
  this.index     = index;
  this.key       = key;

  this.srcElement = $(srcElement);
  this.srcElement.addClass(this.className + '-area');

  this.rawTipElement = this.createTipElement();
};

/**
 * ヒントチップエレメントを作る。
 * ソース要素の左側にチップエレメントが表示されるように位置を計算。
 */
HintElement.prototype.createTipElement = function() {
  var top = 0, left = 0;

  if (this.srcElement.tag() == 'area') {
    // クリッカブルマップの場合はcoords属性から位置を取得
    var coords = this.srcElement.attr('coords').split(',');
    top = coords[1];
    left = coords[0];
  }
  else {
    // 通常の要素であればオフセット位置を取得
    top  = this.srcElement.offset().top - 10;
    left = this.srcElement.offset().left - 10;
  }

  // 画面からはみ出していれば補正
  if (top < Viewport.getScrollPosition().top) {
    top = Viewport.getScrollPosition().top;
  }
  if (left < 0) {
    left = 0;
  }

  // 計算した位置にヒントチップエレメントを作る
  var div = $('<div>').css({
    'top': top + 'px',
    'left': left + 'px'
  }).addClass(this.className + ' chromekey-hit-a-hint-base');

  // ヒントチップのキーを埋め込む
  for (var i in this.key) {
    div.append($('<span>').text(this.key[i]));
  }

  // 一意になるIDを設定して要素を返す
  this.elementId = 'chromekey-hit-a-hint-element-' + div.text();
  div.attr({ 'id': this.elementId })
  return div;
};

/**
 * ソース要素を取得する。
 */
HintElement.prototype.getElement = function() {
  return this.srcElement;
};

/**
 * ヒントチップエレメントを取得する。
 */
HintElement.prototype.getTipElement = function() {
  return $('#' + this.elementId);
};

/**
 * ヒントチップエレメントを取得する。
 * エレメントがまだ描画されていない場合はこっちを。
 */
HintElement.prototype.getRawTipElement = function() {
  return this.rawTipElement;
};

/**
 * このヒントチップに設定されたキーを取得する。
 */
HintElement.prototype.getKey = function() {
  return this.key;
};

/**
 * このヒントチップに設定された1つ目のキーを押したことにして
 * 文字色を赤くして強調する。
 */
HintElement.prototype.setPushed = function() {
  $(this.getTipElement().children()[0]).addClass('chromekey-hit-a-hint-pushed');
};

/**
 * ヒントチップを削除する。
 */
HintElement.prototype.removeHintTip = function(animate) {
  this.getElement().removeClass(this.className + '-area');
  if (animate === false) {
    this.getTipElement().remove();
  }
  else {
    this.getTipElement().fadeOut(100, function() {
      $(this).remove();
    });
  }
};
