function loadImgToCanvas(url, width, height) {
  const canvas = document.getElementById('random-img');
  const ctx = canvas.getContext('2d');
  canvas.width = width;
  canvas.height = height;

  const img = new Image();
  img.onload = function() {
    ctx.drawImage(img, 0, 0);
    document.getElementById('img-url').style.display = 'block';
    predict(canvas);
  };
  img.crossOrigin = 'anonymous';
  img.src = url;
  document.getElementById('img-url').href = url;
}

var images = [];
function getAllImages() {
  const BASE_URL = 'https://pixabay.com/api/?key=16193030-01150588670c2653b17fe8298&image_type=photo&min_width=150&min_height=150&per_page=100&order=latest';
  const getDogs = fetch(`${BASE_URL}&q=dog`);
  const getCats = fetch(`${BASE_URL}&q=cat`);

  Promise.all([getDogs, getCats])
    .then((arrRes) => Promise.all(arrRes.map((res) => res.json())))
    .then((res) => {
      images = res[0].hits.concat(res[1].hits);
    })
    .catch((err) => console.log(err))
}

getAllImages();

function getImage() {
  if (images.length > 0) {
    document.getElementById('random-btn').disabled = true;
    document.getElementById('img-url').style.display = 'none';
    document.getElementById('prediction').innerText = 'Cargando...';
    const { webformatURL, webformatWidth, webformatHeight } = images[Math.round(Math.random() * 200)];
    loadImgToCanvas(webformatURL, webformatWidth, webformatHeight);
  }
}