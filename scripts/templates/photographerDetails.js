function photographerDetailTemplate(data) {
    console.log("data",data);
    const { name, city, country, tagline, picture } = data;
  
    const template = `
      <div class="photograph-header">
        <!-- Left Column -->
        <div class="column">
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
          <img class="photographer-image" src="${picture}" alt="${name}'s portrait">
        </div>
      </div>
    `;
  
    const $template = document.createElement("div");
    $template.innerHTML = template;

    return $template;
}
