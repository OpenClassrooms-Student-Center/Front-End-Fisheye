function photographerFactory(data) {
  const { name, portrait, city, country, tagline, price, description, id } = data;
  const picture = `assets/photographers/${portrait}`;

  // card creation
  function getUserCardDOM() {
    // create different elements in the DOM
    const card = document.createElement("article");
    card.setAttribute("class", "mainArticle");
    const personalSection = document.createElement("section");
    personalSection.setAttribute("tabindex", "0");
    personalSection.setAttribute("role", "region");
    personalSection.setAttribute("id", id);
    personalSection.setAttribute("class", "frame");
    const link = document.createElement("a");

    // const target = "photographer.html?id=" + id;
    let target = new URL("photographer.html", window.location.origin);
    let params = target.searchParams;
    // add "topic" parameter id
    params.set("id", id);
    link.setAttribute("href", target);
    link.setAttribute("aria-label", name);

    const image = document.createElement("img");
    image.setAttribute("src", picture);
    image.setAttribute("alt", description);
    const h2 = document.createElement("h2");
    h2.textContent = name;
    const h4 = document.createElement("h4");
    h4.textContent = `${city}, ${country}`;
    const p1 = document.createElement("p");
    p1.textContent = tagline;
    const personalInfo = document.createElement("section");
    personalInfo.setAttribute("tabindex", "0");
    personalInfo.setAttribute("role", "region");
    personalInfo.setAttribute("aria-labelledby", "photographer information");
    personalInfo.setAttribute("id", "personalInfo");
    const p2 = document.createElement("p");
    p2.textContent = `${price}€/jour`;
    p2.setAttribute("id", "price");
    // attach elements to their parents after craetion in the DOM
    card.appendChild(personalSection);
    personalSection.appendChild(link);
    link.appendChild(image);
    card.appendChild(personalInfo);
    personalInfo.appendChild(h2);
    personalInfo.appendChild(h4);
    personalInfo.appendChild(p1);
    personalInfo.appendChild(p2);
    return card;
  }
  return { getUserCardDOM };
}
