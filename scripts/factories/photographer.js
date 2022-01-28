function photographerFactory(data) {
  const { name, portrait, city, country, tagline, price, id } = data;

  const picture = `assets/photographers/${portrait}`;
  //Création des cards de chaque photographe
  function getUserCardDOM() {
    //Création de la balise article
    const article = document.createElement("article");

    //Création de la balise image
    const img = document.createElement("img");
    img.setAttribute("src", picture);

    //Création de la balise h2
    const h2 = document.createElement("h2");
    h2.textContent = name;

    //Création de la balise p
    const adresse = document.createElement("p");
    adresse.textContent = `${city}, ${country}`;
    adresse.classList.add("adresse");

    //Création de la balise p
    const tag = document.createElement("p");
    tag.textContent = tagline;
    tag.classList.add("tagline");

    //Création de la balise p
    const priceTag = document.createElement("p");
    priceTag.textContent = `${price} €/jours`;
    priceTag.classList.add("price");

    //Création du lien vers la page de profil
    const link = document.createElement("a");
    link.setAttribute("href", "photographer.html?id=" + id);

    //Je crée un lien qui va me permettre de faire apparaître la page de profil
    article.appendChild(link);
    link.appendChild(img);
    link.appendChild(h2);
    article.appendChild(adresse);
    article.appendChild(tag);
    article.appendChild(priceTag);
    return article;
  }

  //Fonction qui retourne le DOM de la page de profil
  function getUserDetail() {
    //Création de la balise article
    const article = document.createElement("article");
    const divGauche = document.createElement("div");
    const divDroite = document.createElement("div");
    const divCentre = document.createElement("div");
    //Création de la balise h2
    const h2 = document.createElement("h2");
    h2.textContent = name;

    //Création de la balise p
    const adresse = document.createElement("p");
    adresse.textContent = `${city}, ${country}`;
    adresse.classList.add("adresse");

    //Création de la balise p
    const tag = document.createElement("p");
    tag.textContent = tagline;
    tag.classList.add("tagline");

    //Création de la balise bouton
    const button = document.createElement("button");
    button.textContent = "Contactez moi";
    button.classList.add("contact_button");
    button.setAttribute("type", "button");
    button.setAttribute("onclick", "displayModal()");

    //Création de la balise image
    const img = document.createElement("img");
    img.setAttribute("src", picture);

    //Je crée un lien qui va me permettre de faire apparaître la page de profil
    article.appendChild(divGauche);
    article.appendChild(divCentre);
    article.appendChild(divDroite);
    divGauche.appendChild(h2);
    divGauche.appendChild(adresse);
    divGauche.appendChild(tag);
    divCentre.appendChild(button);
    divDroite.appendChild(img);
    return article;
  }
  return {
    name,
    picture,
    city,
    country,
    tagline,
    price,
    id,
    getUserCardDOM,
    getUserDetail,
  };
}

function mediaFactory(media, photographers) {
  const { title, image, video, likes, date, price } = media;
  let { name } = photographers[0];
  name = name.split(" ")[0].replace("-", " ");
  const imageSrc = `assets/${name}/${image}`;
  const videoSrc = `assets/${name}/${video}`;
  console.log(imageSrc);
  console.log(videoSrc);

  function getMediaCardDom() {
    //Création de la balise article
    const article = document.createElement("article");

    //Création de la balise image
    let img = {};
    if (image) {
      img = document.createElement("img");
      img.setAttribute("src", imageSrc);
    } else {
      img = document.createElement("video");
      img.setAttribute("src", videoSrc);
      // img.setAttribute("controls", "controls");
    }

    //Création de la balise h2
    const h2 = document.createElement("h2");
    h2.textContent = title;

    //Création de la balise p
    const likeTag = document.createElement("p");
    likeTag.textContent = likes;
    likeTag.classList.add("likes");

    const imageLike = document.createElement("img");
    imageLike.setAttribute("src", "assets/img/heart-solid.svg");
    //Je crée un lien qui va me permettre de faire apparaître la page de profil
    article.appendChild(img);
    return article;
  }
  return {
    title,
    image,
    video,
    likes,
    date,
    price,
    imageSrc,
    videoSrc,
    getMediaCardDom,
  };
}
