function photographerProfileTemplate(data) {
  const { name, city, country, tagline, price, portrait } = data;
  const picture = `assets/photographers/${portrait}`;

  function getUserCardHeader(photographerMedia) {
    const template = `
        <article class="photograph-header">
          <div class="column">
            <h1>${name}</h1>
            <p class="location">${city}, ${country}</p>
            <p class="tagline">${tagline}</p>
          </div>
          <div class="column">
            <button class="contact_button" onclick="displayModal('contact_modal')" aria-label="Contactez-moi">
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
    const $totalLikes = document.createElement("span");
    const $dailyPrice = document.createElement("span");
    $popularitySection.classList.add("popularity-section");
    $popularitySection.appendChild($totalLikes);
    $popularitySection.appendChild($dailyPrice);
    $dailyPrice.textContent = `${price}€ / jour`;

    // Calculer la somme des likes
    const totalLikes = photographerMedia.reduce(
      (sum, media) => sum + media.likes,
      0
    );

    $totalLikes.innerHTML = `${totalLikes} <i class="fa-solid fa-heart"></i> `;
    document.body.appendChild($popularitySection);

    return $template;
  }
  return { getUserCardHeader };
}
