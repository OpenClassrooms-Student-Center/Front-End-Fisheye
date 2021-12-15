function photographerFactory(data) {
    const { name, portrait, id, city, country, tagline, price } = data;

    const picture = `assets/photographers/${portrait}`;
    const location = `${city}, ${country}`;
    const tjm =  `${price}€/jour`; 
   

    function getUserCardDOM() {
        
        // create user card container 
        const article = document.createElement( 'article' );
        // create link to Portfolio
        const linkToProfil = document.createElement('a');
        linkToProfil.setAttribute('href', `./pages/photographer.html?id=${id}`);
        article.appendChild(linkToProfil);

        // create and setting items 
        // --> profil picture
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);
        img.setAttribute("alt", `portrait de ${name}`);

        // --> name 
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;

        // -- > location 
        const h3 = document.createElement( 'h3' );
        h3.textContent = location;

        // --> tagline 
        const p = document.createElement( 'p' );
        p.textContent = tagline;

        // -- > price
        const salary = document.createElement( 'p' );
        salary.textContent = tjm;

        // insert items in article 
        linkToProfil.appendChild(img);
        linkToProfil.appendChild(h2);
        linkToProfil.appendChild(h3);
        linkToProfil.appendChild(p);
        linkToProfil.appendChild(salary);
        return (article);

    }
    function getPortoflioItems() {
        // create div container for design 
        const userInfosContainer = document.createElement('div')
        const infosLikesAndPrice = document.createElement('div')
        infosLikesAndPrice.id = 'sticky-user-infos'
        // -- > profil picture
        const picture = `../assets/photographers/${photographerInfos.portrait}`
        const img = document.createElement('img')
        img.setAttribute('src', picture)
        img.setAttribute('alt', `portrait de ${photographerInfos.name}`)

        // --> name
        const h1 = document.createElement('h1')
        h1.textContent = photographerInfos.name

        // -- > location
        const h3 = document.createElement('h3')
        h3.textContent = `${photographerInfos.city}, ${photographerInfos.country}`

        // --> tagline
        const p = document.createElement('p')
        p.textContent = photographerInfos.tagline
        
        // --> price 
        const price = document.createElement('span');
        price.textContent = `${photographerInfos.price}€ / jour`

        
        //import parent element in DOM
        const photographerHeader = document.querySelector('.photograph-header')

        // insert intems in header
        photographerHeader.appendChild(userInfosContainer)
        userInfosContainer.appendChild(h1)
        userInfosContainer.appendChild(h3)
        userInfosContainer.appendChild(p)
        photographerHeader.appendChild(img)
        photographerHeader.appendChild(infosLikesAndPrice)
        infosLikesAndPrice.appendChild(price)
    }
   
    return { name, picture, tagline, location,  getUserCardDOM, getPortoflioItems }
}