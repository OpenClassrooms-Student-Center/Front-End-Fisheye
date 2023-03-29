function getMediaItems(data) {
    const { id, name, city, country, tagline, title, image, likes, date, price, video } = data;

    // address of its media
    const pictureMedia = `assets/images/${photographerId}/${image}`;
    const videoMedia = `assets/images/${photographerId}/${video}`;

    console.log(pictureMedia)

    return { pictureMedia, videoMedia }
}