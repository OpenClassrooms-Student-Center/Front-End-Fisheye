///////////////////////////////////Imports

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
  article.classList.add("media-article");

  const mediaFactory = new Media(media, photographer);
  const mediaType = mediaFactory.getMediaCardDom();

  const divDescription = document.createElement("div");
  divDescription.classList.add("media-description");

  const titleElement = document.createElement("p");
  titleElement.innerText = title;
  titleElement.classList.add("media-title");

  const divLikes = document.createElement("div");
  divLikes.classList.add("likes-container");

  const likesElement = document.createElement("p");
  likesElement.innerText = likes;
  likesElement.classList.add("likes");

  //////////SVG LIKE ICON - like that we can change the fill opacity in CSS

  const likeIconSvgString = `
<svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
  <path d="M8.59173 16.6835L8.59106 16.6828C6.32899 14.3385 4.48837 12.4301 3.20738 10.6403C1.93332 8.86007 1.25 7.24634 1.25 5.5C1.25 2.63134 3.20427 0.5 5.5625 0.5C6.90697 0.5 8.22698 1.21835 9.09906 2.38875L9.5 2.92683L9.90094 2.38875C10.773 1.21835 12.093 0.5 13.4375 0.5C15.7957 0.5 17.75 2.63134 17.75 5.5C17.75 7.24634 17.0667 8.8601 15.7925 10.6416C14.5135 12.43 12.6766 14.3378 10.4193 16.6821L10.4096 16.6921L10.4086 16.6932L9.50137 17.6299L8.59173 16.6835Z" fill="#901C1C" fill-opacity="0" stroke="#901C1C"/>
</svg>
`;

  const parser = new DOMParser();
  const likesIconParsed = parser.parseFromString(
    likeIconSvgString,
    "image/svg+xml"
  );
  const svgElement = likesIconParsed.documentElement;
  svgElement.setAttribute("alt", "j'aimes");
  svgElement.classList.add("likes-icon");

  article.appendChild(mediaType);
  article.appendChild(divDescription);
  divDescription.appendChild(titleElement);
  divDescription.appendChild(divLikes);
  divLikes.appendChild(likesElement);
  divLikes.appendChild(svgElement);

  return article;
}
