function photographersTemplate(data) {
  const { name, portrait, city, country, tagline, price, id } = data

  const picture = `assets/photographers/${portrait}`

  function createDOM() {
    const article = document.createElement('article')
    article.setAttribute('id', id)
    const content = `
    <a href = "photographer.html?id=${id}" aria-labelledby="${id}">
      <img class='profile-picture' src="${picture}" alt="${name}">
      <h2 class='photographer-name'>${name}</h2>
    </a>
    <p class="location">${city}, ${country}</p>
    <p class="tag">${tagline}</p>
    <p class="price">${price}€/jour</p>
    `

    article.innerHTML = content

    return article
  }
  return { name, picture, createDOM }
}
