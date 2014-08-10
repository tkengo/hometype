function filterClosedTabs(text, tabs)
{
  var homedics = new Homedics(text);
  var list     = [];

  for (var i = 0; i < tabs.length; i++) {
    var tab = tabs[i];

    if (tab) {
      var urlMatched   = homedics.match(tab.url);
      var titleMatched = homedics.match(tab.title);

      if (text == '' || urlMatched.matched || titleMatched.matched) {
        list.push({
          text: tab.title + '(' + tab.url + ')',
          url: tab.url,
          tabId: tab.id,
          highlights: (urlMatched.matches || []).concat(titleMatched.matches || [])
        });
      }
    }
  }

  return list;
}

function filterBookmarks(text, bookmarks)
{
  var homedics = new Homedics(text);
  var list     = [];

  for (var i = 0; i < bookmarks.length; i++) {
    var bookmark     = bookmarks[i];
    var urlMatched   = homedics.match(bookmark.url);
    var titleMatched = homedics.match(bookmark.title);

    if (text == '' || urlMatched.matched || titleMatched.matched) {
      list.push({
        text: bookmark.title + '(' + bookmark.url + ')',
        url: bookmark.url,
        icon: bookmark.faviconDataUrl,
        highlights: (urlMatched.matches || []).concat(titleMatched.matches || [])
      });
    }
  };

  return list;
}

function filterHistories(histories, text)
{
  var homedics = new Homedics(text);
  var list     = [];

  for (var i = histories.length - 1; i > -1; i--) {
    var history      = histories[i];
    var urlMatched   = homedics.match(history.url);
    var titleMatched = homedics.match(history.title);

    if (text == '' || urlMatched.matched || titleMatched.matched) {
      list.push({
        text: history.title + '(' + history.url + ')',
        url: history.url,
        icon: history.faviconDataUrl,
        highlights: (urlMatched.matches || []).concat(titleMatched.matches || [])
      });
    }
  }

  return list;
}

function filterApplications(apps, text)
{
  var homedics = new Homedics(text);
  var list     = [];

  for (var i = 0; i < apps.length; i++) {
    var app         = apps[i];
    var nameMatched = homedics.match(app.name);
    var urlMatched  = homedics.match(app.appLaunchUrl);

    if (text == '' || urlMatched.matched || nameMatched.matched) {
      list.push({
        text: app.appLaunchUrl ?  app.name + '(' + app.appLaunchUrl + ')' : app.name,
        url: app.appLaunchUrl,
        id: app.id,
        icon: app.faviconDataUrl,
        highlights: (urlMatched.matches || []).concat(nameMatched.matches || [])
      });
    }
  }

  return list;
}

function filterTabs(tabs, text)
{
  var homedics = new Homedics(text);
  var list     = [];

  for (var i = 0; i < tabs.length; i++) {
    var tab          = tabs[i];
    var urlMatched   = homedics.match(tab.url);
    var titleMatched = homedics.match(tab.title);

    if (text == '' || urlMatched.matched || titleMatched.matched) {
      var char = '<span class="hometype-char-text">' + Opt.tab_selection_hint_keys.charAt(i) + '</span> ';
      list.push({
        escape: false,
        text: ' - ' + char + Dom.escapeHTML(tab.title + '(' + tab.url + ')'),
        url: tab.url,
        icon: tab.faviconDataUrl,
        id: tab.id,
        highlights: (urlMatched.matches || []).concat(titleMatched.matches || [])
      });
    }
  }

  return list;
}
