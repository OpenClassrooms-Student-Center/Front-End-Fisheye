// AFFICHE LES MEDIAS DU PHOTOGRAPHE
function mediasFactory(data) {
    const { image, video, title, likes } = data;
    
    let mediaImage = `assets/medias/${image}`;
    let mediaVideo = `assets/medias/${video}`;

    function getMediasCardDOM() {

        const figure                        = document.createElement('figure');
        const mediaLink                     = document.createElement('a');
        const img                           = document.createElement('img');
        const mediaCaption                  = document.createElement('figcaption');
        const mediaTitle                    = document.createElement('p');
        const mediaLikes                    = document.createElement("div");
        const numberOfLikes                 = document.createElement("input");
        const buttonHeart                   = document.createElement("button");

        figure.style.marginBottom           = "40px";
        figure.style.width                  = "350px";
        
        mediaLink.classList.add("galleryLink");
        mediaLink.setAttribute("href", "#");
        mediaLink.style.width               = "350px";
        mediaLink.style.height              = "300px";
        
        img.setAttribute("src", mediaImage);
        img.setAttribute("alt", title);
        img.classList.add("currentMedia");
        img.style.width                     = "350px";
        img.style.height                    = "300px";
        img.style.borderRadius              = "5px";
        img.style.objectFit                 = "cover";
        img.style.cursor                    = "pointer";

        if(video != undefined) {
            const vid = document.createElement('video');
            vid.className                   = 'vid';
            vid.style.width                 = "350px";
            vid.style.height                = "300px";
            vid.style.borderRadius          = "5px";
            vid.style.objectFit             = "cover";
            vid.style.cursor                = "pointer";
            vid.setAttribute("src", mediaVideo);
            vid.setAttribute("alt", title);
            vid.classList.add("currentMedia");
            mediaLink.appendChild(vid);
        };

        mediaCaption.classList.add("figcaption"); 
        mediaCaption.style.display          = "flex";
        mediaCaption.style.justifyContent   = "space-between";
        
        mediaTitle.classList.add("mediaTitle");
        mediaTitle.textContent              = title;
        mediaTitle.style.fontSize           = "20px";
        mediaTitle.style.color              = "#901C1C";
            
        mediaLikes.classList.add("likesContainer");
        mediaLikes.style.display            = "flex";
        mediaLikes.style.fontSize           = "20px";
        mediaLikes.style.color              = "#901C1C";
        
        numberOfLikes.setAttribute("value", likes);
        numberOfLikes.classList.add("numberOfLikes");
        numberOfLikes.style.width           = "32px";
        numberOfLikes.style.border          = "none";
        numberOfLikes.style.color           = "#901C1C";
        numberOfLikes.style.fontSize        = "20px";
        
        buttonHeart.classList.add("buttonHeart");
        buttonHeart.innerHTML               = '<i class="fas fa-heart"></i>';
        buttonHeart.style.background        = "white";
        buttonHeart.style.border            = "none";
        buttonHeart.style.fontSize          = "20px";
        buttonHeart.style.color             = "#901C1C";
        buttonHeart.style.cursor            = "pointer";
        buttonHeart.setAttribute("title", "Likes");

        figure.appendChild(mediaLink);
        mediaLink.appendChild(img);
        figure.appendChild(mediaCaption);
        mediaCaption.appendChild(mediaTitle);
        mediaCaption.appendChild(mediaLikes);
        mediaLikes.appendChild(numberOfLikes);
        mediaLikes.appendChild(buttonHeart);
 
        return (figure);
    }

    return { image, video, title, likes, getMediasCardDOM }
}





