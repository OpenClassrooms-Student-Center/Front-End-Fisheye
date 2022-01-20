//FONCTION POUR AFFICHER LE PROFIL DU PHOTOGRAPHE 



// FONCTION POUR AFFICHER LES MEDIAS DU PHOTOGRAPHE

function mediasFactory(data) {
    const { image, video, title, likes } = data;

    let media = `assets/medias/Mimi/${image}`;

    function getMediasCardDOM() {

      const figure = document.createElement('article');
            figure.style.marginBottom = "40px";
            figure.style.width = "350px";

        const img = document.createElement('img');
            img.setAttribute("src", media);
            img.style.width = "350px";
            img.style.height = "300px";
            img.style.objectFit = "cover"; 

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
    
        figure.appendChild(img);
        figure.appendChild(mediaCaption);
        mediaCaption.appendChild(mediaTitle);
        mediaCaption.appendChild(mediaLike);


        return (figure);
        
    }
    return { image, video, title, likes, getMediasCardDOM }
}





