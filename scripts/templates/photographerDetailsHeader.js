function photographerDetailsHeader(data) {
  const { name, city, country, tagline, price, portrait } = data;
  const picture = `assets/photographers/${portrait}`;

  const template = `
      <article class="photograph-header">
        <div class="column">
          <h1>${name}</h1>
          <p class="location">${city}, ${country}</p>
          <p class="tagline">${tagline}</p>
        </div>
        <div class="column">
          <button class="contact_button" onclick="displayModal()" aria-label="Contact Me">
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
  const $priceFixed = document.createElement("div");
  $priceFixed.classList.add("price-fixed");
  $priceFixed.textContent = `${price}€ / jour`;
  document.body.appendChild($priceFixed);

  return $template;
}
