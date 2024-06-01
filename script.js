async function get_pred(file) {
  return new Promise(async resolve => {
      const reader = new FileReader();
      reader.onload = async () => {
          data = JSON.stringify({ "data": [reader.result] })
          post = { method: "POST", body: data, headers: { "Content-Type": "application/json" } }
          const response = await fetch('https://hf.space/embed/jph00/pets/+/api/predict/', post)
          const json = await response.json();
          const prediction = json['data'][0]['confidences'][0];
          const div = document.createElement('div');
          div.innerHTML = `<img class="prediction" src="${reader.result}" width="300"> <p>${prediction['label']}</p>`
          results.append(div);
          return resolve(prediction)
      }
      reader.readAsDataURL(file);
  })
}

photos.addEventListener('input', async () => {
  results.innerHTML = "";
  await Promise.allSettled([...photos.files].map(get_pred));
});