$(document).ready(function() {
  chrome.runtime.sendMessage({ command: 'getOptions', params: { key: 'command_interval' } }, function(response) {
    $('#command_interval').val(response);
  });

  $('#save').click(function() {
    var params = {};
    // localStorage.command_interval = $('#command_interval').val();
    params.command_interval = $('#command_interval').val();
    chrome.runtime.sendMessage({ command: 'setOptions', params: params });
  });
});
