function photographerPageFactory(data) {
  const { name, id, portrait, city, country, tagline, alt } = data;
  const picture = `assets/photographers/${portrait}`;

  function getPhotographerCardDOM() {
    const article = document.createElement("article");
    const content = `
    <div class="photograph-info">
    <div class=photograph-name>
      <h1>${name}</h1>
    </div>
    <div class="photograph-txt">
      <h2>${city}, ${country}</h2>
      <p>${tagline}</p>
    </div>
</div>
  <button class="contact_button">Contactez-moi</button>
  <div class="photograph-img">
    <img src="${picture}" alt="${alt}"/>
  </div>  
        `;

    article.innerHTML = content;

    return article;
  }
  return {
    id,
    name,
    picture,
    city,
    country,
    tagline,
    alt,
    getPhotographerCardDOM,
  };
}
