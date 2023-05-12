export function mediaFactory(media) {
  const { id, date, image, video, likes, photographerId, price, title} = media

  function getMediaCardDom() {
    const article = document.createElement( 'article' );
    article.className += "media";
    article.id = id;

    const mediaLink = document.createElement("a");
    mediaLink.setAttribute("href", `/photographer.html?id=${id}`);
    mediaLink.setAttribute("aria-label", `lien vers le portfolio de ${name}`);
    mediaLink.className += "photographer__link"




  }
}
