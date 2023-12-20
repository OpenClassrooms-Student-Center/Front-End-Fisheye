// sets  data properties  and generates photographer cardDom
export default function photographerTemplate(data) {
  const { name, id, city, country, tagline, price, portrait } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement("article");
    article.setAttribute(`aria-label`, ` ${name}`);
    const photographerA = document.createElement("a");
    photographerA.setAttribute("class", "link");
    photographerA.setAttribute(`aria-label`, `lien vers la page de ${name}`);
    photographerA.setAttribute("href", `photographer.html?id=${id}`);
    const portraitImg = document.createElement("img");
    portraitImg.setAttribute("src", picture);
    portraitImg.setAttribute(`alt`, `photo de ${name}`);
    portraitImg.setAttribute("class", "portrait");
    portraitImg.setAttribute("role", "img");

    const NameH2 = document.createElement("h2");
    NameH2.setAttribute("class", "name");
    NameH2.textContent = name;
    const infoSection = document.createElement("section");
    infoSection.setAttribute("class", "info");

    const localisationP = document.createElement("p");
    localisationP.setAttribute("class", "localisation");
    localisationP.textContent = `${city}, ${country}`;

    const tagP = document.createElement("p");
    tagP.setAttribute("class", "tag");
    tagP.textContent = tagline;
    const prixP = document.createElement("p");
    prixP.setAttribute("class", "price");
    prixP.textContent = `${price}€/jour`;
    // creating p

    infoSection.appendChild(localisationP);
    infoSection.appendChild(tagP);
    infoSection.appendChild(prixP);

    article.appendChild(portraitImg);
    article.appendChild(NameH2);
    article.appendChild(infoSection);
    photographerA.appendChild(article);

    return photographerA;
  }
  return { name, picture, getUserCardDOM };
}
