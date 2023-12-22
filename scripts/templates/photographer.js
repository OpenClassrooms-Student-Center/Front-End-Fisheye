function photographerTemplate(data) {
  const { name, portrait, id, city, country, tagline, price } = data;

  const picture = `assets/photographers/${portrait}`;

  const portraitPhotographer = `<img src="${picture}" alt ="${tagline}" >`;
  const namePhotographer = `<h2>${name}</h2>`;
  const cityName = `<h3>${city}, ${country}</h3>`;
  const taglineText = `<p class ="taglineText">${tagline}</p>`;
  const priceTag = `<p class = "priceTag">${price}€/jours</p>`;
  return `
   <article id="photographer_article" data-photographeid="${id}">
    ${portraitPhotographer}
    ${namePhotographer}
    ${cityName}
    ${taglineText}
    ${priceTag}
    </article>`;
}

function photographerTemplateId(data) {
  const { name, portrait, city, country, tagline } = data;

  const picture = `assets/photographers/${portrait}`;

  const portraitPhotographer = `<img src="${picture}" alt ="${tagline}" >`;
  const namePhotographer = `<h2>${name}</h2>`;
  const cityName = `<h3>${city}, ${country}</h3>`;
  const taglineText = `<p class ="taglineText">${tagline}</p>`;

  return `
   <div class="header-container">
<div class="header-text">
${namePhotographer}
${cityName}
${taglineText}

</div>
  <button class="contact_button" id="contact_btn">Contactez-moi</button>
    ${portraitPhotographer}
    </div>`;
}

function createMediaElement(media, photographerName) {
  if (!media.image && !media.video) {
    console.error("Undefined media type");
    return;
  }

  const mediaPath = media.image
    ? `assets/images/${photographerName}/${media.image}`
    : `assets/images/${photographerName}/${media.video}`;

  const altContent = media.title || "";
  const mediaElement = media.image
    ? `<img class="media-element" data-mediaId=${media.id} src="${mediaPath}" alt ="${altContent}">`
    : `<div><video controls class ="media-element" data-mediaId=${media.id} src="${mediaPath}"></div>`;
  const mediaInfo = `
    <div class="media-info">
      <p class="media-title">${media.title}</p>
      <div class="likes-container">
        <p class="media-likes">${media.likes}</p>
        <i class="fa-solid fa-heart heart-icon"></i>
      </div>
    </div>
  `;

  return `
  <div class="media-container">
  ${mediaElement}
  ${mediaInfo}
  </div>
  `;
}

export { photographerTemplateId, photographerTemplate, createMediaElement };
