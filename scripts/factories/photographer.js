/* fonction photographerFactory pr la data */
function photographerFactory(data) {
  const { name, portrait, city, country, id, price, tagline } = data;
  console.log(data);

  const picture = `assets/photographers/${portrait}`;

  /* fonction pr les infos du photographe en header */
  function getPhotographerProfileHeader() {
    const photographerInfos = document.createElement("div");

    photographerInfos.innerHTML = `
    <h1>${name}</h1>
    <h2 class="location">${city}, ${country}</h2>
    <p class="tagline">${tagline}</p>`;

    return photographerInfos;
  }

  /* fonction pr les imhg et leurs infos */
  function getPhotographerProfileCard() {
    const article = document.createElement("article");

    article.innerHTML = `
    <img src="${picture}" alt="Portrait de ${name}"/>
    <h2>${name}</h2>
    <p class="location">${city}, ${country}</p>
    <p class="resume">${tagline}</p>
    <p class="dailyRate">${price}€/jour</p>`;

    return article;
  }

  return {
    name,
    picture,
    location,
    tagline,
    getPhotographerProfileHeader,
    getPhotographerProfileCard,
  };
}
