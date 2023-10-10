export function mediaFactory({
    title, image, id, likes, video, name, picture
}){

    const getMediasCardDOM = ()=>{
        const card = document.createElement("article")
        const name = /^\w+/; // permets de supprimé le nom de famille de name du fichier json
    
    let picture, mediaHtml;
    if (image?.endsWith(".jpg")) {
      picture = `assets/images/${name}/${image}`;
      mediaHtml = `<img lightbox-media=${title} src="${picture}" alt="${title}" tabIndex="0" />`;
    } else if (video?.endsWith(".mp4")) {
      picture = `assets/images/${name}/${video}`;
      mediaHtml = `<video lightbox-media=${title} src="${picture}" tabIndex="0"></video>`;
    }
        card.innerHTML = `
        <div class="card" id="card" >
          ${mediaHtml}
          <div class="containerInfos" >
            <h2>${title}</h2>
            <div class="containerLikes_i">
             <span class="totalLikes" id="like-${id}">${likes}</span>
             <i id="heart-${id}" class="fa-solid fa-heart heart" aria-label="likes" tabIndex="0"></i>
            </div>
          </div>
        </div>
      `;
      containerCards.append(card);
      const heartId = document.getElementById(`heart-${id}`);
      const likeClass = document.getElementById(`like-${id}`);
  
      heartId.addEventListener("click", () => {
       const totalLikesElement = document.getElementById("total-likes");
        if (likeClass.classList.contains("likes")) {
          // Si l'élément a déjà été "aimé", supprimez le like
          likeClass.classList.remove("likes");
          likes -= 1;
          totalLikesElement.innerText = this.totalLikes -=1
        } else {
          // Sinon, ajoutez un like
          likeClass.classList.add("likes");
          likes += 1;
          totalLikesElement.innerText = this.totalLikes +=1
        }
        // Mettez à jour le texte de l'élément HTML avec le total des likes
        likeClass.innerText = likes;
      });
      return card 
    }
    return {name, picture, getMediasCardDOM}
}