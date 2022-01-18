//FONCTION POUR AFFICHER LE PROFIL DU PHOTOGRAPHE 

function profileFactory(data) {
    const { name, portrait, city, country, tagline, price } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const headerPh = document.querySelector('.photograph-header');
        const profile = document.createElement('div');
            profile.style.margin = "auto 0";
            profile.style.ordre = "1" ; 

        const img = document.createElement('img');
            img.setAttribute("src", picture); 
            img.style.width = "200px";
            img.style.height = "200px";
            img.style.objectFit = "cover";
            img.style.borderRadius = "50%";
            img.style.margin = "auto 0";
            img.style.order = "3"; 

        const photographerName = document.createElement('h2');
            photographerName.textContent = name;
            photographerName.style.fontSize = "64px";
            photographerName.style.color = "#D3573C";

        const photographerCity = document.createElement('p');
            photographerCity.textContent = city + ', ' + country; 
            photographerCity.style.fontSize = "24px";
            photographerCity.style.color = "#D3573C";

        const photographerTagline = document.createElement('p');
            photographerTagline.textContent = tagline;
            photographerTagline.style.fontSize = "18px";
            photographerTagline.style.marginTop = "20px";

        const priceContainer = document.createElement('div');
            priceContainer.style.background = "#D88876";
            priceContainer.style.position = "fixed";
            priceContainer.style.bottom = "0px";
            priceContainer.style.right = "30px";
            priceContainer.style.height = "50px";
            priceContainer.style.padding = "0 20px";

        const body = document.querySelector('body');

        const photographerPrice = document.createElement('p');
            photographerPrice.textContent = price + '€/jour';
            photographerPrice.style.fontSize = "24px";
            photographerPrice.style.lineHeight = "50px";

        profile.appendChild(photographerName);
        profile.appendChild(photographerCity);
        profile.appendChild(photographerTagline);
        headerPh.appendChild(profile);
        headerPh.appendChild(img);
        body.appendChild(priceContainer);
        priceContainer.appendChild(photographerPrice);
        
        return (profile);
        
    }
    return { name, picture, city, country, tagline, price, getUserCardDOM }
}

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





