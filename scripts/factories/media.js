function photoCardFactory(data, photographe) {
    const { id, photographerId, title, image, likes,date,price} = data;
    const picture = `assets/photos/${photographe.id}/${image}`;

    function getPhotoDOM(){
        //Création du layout
        const card = document.createElement('div');
        const img = document.createElement('img');
        const titleImage = document.createElement('h3');

        console.log
        img.setAttribute("src", picture);
        img.setAttribute("alt",title);
        const cardInfo = document.createElement('div');
        cardInfo.classList.add ='card-info';
        const cardInfoLike = document.createElement('div');
        const nblikes = document.createElement('p');
        const iconLike = document.createElement('i');
        iconLike.classList.add ='fas fa-heart';
        //Set les valeurs
        titleImage.textContent = title;
        nblikes.textContent = likes;

        //Ajout dans le layout

        cardInfoLike.appendChild(nblikes);
        cardInfoLike.appendChild(iconLike);
        cardInfo.appendChild(titleImage);
        cardInfo.appendChild(cardInfoLike);
        card.appendChild(img);
        card.appendChild(cardInfo);
        
        return (card);
    }

    return  {getPhotoDOM};

}