function photographerTemplate(data) {
    const { name, portrait, city, country, tagline, price } = data;
    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const photographerHeader = document.createElement( 'div' );
        photographerHeader.classList.add( 'photograph_header_container' );

        const photographerInformations = document.createElement( 'div' );
        photographerInformations.classList.add( 'photograph_informations' );

        const photographerContact = document.createElement( 'div' );

        photographerContact.classList.add( 'photographer_contact');
        const photographerContactBtn = document.createElement( 'button' );
        photographerContactBtn.classList.add('contact_button');
        photographerContactBtn.textContent = 'Contactez-moi';
        photographerContactBtn.onclick = displayModal;

        const photographerPicture = document.createElement('div');
        photographerPicture.classList.add('photographer_picture');

        const photographerLikesPrice = document.createElement( 'div' );
        photographerLikesPrice.classList.add( 'photographer_likes_price' );

        const img = document.createElement('img');
        img.setAttribute("src", picture);

        const h2 = document.createElement( 'h2' );
        h2.textContent = name;

        const h3 = document.createElement( 'h3' );
        h3.textContent = city +', '+ country;

        const h4 = document.createElement( 'h4' );
        h4.textContent = tagline;

        const h5 = document.createElement( 'h5' );
        h5.textContent = price +'€ / jour';

        photographerInformations.appendChild(h2);
        photographerInformations.appendChild(h3);
        photographerInformations.appendChild(h4);
        photographerContact.appendChild(photographerContactBtn);
        photographerPicture.appendChild(img);
        photographerLikesPrice.appendChild(h5);
        
        photographerHeader.appendChild(photographerInformations);
        photographerHeader.appendChild(photographerContact);
        photographerHeader.appendChild(photographerPicture);
        document.body.appendChild(photographerLikesPrice);

        return (photographerHeader);
    }
    return { getUserCardDOM }
}


function phototographerMedia(data) {
    const { title, image, likes} = data;
    const images = `assets/images/${image}`;

    function getMediaCardDOM() {
        const photographerMedia = document.createElement( 'div' );
        photographerMedia.classList.add( 'photograph_media' );

        const mediaInformations = document.createElement( 'div' );
        mediaInformations.classList.add( 'media_informations' );

        const mediaLikes = document.createElement( 'div' );
        mediaLikes.classList.add( 'likes' );

        const h2 = document.createElement( 'h2' );
        h2.textContent= title;
        
        const h3 = document.createElement( 'h3' );
        h3.textContent= likes;

        const heart = document.createElement( 'i' );
        heart.classList.add( 'fa-solid' );
        heart.classList.add( 'fa-heart' );
        heart.classList.add( 'heart__icon--full' );
        
        photographerMedia.appendChild(mediaInformations);
        mediaInformations.appendChild(h2);
        
        mediaLikes.appendChild(h3);
        mediaLikes.appendChild(heart);
        mediaInformations.appendChild(mediaLikes);

        return (mediaInformations);

    }

    return { title, likes, getMediaCardDOM }

}