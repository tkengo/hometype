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

    var bindList = $('#key_bind_list').val();
    $.each(bindList.split(/\r\n|\r|\n/), function(index, line) {
      value = line.split(' ');
      if (!params[value[0]]) {
        params[value[0]] = {};
      }

      params[value[0]][value[1]] = value[2];
    });
    chrome.runtime.sendMessage({ command: 'setOptions', params: params });
  });
});
