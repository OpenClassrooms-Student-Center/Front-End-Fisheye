function mediaFactory(data) {
  const { id, photographerId, title, image, likes, date, price } = data;
  function getMediaCardDOM() {
    const article = document.createElement("article");

    article.innerHTML = `<img src="assets/images/${image}" class="sample-image" alt="">
                        <h1>${title}</h1>`;
    return article;
  }
  //console.log(title, date, price);
  return {
    id,
    photographerId,
    title,
    image,
    likes,
    date,
    price,
    getMediaCardDOM,
  };
}
