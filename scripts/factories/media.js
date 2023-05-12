export function mediaFactory(media) {
  const { id, date, image, video, likes, photographerId, price, title} = media

  const picture = `assets/photographers/${photographerId}/${title}`;

  function getMediaCardDom() {
    const article = document.createElement( 'article' );
    article.className += "media";
    article.id = id;

    // const mediaLink = document.createElement("a");
    // mediaLink.setAttribute("href", `/photographer.html?id=${id}`);
    // mediaLink.setAttribute("aria-label", `lien vers le portfolio de ${name}`);
    // mediaLink.className += "photographer__link"

    const photographerImg = document.createElement("img");
    photographerImg.setAttribute("src", picture);
    photographerImg.setAttribute("alt", title);
    photographerImg.className += "photographer__img";


  }
}
