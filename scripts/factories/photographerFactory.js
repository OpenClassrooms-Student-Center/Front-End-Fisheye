function photographerTemplate(data) {
  const { id, name, portrait, city, country, tagline, price } = data;

  const picture = `assets/photographers/${portrait}`;
  const url = `photographer.html?id=${id}`;

  /**
   * Photographer article factory
   * @returns A photographers list element to detail one photograph
   */
  function getUserCardDOM() {
    const article = document.createElement( 'article' );

    // Image and title photograph
    const imgTitleLink = document.createElement('a');
    imgTitleLink.href = url;
    const img = document.createElement( 'img' );
    img.src = picture;
    img.alt = name;
    const h2 = document.createElement( 'h2' );
    h2.textContent = name;
    
    imgTitleLink.appendChild(img);
    imgTitleLink.appendChild(h2);

    // Photograph informations
    const h3 = document.createElement('h3');
    h3.textContent = `${city}, ${country}`;
    const p = document.createElement('p');
    p.textContent = tagline;
    const span = document.createElement('span');
    span.textContent = `${price}€/jour`;

    article.appendChild(imgTitleLink);
    article.appendChild(h3);
    article.appendChild(p);
    article.appendChild(span);

    return (article);
  }

  /**
   * 
   */
  function getPhotographerDescription() {
    
  }

  return {
    name,
    picture,
    getUserCardDOM,
    getPhotographerDescription
  }
}