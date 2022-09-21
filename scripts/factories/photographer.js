function photographerFactory(data) {
    const { name, portrait, city, country,tagline,price, id } = data;
   
    const picture = `assets/photographers/${portrait}`;
    
    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        article.setAttribute("tabindex", 0  )
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        img.setAttribute("alt", name)
        const h3 = document.createElement ('h3');
        h3.textContent = `${city}, ${country}`;
        const h4 = document.createElement ('h4');
        h4.textContent = tagline;
        const prix = document.createElement('div');
        prix.textContent = `${price}€/jour`;
        const idPhotographer = id;
        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(h3);
        article.appendChild(h4);
        article.appendChild(prix);     
       //fonction onclick sur l'image d'un photographe, qui ouvre sa page en récupérant son id
        img.onclick = function () {     
            window.location = '/photographer-page.html?id='+`${idPhotographer}`;
        }
        return (article);
    }
    function getPhotographerCard() {
        document.querySelector(
            ".photographer"
          ).innerHTML = `<div class="flex"><h2>${photographer.name}</h2><h3>${photographer.city}, ${photographer.country}</h3><h4>${photographer.tagline}</h4></div><button class="contact_button" onclick="displayModal()">Contactez-moi</button><img src="/assets/photographers/${photographer.portrait}" alt="photo de ${photographer.name}"></img>`;
    } 
    return { name, picture,city,country,tagline,price,id, getUserCardDOM, getPhotographerCard }
}
