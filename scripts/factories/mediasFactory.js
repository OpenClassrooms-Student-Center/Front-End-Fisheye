// FONCTION POUR AFFICHER LES MEDIAS DU PHOTOGRAPHE
function mediasFactory(data) {
    const { image, video, title, likes, id } = data;
    
    let mediaImage = `assets/medias/${image}`;
    let mediaVideo = `assets/medias/${video}`;

    function getMediasCardDOM() {

        const figure = document.createElement('figure');
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

        const mediaCaption = document.createElement('figcaption');
            mediaCaption.style.display = "flex";
            mediaCaption.style.justifyContent = "space-between";
            mediaCaption.classList.add("figcaption"); 

        const mediaTitle = document.createElement('p');
            mediaTitle.textContent = title;
            mediaTitle.style.fontSize = "20px";
            mediaTitle.style.color = "#901C1C";
            mediaTitle.classList.add("mediaTitle");

        const mediaLikes = document.createElement("div");
        mediaLikes.style.display = "flex";
        mediaLikes.style.fontSize = "20px";
        mediaLikes.style.color = "#901C1C";
        mediaLikes.classList.add("likesContainer");
        
        const numberOfLikes = document.createElement("input");
        numberOfLikes.setAttribute("value", likes);
        numberOfLikes.style.width = "30px";
        numberOfLikes.style.border = "none";
        numberOfLikes.classList.add("numberOfLikes");
        numberOfLikes.style.color = "#901C1C";
        numberOfLikes.style.fontSize = "20px";
        
        const buttonHeart = document.createElement("button");
        buttonHeart.innerHTML = '<i class="fas fa-heart"></i>';
        buttonHeart.style.background = "white";
        buttonHeart.style.border = "none";
        buttonHeart.style.fontSize = "20px";
        buttonHeart.style.color = "#901C1C";
        buttonHeart.classList.add("buttonHeart");
        buttonHeart.style.cursor = "pointer";


        figure.appendChild(mediaLink);
        mediaLink.appendChild(img);
        figure.appendChild(mediaCaption);
        mediaCaption.appendChild(mediaTitle);
        mediaCaption.appendChild(mediaLikes);
        mediaLikes.appendChild(numberOfLikes);
        mediaLikes.appendChild(buttonHeart);

        /////////////////////////////////////////////////////////////

        
        

        return (figure);
    }

    return { image, video, title, likes, id, getMediasCardDOM }
}





