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

    var ignoreList = '';
    $.each(options.ignore_urls, function(index, url) {
      ignoreList += url + "\r\n";
    });
    $('#ignore_url_list').val(ignoreList);
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

    var ignoreList = $('#ignore_url_list').val();
    params.ignore_urls = [];
    $.each(ignoreList.split(/\r\n|\r|\n/), function(index, line) {
      if (line == '') {
        return true;
      }

      params.ignore_urls.push(line);
    });

    chrome.storage.sync.set({ 'options': params }, function() {
      $('#status').text('Saved!');
    });
  });
});
