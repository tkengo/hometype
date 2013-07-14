/**
 * Copyright (c) 2013 Kengo Tateishi (@tkengo)
 * Licensed under MIT license.
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * コマンドボックス
 * コマンドモードに入った時に画面下側に表示されるボックスを管理します。
 */
var COMMAND_BOX_HEIGHT = 20;
var CANDIDATE_AREA_HEIGHT = 180;
var COMMAND_BOX_MARGIN = 8;
var CANDIDATE_MAX_COUNT = 10;

var ChromekeyCommandBox = function() {
  // コマンドボックスに必要な要素を作る
  var box       = $('<div>')  .addClass('chromekey-command-box')
                              .attr('id', '_chromekey-command-box')
                              .width(Viewport.getWindowWidth() - COMMAND_BOX_MARGIN * 4)
                              .height(COMMAND_BOX_HEIGHT);
  var text      = $('<input>').attr('type', 'text')
                              .attr('data-chromekey-not-insert-mode', true)
                              .appendTo(box);
  var candidate = $('<div>')  .addClass('chromekey-command-box-candidate-area')
                              .attr('id', '_chromekey-command-box-candidate-area')
                              .width(Viewport.getWindowWidth() - COMMAND_BOX_MARGIN * 4)
                              .height(CANDIDATE_AREA_HEIGHT)

  this.list = [];

  // 要素をオブジェクトに保存
  this.box       = box;
  this.text      = text;
  this.candidate = candidate;

  // bodyに追加
  $(document).ready($.proxy(function() {
    this.box.appendTo($('body'));
    this.candidate.appendTo($('body'));
  }, this));
};

/**
 * コマンドボックスを表示します。
 */
ChromekeyCommandBox.prototype.show = function() {
  // コマンドボックスを表示する位置を計算
  var scrollTop = Viewport.getWindowHeight() + Viewport.getScrollPosition().top;

  // 画面下側にコマンドボックスを配置して表示する
  this.box.css({
    top: scrollTop - (COMMAND_BOX_HEIGHT + COMMAND_BOX_MARGIN * 3),
    left: COMMAND_BOX_MARGIN
  }).fadeIn(300);

  // フォーカスをあてる
  this.text.focus();
};

/**
 * コマンドボックスを非表示にします。
 */
ChromekeyCommandBox.prototype.hide = function() {
  this.box.hide();
  this.candidate.hide();
  $('div', this.candidate).remove();
  this.text.val('');
};

/**
 * 候補一覧を表示します。
 */
ChromekeyCommandBox.prototype.showCandidate = function() {
  if (!this.candidate.is(':visible')) {
    this.recalculateAndSetPosition();
    this.candidate.hide().fadeIn(300);
  }
};

/**
 * 候補一覧の表示位置とサイズを再計算してその位置に移動します。
 */
ChromekeyCommandBox.prototype.recalculateAndSetPosition = function() {
  // 一旦見えない所に候補一覧を表示する。
  // 表示状態じゃないと要素の幅と高さが取得できないので。
  this.candidate.css({ top: -9999, left: -9999 }).show();

  // スクロール位置の取得
  var scrollTop = Viewport.getWindowHeight() + Viewport.getScrollPosition().top;

  // 候補一覧のサイズと表示位置をセット
  var children = this.candidate.children();
  this.candidate.height($(children[0]).outerHeight() * children.length);
  this.candidate.css({
    top: scrollTop - this.candidate.height() - COMMAND_BOX_HEIGHT - COMMAND_BOX_MARGIN * 4,
    left: COMMAND_BOX_MARGIN
  });
};

/**
 * 候補一覧をセットします。
 *
 * @param array list 候補一覧
 */
ChromekeyCommandBox.prototype.setCandidate = function(list) {
  // 一度現在の候補を全部削除
  $('div', this.candidate).remove();

  // 候補一覧をオブジェクトに保存
  this.list = list;

  // 候補一覧をセットしていく
  for (var i in list) {
    var text = typeof list[i] == 'string' ? list[i] : list[i].text;
    var div = $('<div>').text(text).attr('data-index', i);

    // 1つ目を選択状態にしておく
    if (i == 0) {
      div.addClass('selected');
    }
    this.candidate.append(div);

    // 最大候補数を超えたら終了
    if (i == CANDIDATE_MAX_COUNT) {
      break;
    }
  }

  if (this.candidate.is(':visible')) {
    this.recalculateAndSetPosition();
  }
};

/**
 * 次の候補を選択します。
 */
ChromekeyCommandBox.prototype.selectNext = function() {
  var div = $('div.selected', this.candidate);
  div.removeClass('selected');
  var next = div.next();
  if (next.length > 0) {
    next.addClass('selected');
  }
  else {
    $('div:first', this.candidate).addClass('selected');
  }
};

/**
 * 前の候補を選択します。
 */
ChromekeyCommandBox.prototype.selectPrev = function() {
  var div = $('div.selected', this.candidate);
  div.removeClass('selected');
  var prev = div.prev();
  if (prev.length > 0) {
    prev.addClass('selected');
  }
  else {
    $('div:last', this.candidate).addClass('selected');
  }
};

/**
 * 選択されている候補を取得します。
 */
ChromekeyCommandBox.prototype.getSelected = function() {
  var div = $('div.selected', this.candidate);
  return this.candidate[div.attr('data-index')];
};

/**
 * コマンドボックスのテキスト内容を取得します。
 */
ChromekeyCommandBox.prototype.getText = function() {
  return this.text.val().replace(':', '');
};

var CommandBox = new ChromekeyCommandBox();
