function getMediaItems(data) {
    const { id, name, city, country, tagline, title, image, likes, date, price } = data;
    const picture = `assets/images/Photographers/${portrait}`
    const PhotographerMedia =  getPhotographerMedia()

    function getDOM() {
        // lineOne
        const lineOne = document.createElement('div')
        lineOne.classList.add('item');

        lineOne.innerHTML = `
        <h1>${name}</h1>
        <h3>${city} ${country}</h3>
        <p>${tagline}</p>
        `
        return lineOne 
    }
    return { picture, getDOM }
}