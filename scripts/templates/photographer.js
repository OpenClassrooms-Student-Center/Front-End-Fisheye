///////////////////////////////////Imports

import { getDataPhotographers } from "../pages/photographer.js";
import { Media } from "./mediaFactory.js";

///////////////////////////////////Template photographers for index.html

export function photographerTemplate(photographers) {
  // Datas JSON
  const { name, id, city, country, tagline, price, portrait } = photographers;
  const picture = `assets/photographers/${portrait}`;

  //HTML creation
  function getUserCardDOM() {
    const article = document.createElement("article");

    const linkPagePhotographer = document.createElement("a");
    linkPagePhotographer.setAttribute(
      "href",
      "/photographer.html?id=" + `${id}`
    );
    linkPagePhotographer.setAttribute(
      "title",
      "Voir le profil de " + `${name}`
    );

    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", "");
    img.className = "photograph-photo";

    const h2 = document.createElement("h2");
    h2.textContent = photographers.name;
    h2.className = "photograph-name";

    const location = document.createElement("p");
    location.textContent = `${photographers.city}, ${photographers.country}`;
    location.className = "photograph-location";

    const taglineElement = document.createElement("p");
    taglineElement.textContent = photographers.tagline;
    taglineElement.className = "photograph-tagline";

    const priceElement = document.createElement("p");
    priceElement.textContent = `${photographers.price}€/jour`;
    priceElement.className = "photograph-price";

    article.appendChild(linkPagePhotographer);
    linkPagePhotographer.appendChild(img);
    linkPagePhotographer.appendChild(h2);
    article.appendChild(location);
    article.appendChild(taglineElement);
    article.appendChild(priceElement);

    return article;
  }
  return {
    name,
    id,
    city,
    country,
    tagline,
    price,
    picture,
    getUserCardDOM,
  };
}

///////////////////////////////////Displays and template for photographer header

export function photographInfoTemplate(dataPhotographers) {
  const { name, city, country, tagline } = dataPhotographers;

  function getUserInfoDOM() {
    const article = document.createElement("article");
    const h1 = document.createElement("h1");
    const location = document.createElement("p");
    const taglineElement = document.createElement("p");

    h1.innerText = name;
    h1.className = "photograph-name";

    location.textContent = `${dataPhotographers.city}, ${dataPhotographers.country}`;
    location.className = "photograph-location";

    taglineElement.innerText = tagline;
    taglineElement.className = "photograph-tagline";

    article.appendChild(h1);
    article.appendChild(location);
    article.appendChild(taglineElement);
    return article;
  }
  return {
    name,
    city,
    country,
    tagline,
    getUserInfoDOM,
  };
}

export function photographPicture(dataPhotographers) {
  const { portrait } = dataPhotographers;
  const picture = `assets/photographers/${portrait}`;

  function getUserPicture() {
    const container = document.createElement("div");
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", "");

    container.appendChild(img);

    return container;
  }
  return { picture, getUserPicture };
}

///////////////////////////////////Medias display and template

export function mediasTemplate(photographer, media) {
  const { title, likes } = media;

  const article = document.createElement("article");

  const mediaFactory = new Media(media, photographer);
  const mediaType = mediaFactory.getMediaCardDom();

  const likeIconMedia = "../../assets/icons/like-icon.png";

  const divDescription = document.createElement("div");

  const titleElement = document.createElement("h2");
  titleElement.innerText = title;

  const likesElement = document.createElement("p");
  likesElement.innerText = likes;

  const likesIcon = document.createElement("img");
  likesIcon.setAttribute("src", likeIconMedia);
  likesIcon.setAttribute("alt", "j'aimes");

  article.appendChild(mediaType);
  article.appendChild(divDescription);
  divDescription.appendChild(titleElement);
  divDescription.appendChild(likesElement);
  divDescription.appendChild(likesIcon);

  return { article };
}

///////// Function to get the first name of each photographers and displaying it correctly in the factory
export async function getPhotographersMedia(photographerIdentity) {
  const { photographers } = await getDataPhotographers();
  const { id } = photographerIdentity;

  for (let i = 0; i < photographers.length; i++) {
    if (photographers[i].id == id) {
      photographerIdentity = photographers[i];
    }
  }

  const firstName = photographers.name.split(" ")[0];
  return firstName;
}
