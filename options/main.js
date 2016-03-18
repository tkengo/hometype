$(document).ready(function() {
  translate();
  HometypeOptions.getInstance().load(load);

  $('.js-help').click(showHelp);
  $('.js-menu-section').click(switchSection);
  $('#save').click(saveOptions);
  $(':radio[name="hint_key_algorithm"]').click(controlCustomHintKeyField);
});

function translate()
{
  $('.js-translate').each(function() {
    var el = $(this);
    el.html(chrome.i18n.getMessage(el.data('translate')));
  });
}

function load(options)
{
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

  controlCustomHintKeyField();

  var bindList = '';
  for (var map in options.key_bind.remap) {
    for (var key in options.key_bind.remap[map]) {
      var command = options.key_bind.remap[map][key];
      bindList += map + ' ' + key + ' ' + command + "\r\n";
    }
  }
  for (var map in options.key_bind.noremap) {
    for (var key in options.key_bind.noremap[map]) {
      var command = options.key_bind.noremap[map][key];
      bindList += map.replace('map', 'noremap') + ' ' + key + ' ' + command + "\r\n";
    }
  }
  $('#key_bind_list').val(bindList);

  var ignoreList = '';
  $.each(options.ignore_urls, function(index, url) {
    ignoreList += url + "\r\n";
  });
  $('#ignore_url_list').val(ignoreList);
}

function showHelp()
{
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
}

function switchSection()
{
  var ref = $(this).data('ref');

  $('.js-menu-section').removeClass('active-menu-section');
  $(this).addClass('active-menu-section');
  $('.js-option-panel').hide();
  $('#' + ref).show();
}

function saveOptions()
{
  var params = {};

  $(':text, :radio:checked').each(function() {
    params[$(this).attr('name')] = $(this).val();
  });
  $(':checkbox').each(function() {
    params[$(this).attr('name')] = $(this).prop('checked');
  });

  var bindList = $('#key_bind_list').val();
  params.key_bind = {
    remap: {},
    noremap: {}
  };
  $.each(bindList.split(/\r\n|\r|\n/), function(index, line) {
    if (line == '') {
      return true;
    }
    value = line.split(' ');

    var map = value[0].replace('noremap', 'map');
    var key = value[1];
    var type = value[0].indexOf('noremap') > -1 ? 'noremap' : 'remap';

    if (!params.key_bind[type][map]) {
      params.key_bind[type][map] = {};
    }

    params.key_bind[type][map][key] = value[2];
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
}

function controlCustomHintKeyField()
{
  var el = $('#custom_hint_keys');
  var checked = !$('#hint_key_custom').prop('checked');
  el.prop('disabled', checked);

  if (checked) {
    el.addClass('disabled');
  } else {
    el.removeClass('disabled');
  }
}
