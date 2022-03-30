//affiche le nombre total de likes dans le cadre du bas
function displayTotalLikes(totalLikes){
    document.querySelector(".photographerLikes").setAttribute("aria-label","nombre total de likes du photographe");
    document.querySelector(".photographerLikes").innerHTML=totalLikes+' <i class="fa-solid fa-heart"></i>';
}

//incrémente les likes au clic sur les coeurs
function manageLikes(totalLikes,photographerMedia,mediaDirectory){ 
    const hearts=Array.from(document.getElementsByClassName("fa-heart"));
    hearts.forEach(heart => {
        heart.addEventListener("click",()=>{
            var mediaLikes=heart.parentElement.previousElementSibling.textContent;
            mediaLikes=parseInt(mediaLikes,10);
            mediaLikes++;//ajoute un like sur le média
            totalLikes++;//ajoute un like au nombre total de like du photographe
            addLikeInPhotographerMedia(photographerMedia,mediaLikes,heart.id);
            displayMedia(photographerMedia,mediaDirectory);
            displayTotalLikes(totalLikes);
        })
        //liker au clavier avec entrer
        heart.addEventListener("keyup", (e)=>{
            if (e.keyCode === 13) {
             e.preventDefault();
             heart.click();
            }
          });
    })
}

//à l'ajout d'un like sur un média, met le tableau photographerMedia à jour et passe le coeur en rouge plein
function addLikeInPhotographerMedia(photographerMedia,mediaLikes,title){
    let media=findObjectByKey(photographerMedia,"title",title);
    media.likes=mediaLikes;
    media.liked="fas fa-heart";
    return photographerMedia
}


function findObjectByKey(array, key, value) {
    for (var i = 0; i < array.length; i++) {
        if (array[i][key] === value) {
            return array[i];
        }
    }
    return null;
}