function mediaFactory(data) {
    const { date, id, image, likes, photographerId, price, title } = data;

    ////////////Getting all infos ////////////////////
// Getting our Pictures
const getImages = `assets/images/${photographerId}/${image}`;
console.log(getImages)


// Our Dates
const getDate = `${date}`
console.log(getDate)

// Our Ids
const getId = `${id}`
console.log(getId)

// Our Titles
const getTitle = `${title}`
console.log(getTitle)


// Our Prices
const getPrices = `${price}`
console.log(getPrices)

//Our PhotographerId
const getPhotographerId = `${photographerId}`
console.log(getPhotographerId)

function getMediaCardDOM() {
    const article = document.createElement( 'article' );
    const img = document.createElement( 'img' );
    img.setAttribute("src", getImages)
    // For accessibility, we add an alt = photo of photographer and an aria-label to tell that you can click on the image to see more infos
   // img.setAttribute("alt", `profil de ${name}`)
    img.setAttribute("aria-label", `cliquez pour consulter le profil de ${name}`)
    const h2 = document.createElement( 'h2' );
   // h2.textContent = name;
    const h3 = document.createElement('h3')
    h3.textContent = getTagline
    const h4 = document.createElement('h4')
    h4.textContent = getCountries
    const h5 = document.createElement('h5')
    h5.textContent = getPrices+" € /h"
    const a = document.createElement('a')
    a.textContent = "Voir le profil"
   // a.href=getPhotographer;
    
    article.appendChild(img);
    article.appendChild(h2);
    article.appendChild(h3);
    article.appendChild(h4);
    article.appendChild(h5);

    return (article)
}
return { date, id, image, likes, photographerId, price, title,  getMediaCardDOM }
}


