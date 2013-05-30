$(document).ready(function() {
  var caretBrowseMode = false;

  $(document).keydown(function(event) {
    var top = document.body.scrollTop;
    console.log(event.keyCode);
    if (event.keyCode == KeyCode.J) {
      $('html, body').animate({ scrollTop: (top + 50) + 'px' }, 100);
    }
    else if (event.keyCode == KeyCode.K) {
      $('html, body').animate({ scrollTop: (top - 50) + 'px' }, 100);
    }
    else if (event.keyCode == KeyCode.C) {
      caretBrowseMode = !caretBrowseMode;
      $('html').attr('contenteditable', caretBrowseMode);
    }
  });
});
