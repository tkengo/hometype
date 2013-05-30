$(document).ready(function() {
  var caretBrowseMode = false;

  var command = new Command();

  $(document).keydown(function(event) {
    console.log(event.keyCode);
    command[Config.nmap[KeyCode[event.keyCode]]]();
    if (event.keyCode == KeyCode.C) {
      caretBrowseMode = !caretBrowseMode;
      $('html').attr('contenteditable', caretBrowseMode);
    }
  });
});
