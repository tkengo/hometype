$(document).ready(function() {
  HometypeOptions.getInstance().load(function(options) {
    $.each(options, function(key, value) {
      var element = $('#' + key);
      if (element.length > 0) {
        element.val(value);
      }
    });

    var bindList = '';
    $.each(options.key_bind, function(map, bind) {
      $.each(bind, function(key, command) {
        bindList += map + ' ' + key + ' ' + command + "\r\n";
      });
      bindList += "\r\n";
    });
    $('#key_bind_list').val(bindList);
  });

  $('#save').click(function() {
    var params = {};

    $(':input').each(function() {
      params[$(this).attr('id')] = $(this).val();
    });

    var bindList = $('#key_bind_list').val();
    params.key_bind = {};
    $.each(bindList.split(/\r\n|\r|\n/), function(index, line) {
      if (line == '') {
        return true;
      }

      value = line.split(' ');
      if (!params.key_bind[value[0]]) {
        params.key_bind[value[0]] = {};
      }

      params.key_bind[value[0]][value[1]] = value[2];
    });
    chrome.runtime.sendMessage({ command: 'setOptions', params: params });
  });
});
