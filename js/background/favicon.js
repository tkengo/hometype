function convertFaviconToDataURL(url, callback)
{
  var img = document.createElement('img');
  img.addEventListener('load', function() {
    var canvas  = document.createElement('canvas');
    var context = canvas.getContext('2d');

    canvas.width  = img.width;
    canvas.height = img.height;
    context.drawImage(img, 0, 0);
    context.globalCompositeOperation = 'source-in';

    callback(canvas.toDataURL());
  });

  img.src = 'chrome://favicon/' + url;
}

function convertFaviconsToDataURL(urls, callback, startIndex, result)
{
  startIndex = startIndex || 0;
  result     = result     || [];

  var url = urls[startIndex];
  if (url) {
    convertFaviconToDataURL(url, function(dataUrl) {
      result.push(dataUrl);
      convertFaviconsToDataURL(urls, callback, startIndex + 1, result);
    });
  } else {
    callback(result);
  }
}
