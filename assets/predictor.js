function drawChart(scores) {
  const ctx = document.getElementById('scores-pie').getContext('2d');
  new Chart(ctx, {
    type: 'pie',
    data: {
      datasets: [{
        data: [(1 - scores) * 100, scores * 100],
        backgroundColor: ['rgba(255, 99, 132)', 'rgba(54, 162, 235)'],
      }],
      labels: ['Cat', 'Dog'],
    },
  });
}

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
    drawChart(scores);
    document.getElementById('prediction').innerText = scores <= 0.5 ? 'Cat' : 'Dog';
    document.getElementById('random-btn').disabled = false;
  }
}

(async () => {
  window.model = await tf.loadLayersModel('model/model.json');
  console.log('model loaded!');
  getImage();
})()