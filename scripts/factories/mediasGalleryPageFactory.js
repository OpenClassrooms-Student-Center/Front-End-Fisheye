function MediasGalleryPageFactory(data) {

    const { id, photographerId, title, image, likes, date, price} = data;

    const picture = `assets/images/${photographerId}/${image}`;

    function getMediasOfPhotographer() {

        const img = document.createElement('img');
        img.setAttribute("src", picture);
        img.setAttribute("alt", '');
        img.classList.add('media-card');

        return (img);
    }
    return { id, photographerId, title, image, likes, date, price, picture, getMediasOfPhotographer }
}
