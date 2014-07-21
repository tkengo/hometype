$(document).ready(function() {
  HometypeOptions.getInstance().load(function(options) {
    $.each(options, function(key, value) {
      var element = $("input[name='" + key + "']");
      if (element.length > 0) {
        if (element.is(':radio')) {
          element.val([ value ]);
        } else if (element.is(':checkbox')) {
          element.prop('checked', value);
        } else {
          element.val(value);
        }
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

  $('.js-help').click(function() {
    var name    = $(this).data('name');
    var title   = $('#title-for-' + name).text();
    var desc    = $('#desc-for-'  + name).html();
    var oldDesc = $($('#description-area-content').children()[0]);
    var newDesc = $('<div>').html(desc);

    $('#description-area-content').append(newDesc);
    $('#description-area-title').text(title);
    $('#description-area').show();
    oldDesc.animate({ height: 0 }, 500, function() {
      $(this).remove();
      $('#description-area-content').animate({ height: newDesc.outerHeight() }, 1000);
    });
  });

  $('.js-menu-section').click(function() {
    var ref = $(this).data('ref');

    $('.js-menu-section').removeClass('active-menu-section');
    $(this).addClass('active-menu-section');
    $('.js-option-panel').hide();
    $('#' + ref).show();
  });

  $('#save').click(function() {
    var params = {};

    $(':text, :radio:checked').each(function() {
      params[$(this).attr('name')] = $(this).val();
    });
    $(':checkbox').each(function() {
      params[$(this).attr('name')] = $(this).prop('checked');
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
