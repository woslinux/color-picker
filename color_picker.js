
function colorPicker(url, _config = {}) {
  // vars
  var canvas = document.createElement('canvas');

  useCanvas(canvas, url, function() {
      window._returnPickedColor = [];
      for (var i = 0; i <= (_config.colors || 1); i++) {
        // get image data
        var p = canvas.getContext('2d').getImageData(i, i, (_config.colors || 1), (_config.colors || 1)).data;
        // save color
        window._returnPickedColor[i] = 'rgba(' + p[0] + ', ' + p[1] + ', ' + p[2] + ', ' + (_config.opacity || 1) + ')';
      }
    });

  // canvas function
  function useCanvas(element, imageUrl, callback) {
    var image = new Image();
    image.src = imageUrl;
    element.width = image.width; // img width
    element.height = image.height; // img height
    // draw image in canvas tag
    element.getContext('2d')
    .drawImage(image, 0, 0, (_config.colors || 1), (_config.colors || 1));
    return callback();
  }

  return window._returnPickedColor;
}
