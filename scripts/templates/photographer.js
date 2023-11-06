function photographerTemplate(data) {
  const { name, portrait, city, country, tagline, price } = data

  const picture = `assets/photographers/${portrait}`

  function getUserCardDOM() {
    const article = document.createElement('article')
    article.innerHTML = `
      <div class="img-container">
        <img src="${picture}" alt="${name}">
      </div>
      <h2>${name}</h2>
      <p class="location">${city}, ${country}</p>
      <p class="tag">${tagline}</p>
      <p class="price">${price}€/jour`

    return article
  }
  return { name, picture, getUserCardDOM }
}
