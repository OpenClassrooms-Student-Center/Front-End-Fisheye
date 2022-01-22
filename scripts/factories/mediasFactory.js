// FONCTION POUR AFFICHER LES MEDIAS DU PHOTOGRAPHE
function mediasFactory(data) {
    const { image, video, title, likes } = data;
    
    let mediaImage = `assets/medias/${image}`;
    let mediaVideo = `assets/medias/${video}`;

    function getMediasCardDOM() {

        const figure = document.createElement('article');
                figure.style.marginBottom = "40px";
                figure.style.width = "350px";

        const img = document.createElement('img');
            img.setAttribute("src", mediaImage);
            img.style.width = "350px";
            img.style.height = "300px";
            img.style.objectFit = "cover";
            img.style.cursor = "pointer";
            img.classList.add("photo"); 

        const mediaCaption = document.createElement('div');
            mediaCaption.style.display = "flex";
            mediaCaption.style.justifyContent = "space-between";

        const mediaTitle = document.createElement('p');
            mediaTitle.textContent = title;
            mediaTitle.style.fontSize = "20px";
            mediaTitle.style.color = "#901C1C";

        const mediaLike = document.createElement('p');
            mediaLike.innerHTML = likes + '<i class="fas fa-heart"></i>';
            mediaLike.style.fontSize = "20px";
            mediaLike.style.color = "#901C1C";

            if(video != undefined) {
                const vid = document.createElement('video');
                vid.setAttribute("src", mediaVideo);
                vid.className = 'vid';
                vid.style.width = "350px";
                vid.style.height = "300px";
                figure.appendChild(vid);
                vid.style.objectFit = "cover";
                vid.style.cursor = "pointer";

                /*
                vid.addEventListener("click", () => {
                    const lightbox = document.querySelector(".lightbox");
                    const container = document.querySelector(".container");
                    lightbox.style.display = "block";
                    container.appendChild(vid);
                    vid.style.width = "100%";
                    vid.style.height ="100%"; 
                    vid.style.margin = "auto";
                    vid.classList.add("selected");
                }); */
            };
    
        figure.appendChild(img);
        figure.appendChild(mediaCaption);
        mediaCaption.appendChild(mediaTitle);
        mediaCaption.appendChild(mediaLike);

        return (figure);
    }

    return { image, video, title, likes, getMediasCardDOM }
}





