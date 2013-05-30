$(document).ready(function() {
  var caretBrowseMode = false;

  $(document).keydown(function(event) {
    var top = document.body.scrollTop;
    console.log(event.keyCode);
    if (event.keyCode == 74) {
      $('html, body').animate({ scrollTop: (top + 50) + 'px' }, 100);
    }
    else if (event.keyCode == 75) {
      $('html, body').animate({ scrollTop: (top - 50) + 'px' }, 100);
    }
    else if (event.keyCode == 67) {
      caretBrowseMode = !caretBrowseMode;
      $('html').attr('contenteditable', caretBrowseMode);
    }
  });
});
