/**
 * Copyright (c) 2013 Kengo Tateishi (@tkengo)
 * Licensed under MIT license.
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * セレクトボックス
 */
var ChromekeySelectBox = function(select) {
  // セレクトボックスの選択肢を全て取得
  var children = select.children('option');

  // ボックスを新しく作る
  this.ul  = $('<ul>');
  this.box = $('<div>').addClass('chromekey-select-box')
                       .appendTo($('body'))
                       .screenCenter()
                       .append(this.ul);

  // ボックスの中に選択肢要素を全部追加する
  this.items = [];
  var context = this;
  children.each(function() {
    var li = $('<li>').text($(this).text())
                      .attr('value', $(this).val())
                      .appendTo(context.ul)
    
    // ボックス内選択肢をクリックした時はそれを選択するようにする
    li.click(function() {
      select.val($(this).attr('value')).change();
      context.box.remove();
    });

    context.items.push(li);
  });
};

/**
 * セレクトボックス選択肢を全て取得します。
 *
 * @return array セレクトボックスの選択肢
 */
ChromekeySelectBox.prototype.getListElements = function() {
  return this.items;
};
