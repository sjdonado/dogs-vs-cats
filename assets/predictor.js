const preprocess = (image) => {
  let tensor = tf.browser.fromPixels(image)
    .resizeNearestNeighbor([150, 150])
    .expandDims()
    .toFloat();

  return tensor.div(255.0);
}

function predict(image) {
  if (window.model) {
    const scores = window.model.predict(preprocess(image)).dataSync();
    document.getElementById('prediction').innerText = scores <= 0.5 ? 'Cat' : 'Dog';
    document.getElementById('random-btn').disabled = false;
  }
}

(async () => {
  window.model = await tf.loadLayersModel('model/model.json');
  console.log('model loaded!');
  getImage();
})()