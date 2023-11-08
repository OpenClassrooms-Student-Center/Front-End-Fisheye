function photographerProfileTemplate(data) {
  const { name, city, country, tagline, price, portrait } = data;
  const picture = `assets/photographers/${portrait}`;

  function getUserCardHeader(photographerMedia) {
    const template = `
        <article class="photograph-header">
          <div class="column">
            <h1>${name}</h1>
            <h2 class="location">${city}, ${country}</h2>
            <p class="tagline">${tagline}</p>
          </div>
          <div class="column">
            <button id="contact_button" aria-label="Contactez-moi">
              Contactez-moi
            </button>
          </div>
          <div class="column">
            <img class="photographer-image" src="${picture}" alt="${name}">
          </div>
        </article>
      `;

  
    const $template = document.createElement("div");
    $template.innerHTML = template;

    // Ajouter le prix en bas à droite du body
    const $popularitySection = document.createElement("div");
    const $popularitySectionLeft = document.createElement("h3");
    const $popularitySectionRight = document.createElement("h3");
    const $totalLikes = document.createElement("span");
    const $icon = document.createElement("span");

    $popularitySection.classList.add("popularity-section");

    $popularitySectionLeft.appendChild($totalLikes);
    $popularitySectionLeft.appendChild($icon);
    $popularitySection.appendChild($popularitySectionLeft);
    $popularitySection.appendChild($popularitySectionRight);

    $popularitySectionRight.textContent = `${price}€ / jour`;

    // Calculer la somme des likes
    const totalLikes = photographerMedia.reduce(
      (sum, media) => sum + media.likes,
      0
    );

    $totalLikes.textContent = `${totalLikes}`;
    $icon.innerHTML = ` <i class="fa-solid fa-heart"></i> `;
    document.body.appendChild($popularitySection);

    return $template;
  }
  return { getUserCardHeader };
}
