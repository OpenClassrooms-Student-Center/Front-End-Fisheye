function photographerFactory(data) {
  const { name, portrait, city, country, id, price, tagline } = data;
  console.log(data);

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement("article");
    const img = document.createElement("img");

    img.setAttribute("src", picture);
    img.setAttribute("alt", `Portrait de ${name}`);

    const h2 = document.createElement("h2");
    h2.textContent = name;

    const location = document.createElement("p");
    location.classList.add("location");
    location.textContent = `${city}, ${country}`;

    const resume = document.createElement("p");
    resume.classList.add("resume");
    resume.textContent = tagline;

    const dailyRate = document.createElement("p");
    dailyRate.classList.add("dailyRate");
    dailyRate.textContent = `${price}€/jour`;

    article.appendChild(img);
    article.appendChild(h2);
    article.appendChild(location);
    article.appendChild(resume);
    article.appendChild(dailyRate);

    return article;
  }

  function getPhotographerInfoDOM() {
    const photographerName = document.createElement("h1");
    photographerName.textContent = name;

    const photographerLocation = document.createElement("h2");
    photographerLocation.textContent = `${city}, ${country}`;
    photographerLocation.classList.add("location");

    const photographerTagline = document.createElement("p");
    photographerTagline.textContent = tagline;
    photographerTagline.classList.add("tagline");

    const photographerInfos = document.createElement("div");

    photographerInfos.appendChild(photographerName);
    photographerInfos.appendChild(photographerLocation);
    photographerInfos.appendChild(photographerTagline);

    return photographerInfos;
  }

  return {
    name,
    picture,
    location,
    tagline,
    getUserCardDOM,
    getPhotographerInfoDOM,
  };
}
