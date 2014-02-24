/**
 * Copyright (c) 2013 Kengo Tateishi (@tkengo)
 * Licensed under MIT license.
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Select box.
 */
var ChromekeySelectBox = function(select) {
  // Create select box elements.
  this.ul  = $('<ul>');
  this.box = $('<div>').addClass('chromekey-select-box')
                       .appendTo($('body'))
                       .screenCenter()
                       .append(this.ul);

  // Get select box's all options.
  var children = select.children('option');

  // Add all options to a select box.
  this.items = [];
  var context = this;
  children.each(function() {
    var li = $('<li>').text($(this).text())
                      .attr('value', $(this).val())
                      .appendTo(context.ul);

    // Select the option if an element in the box is clicked.
    li.click(function() {
      select.val($(this).attr('value')).change();
      context.remove();
    });

    context.items.push(li);
  });
};

/**
 * Get select box's all options
 *
 * @return array options
 */
ChromekeySelectBox.prototype.getListElements = function() {
  return this.items;
};

/**
 * Remove select box from document body.
 */
ChromekeySelectBox.prototype.remove = function() {
  this.box.remove();
};
