function photographerTemplate(data) {
  const { name, portrait, id, city, country, tagline, price } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement("article");
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    const h2 = document.createElement("h2");
    h2.textContent = name;
    const cityName = document.createElement("h3");
    cityName.textContent = city + ", " + country;
    const taglineText = document.createElement("p");
    taglineText.classList.add("taglineText");
    taglineText.textContent = tagline;
    const priceTag = document.createElement("p");
    priceTag.classList.add("priceTag");
    priceTag.textContent = price + "€/jours";

    article.appendChild(img);
    article.appendChild(h2);
    article.appendChild(cityName);
    article.appendChild(taglineText);
    article.appendChild(priceTag);
    return article;
  }
  return { name, picture, getUserCardDOM };
}

function photographerTemplateId(data) {
  const { name, portrait, id, city, country, tagline } = data;

  const picture = `assets/photographers/${portrait}`;

  function getHeaderInfo() {
    const headerContainer = document.createElement("div");
    headerContainer.classList.add("header-container");
    const headerText = document.createElement("div");
    headerText.classList.add("header-text");
    const h2 = document.createElement("h2");
    h2.textContent = name;
    const cityName = document.createElement("h3");
    cityName.textContent = city + ", " + country;
    const taglineText = document.createElement("p");
    taglineText.classList.add("taglineText");
    taglineText.textContent = tagline;

    const contactBtn = document.getElementById("contact_btn");
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.classList.add("portrait_photographe");

    headerContainer.appendChild(headerText);
    headerText.appendChild(h2);
    headerText.appendChild(cityName);
    headerText.appendChild(taglineText);
    headerContainer.appendChild(contactBtn);
    headerContainer.appendChild(img);
    return headerContainer;
  }
  return { name, picture, getHeaderInfo };
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
    ? `<img class="media-element" src="${mediaPath}" alt ="${altContent}">`
    : `<video controls class ="media-element" src="${mediaPath}" alt ="${altContent}">`;
  console.log(mediaElement);
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
