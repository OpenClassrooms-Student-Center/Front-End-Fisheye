// FONCTION POUR AFFICHER LES MEDIAS DU PHOTOGRAPHE
function mediasFactory(data) {
    const { image, video, title, likes, id } = data;
    
    let mediaImage = `assets/medias/${image}`;
    let mediaVideo = `assets/medias/${video}`;

    function getMediasCardDOM() {

        const figure = document.createElement('article');
                figure.style.marginBottom = "40px";
                figure.style.width = "350px";

        const mediaLink = document.createElement('a');
            mediaLink.style.width = "350px";
            mediaLink.style.height = "300px";
            mediaLink.classList.add("galleryLink");
            mediaLink.setAttribute("href", "#");
            
        const img = document.createElement('img');
            img.setAttribute("src", mediaImage);
            img.setAttribute("alt", title);
            img.style.width = "350px";
            img.style.height = "300px";
            img.style.objectFit = "cover";
            img.style.cursor = "pointer";
            img.classList.add("currentMedia");

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
                vid.setAttribute("alt", title);
                vid.className = 'vid';
                vid.style.width = "350px";
                vid.style.height = "300px";
                mediaLink.appendChild(vid);
                vid.style.objectFit = "cover";
                vid.style.cursor = "pointer";
                vid.classList.add("currentMedia");
            };
    
        figure.appendChild(mediaLink);
        mediaLink.appendChild(img);
        figure.appendChild(mediaCaption);
        mediaCaption.appendChild(mediaTitle);
        mediaCaption.appendChild(mediaLike);

        return (figure);
    }

    return { image, video, title, likes, id, getMediasCardDOM }
}





