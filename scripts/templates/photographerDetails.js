function photographerDetailTemplate(data) {
  const { name, city, country, tagline, portrait } = data;
  const picture = `assets/photographers/${portrait}`;

  const template = `
      <article class="photograph-header">
        <!-- Left Column -->
        <div class="column">
          <h2>${name}</h2>
          <p class="location">${city}, ${country}</p>
          <p class="tagline">${tagline}</p>
        </div>
        <!-- Center Column -->
        <div class="column">
          <button class="contact_button" onclick="displayModal()">
            Contactez-moi
          </button>
        </div>
        <!-- Right Column -->
        <div class="column">
          <img class="photographer-image" src="${picture}" alt="${name}">
        </div>
      </article>
    `;

  const $template = document.createElement("div");
  $template.innerHTML = template;

  return $template;
}
