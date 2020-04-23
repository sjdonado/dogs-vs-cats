function loadImgToCanvas(url, width, height) {
  const canvas = document.getElementById('random-img');
  const ctx = canvas.getContext('2d');
  canvas.width = width;
  canvas.height = height;
  const img = new Image();
  img.onload = function() {
    ctx.drawImage(img, 0, 0);
    // predict(canvas);
  };
  img.src = url;
}

function getImage() {
  const BASE_URL = 'https://pixabay.com/api/?key=16193030-01150588670c2653b17fe8298&image_type=photo&min_width=150&min_height=150&per_page=200&order=latest'
  const categories = ['dogs', 'cats'];
  fetch(`${BASE_URL}&q=${categories[Math.round(Math.random())]}`)
    .then((res) => res.json())
    .then(({ hits }) => {
      const { webformatURL, webformatWidth, webformatHeight } = hits[Math.round(Math.random() * 200)]
      loadImgToCanvas(webformatURL, webformatWidth, webformatHeight);
    })
    .catch((err) => {
      console.log(err);
    })
}