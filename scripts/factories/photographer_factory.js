function photographerFactory(data) {
    const { name, portrait, city, tagline, price, country, id } = data;

    const picture = `assets/photographers/Photographers ID Photos/${portrait}`;
    const hrefPhotographer = `/photographer.html?id=${id}`;

    //DOM elements of photographer
    const article = document.createElement('article');
    const a = document.createElement('a');
    const img = document.createElement('img');
    const h1 = document.createElement('h1');
    const h2 = document.createElement('h2');
    const divCity = document.createElement('div');
    const divTagline = document.createElement('div');
    const divPrice = document.createElement('div');
    const divPhotographerInfos = document.createElement('div');
    
    //Set attributes and class for the CSS
    img.setAttribute("src", picture);
    a.setAttribute("href", hrefPhotographer);
    divCity.classList.add('city');
    divTagline.classList.add('tagline');
    divPrice.classList.add('price');
    divPhotographerInfos.classList.add('photographer-infos');

    function getUserCardDOM() {

        //Text injected in HTML elements
        h2.textContent = name;
        divCity.textContent = `${city}, ${country}`;
        divTagline.textContent = tagline;
        divPrice.textContent = `${price}€/jour`;

        //Add creates element in the DOM
        article.appendChild(a);
        a.appendChild(img);
        a.appendChild(h2);
        article.appendChild(divCity);
        article.appendChild(divTagline);
        article.appendChild(divPrice);

        return article;
    }

    function getPhotographerInfos() {

        //Text injected in HTML elements
        h1.textContent = name;
        divCity.textContent = `${city}, ${country}`;
        divTagline.textContent = tagline;

        //Add created elements in the DOM
        divPhotographerInfos.appendChild(h1);
        divPhotographerInfos.appendChild(divCity);
        divPhotographerInfos.appendChild(divTagline);

        return { img, divPhotographerInfos };
    }

    return { getUserCardDOM, getPhotographerInfos }
   
}