function getMedias(data) {
    const { id, name, city, country, tagline, title, image, likes, date, price } = data;
    const picture = `assets/images/Photographers/${portrait}`

    function getDOM() {
        // columnOne
        const columnOne = document.createElement( '.columnOne' )

        columnOne.innerHTML = `
        <h1>${name}</h1>
        <h3>${city} ${country}</h3>
        <p>${tagline}</p>
        `
        return columnOne 
    }
    return { picture, getDOM }
}