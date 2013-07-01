$(document).ready(function() {
  chrome.runtime.sendMessage({ command: 'getOptions' }, function(response) {
    for (var key in response) {
      $('#' + key).val(response[key]);
    }
  });

  $('#save').click(function() {
    var params = {};
    $(':input').each(function() {
      params[$(this).attr('id')] = $(this).val();
    });
    chrome.runtime.sendMessage({ command: 'setOptions', params: params });
  });
});
