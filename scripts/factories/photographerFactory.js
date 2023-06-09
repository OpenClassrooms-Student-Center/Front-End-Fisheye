function photographerFactory(data) {
  const { id, name, portrait, city, country, tagline, price } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement("article");
    const img = document.createElement("img");
    const h2 = document.createElement("h2");
    const h3 = document.createElement("h3");
    const paragraph = document.createElement("p");
    const h5 = document.createElement("h5");

    img.setAttribute("src", picture);
    img.setAttribute("alt", `Photo du photographe`);
    img.setAttribute("aria-label", `Photo du photographe ${name}`);
    h2.setAttribute("aria-label", "Nom du photographe");
    h2.setAttribute("aria-label", "Adresse du photographe");
    paragraph.setAttribute("aria-label", "Citation du photographe");
    h5.setAttribute("aria-label", "Le prix journalier du photographe");

    h2.textContent = name;
    h3.textContent = `${city}, ${country}`;
    paragraph.textContent = tagline;
    h5.textContent = `${price} €/jour`;

    article.appendChild(img);
    article.appendChild(h2);
    article.appendChild(h3);
    article.appendChild(paragraph);
    article.appendChild(h5);

    article.addEventListener("click", () => {
      photographerUrl(id);
    });

    return article;
  }

  // function qui affichera la page d'un seul photographe (id)
  function getUserDetailDOM() {
    const header = document.querySelector(".photograph-header");
    const card = document.querySelector(".card-info");
    const formHeader = document.querySelector(".contact-name");
    const div = document.createElement("div");
    const h1 = document.createElement("h1");
    const h2 = document.createElement("h2");
    const pTagline = document.createElement("p");
    const pInfo = document.createElement("p");
    const img = document.createElement("img");

    img.setAttribute("src", picture);
    h1.setAttribute("aria-label", "Nom du photographe");
    h1.setAttribute("data-name", `${name}`);

    h1.textContent = name;
    h2.textContent = `${city}, ${country}`;
    pTagline.textContent = tagline;
    img.textContent;
    pInfo.textContent = `${price}€ / jour`;
    formHeader.innerHTML += ` ${name}`;

    div.appendChild(h1);
    div.appendChild(h2);
    div.appendChild(pTagline);
    header.appendChild(img);

    header.prepend(div);
    
    card.appendChild(pInfo);
  }

  return { getUserCardDOM, getUserDetailDOM };
}
