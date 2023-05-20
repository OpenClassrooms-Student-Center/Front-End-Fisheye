function photographerFactory(data) {
    const { name, portrait, city, country, tagline, price, description, link, id } = data;    
    const picture = `assets/photographers/${portrait}`;
    
    // card creation
    function getUserCardDOM() {
        // create different elements in the DOM
        const article = document.createElement('article');
        const personalPhoto = document.createElement('section');
        personalPhoto.setAttribute('tabindex', '0');
        personalPhoto.setAttribute('role' , 'region');
        personalPhoto.setAttribute("aria-label" , name);
        personalPhoto.setAttribute("id" , id);
        const a = document.createElement ('a');
        a.setAttribute("href", link);
        const img = document.createElement('img');
        img.setAttribute("src", picture);
        img.setAttribute("alt", description);
        const h2 = document.createElement('h2');
        h2.textContent = name;
        const h4 = document.createElement('h4');
        h4.textContent = `${city}, ${country}`
        const p1 = document.createElement('p');
        const personalInfo = document.createElement('section');
        personalInfo.setAttribute('tabindex' , '0');
        personalInfo.setAttribute('role' , 'region');
        personalInfo.setAttribute("aria-labelledby" , 'photographer information');
        p1.textContent = tagline;
        const p2 = document.createElement('p');
        p2.textContent = `${price}€/jour`;
        // attach elements to their parents after craetion in the DOM
        article.appendChild(personalPhoto);
        personalPhoto.appendChild(a);
        a.appendChild(img);
        a.appendChild(h2);
        article.appendChild(personalInfo);
        personalInfo.appendChild(h4);
        personalInfo.appendChild(p1);
        personalInfo.appendChild(p2);
        return (article);
    }
    return {getUserCardDOM}
}

const onClick = (event) => {
    console.log(event.target.id);
  }
  window.addEventListener('click', onClick);
