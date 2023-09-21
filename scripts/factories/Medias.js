export class Insertmedias{
async getMedias (media, photographer) {
    const containerCards = document.getElementById("containerCards")
    const card = document.createElement("div")
    let {title, image, id, likes, video} = media
    const regexName = /^\w+/; // permets de supprimé le nom de famille de name du fichier json
  const result = await photographer.name.match(regexName)[0]
  let picture, mediaHtml;
  if (image?.endsWith(".jpg")) {
    picture = `assets/images/${result}/${image}`;
    mediaHtml = `<img src="${picture}" alt="${title}" tabIndex="0" />`;
  } else if (video?.endsWith(".mp4")) {
    picture = `assets/images/${result}/${video}`;
    mediaHtml = `<video controls src="${picture}" tabIndex="0"></video>`;
  }
  card.innerHTML = `
  <div class="card" id="card" >
    ${mediaHtml}
    <div class="containerInfos" >
      <h2>${title}</h2>
      <div class="containerLikes_i">
       <span class="like" id="like-${id}">${likes}</span>
       <i id="heart-${id}" class="fa-solid fa-heart heart" aria-label="likes" tabIndex="0"></i>
      </div>
    </div>
  </div>
`;
  containerCards.append(card);
  }
}