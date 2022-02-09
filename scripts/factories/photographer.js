function photographerFactory(data, mediaAll) {
  const { name, portrait, city, country, tagline, price, id, likes } = data;
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
    priceTag.textContent = `${price}€/jours`;
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
  function getUserLikes() {
    let numLikes = new Number();
    mediaAll.forEach((media) => {
      numLikes += media.likes;
    });
    const countLikes = document.createElement("div");
    countLikes.classList.add("countLikes");
    const divGauche = document.createElement("div");
    const divDroite = document.createElement("div");

    const span = document.createElement("span");
    span.textContent = numLikes;

    const i = document.createElement("i");
    i.classList.add("fas");
    i.classList.add("fa-heart");

    const p = document.createElement("p");
    p.textContent = price + "€ / jour";

    countLikes.appendChild(divGauche);
    countLikes.appendChild(divDroite);
    divGauche.appendChild(span);
    divGauche.appendChild(i);
    divDroite.appendChild(p);

    return countLikes;
  }

  return {
    name,
    picture,
    city,
    country,
    tagline,
    price,
    id,
    likes,
    getUserCardDOM,
    getUserDetail,
    getUserLikes,
  };
}

//Fonction pour afficher les médias
function mediaFactory(media, photographers) {
  const { title, image, video, likes, date, price, id } = media;
  let { name } = photographers[0];
  name = name.split(" ")[0].replace("-", " ");
  let type = "";
  let source = "";
  if (image) {
    type = "image";
    source = `assets/${name}/${image}`;
  } else {
    type = "video";
    source = `assets/${name}/${video}`;
  }
  //Création des card de chaque média
  function getMediaCardDom() {
    //Création de la balise article
    const article = document.createElement("article");

    //Création de la balise image
    let thumbnail = {};
    type == "image"
      ? (thumbnail = document.createElement("img"))
      : (thumbnail = document.createElement("video"));
    thumbnail.setAttribute("src", source);
    thumbnail.addEventListener("click", () => {
      showLightbox(title, source, type, id);
    });

    const desc = document.createElement("div");

    //Création de la balise h2
    const h2 = document.createElement("h2");
    h2.textContent = title;

    const divLikes = document.createElement("div");
    divLikes.classList.add("likes");

    //Création de la balise p
    const likeTag = document.createElement("p");
    likeTag.textContent = likes;

    const imageLike = document.createElement("i");
    imageLike.classList.add("far");
    imageLike.classList.add("fa-heart");

    //Je crée un lien qui va me permettre de faire apparaître la page de profil
    article.appendChild(thumbnail);
    article.appendChild(desc);
    desc.appendChild(h2);
    desc.appendChild(divLikes);
    divLikes.appendChild(likeTag);
    divLikes.appendChild(imageLike);
    divLikes.addEventListener("click", () => {
      addLikes(likeTag, imageLike);
    });

    return article;
  }
  return {
    title,
    image,
    video,
    likes,
    date,
    price,
    type,
    source,
    id,
    getMediaCardDom,
  };
}
//Fonction qui permet d'incrémenter et de décrémenter le nombre de likes
function addLikes(likeTag, imageLike) {
  if (imageLike.classList.contains("far")) {
    likeTag.textContent++;
    document.querySelector(".countLikes span").textContent++;
    imageLike.classList.replace("far", "fas");
    return true;
  }
  {
    likeTag.textContent--;
    document.querySelector(".countLikes span").textContent--;
    imageLike.classList.replace("fas", "far");
    return false;
  }
}
