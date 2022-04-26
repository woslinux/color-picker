
function colorPicker(url, _config = {}) {
  // XXX: This canvas is needed to do what we need.
  var canvas = document.createElement('canvas');

  // XXX: We have to temproraily save the colors in a value since
  //      we can't return them straightaway from useCanvas()'s callback.
  var colors = [];

  useCanvas(canvas, url, function() {
      for (var i = 0; i <= (_config.colors - 1 || 0); i++) {
        // XXX: Here we get the image's data from each seperated part.
        var p = canvas.getContext('2d').getImageData(i, i, (_config.colors || 1), (_config.colors || 1)).data;

        // XXX: Here we multiply the color value with the brightness you
        //      specified to change it's brightness.
        var r = p[0] * (_config.brightness || 1);
        var g = p[1] * (_config.brightness || 1);
        var b = p[2] * (_config.brightness || 1);

        // XXX: And we get the color values and turn them to rgba CSS values
        //      with optional opacity.
        colors[i] = 'rgba(' + r + ', ' + g + ', ' + b + ', ' + (_config.opacity || 1) + ')';
      }
    });

  function useCanvas(element, imageUrl, callback) {
    // XXX: We create a new 'img' to draw and load the image.
    var image = new Image();
    image.src = imageUrl;

    // XXX: The image has to be the same width and height as it's resolution.
    element.width = image.width;
    element.height = image.height;

    // XXX: And finally. We draw the image to our canvas...
    element.getContext('2d').drawImage(image, 0, 0, (_config.colors || 1), (_config.colors || 1));
    return callback();
  }

  // XXX: And there you get the array of the colors in the image.
  if (_config.linearGradient !== undefined) {
    return 'linear-gradient(' + _config.linearGradient + ', ' + colors + ')';
  } else {
    return colors;
  }
}
