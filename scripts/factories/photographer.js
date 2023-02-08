function photographerFactory(data) {
    const { name, portrait, id, tagline, city, price, country } = data;


    // Getting our Pictures
    const picture = `assets/photographers/${portrait}`;
    console.log(picture)

    // Our Ids
    const getId = `${id}`
    console.log(getId)

    // Our taglines
    const getTagline = `${tagline}`
    console.log(getTagline)

    // Our Cities
    const getCity = `${city}`
    console.log(getCity)

    // Our Prices
    const getPrices = `${price}`
    console.log(getPrices)

    // Our Countries
    const getCountries = `${country}`
    console.log(getCountries)

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        // For accessibility, we add an alt = photo of photographer and an aria-label to tell that you can click on the image to see more infos
        img.setAttribute("alt", `profil de ${name}`)
        img.setAttribute("aria-label", `cliquez pour consulter le profil de ${name}`)
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        const h3 = document.createElement('h3')
        h3.textContent = getTagline
        const h4 = document.createElement('h4')
        h4.textContent = getCountries
        const h5 = document.createElement('h5')
        h5.textContent = getPrices+" € /h"
        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(h3);
        article.appendChild(h4);
        article.appendChild(h5);
        return (article);
    }
    // We added every data of our photographers
    return { name, portrait, id, tagline, city, price, country, getUserCardDOM }
}