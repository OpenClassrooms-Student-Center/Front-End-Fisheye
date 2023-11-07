function photographerCard(data) {
  const { name, portrait, city, country, tagline, price, id } = data;
  console.log(data);
  const picture = `assets/photographers/Photographers_ID_Photos/${portrait}`;

  function getPhotographerCard() {
    const article = document.createElement('article');
    article.className = 'photographer';
    const img = document.createElement('img');
    img.src = picture;
    img.alt = name;
    const h2 = document.createElement('h2');
    h2.textContent = name;
    const description = document.createElement('div');
    const location = document.createElement('h3');
    location.textContent = `${city}, ${country}`;
    const taglinePhotograph = document.createElement('p');
    taglinePhotograph.textContent = tagline;
    const pricePhotograph = document.createElement('p');
    pricePhotograph.textContent = `${price}€/jour`;
    description.appendChild(location);
    description.appendChild(taglinePhotograph);
    description.appendChild(pricePhotograph);
    article.appendChild(img);
    article.appendChild(h2);
    article.appendChild(description);
    article.tabIndex = 0;
    article.dataset.id = id;
    console.log(id);
    return article;
  }
  return { getPhotographerCard };
}
// async function openPhotographerPage(id) {
//   window.location.href = 'pages/photographer.html';
// }

export { photographerCard };
