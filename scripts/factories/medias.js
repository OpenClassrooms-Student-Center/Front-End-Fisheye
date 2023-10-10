export function mediaFactory({
     name, portrait
}){
    const picture = `../assets/photographers/${portrait}`;
    const getMediasCardDOM = ()=>{
        const containerCards = document.getElementById("containerCards");
             const card = document.createElement("div");
             let { title, image, id, likes, video } = media;
           const regexName = /^\w+/; // permets de supprimé le nom de famille de name du fichier json
         const result = photographer.name.match(regexName)[0];
             let picture, mediaHtml;
            if (image?.endsWith(".jpg")) {
               picture = `assets/images/${result}/${image}`;
               picture = `assets/images/${result}/${image}`;
               mediaHtml = `<img lightbox-media=${title} src="${picture}" alt="${title}" tabIndex="0" />`;
             } else if (video?.endsWith(".mp4")) {
               picture = `assets/images/${result}/${video}`;
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