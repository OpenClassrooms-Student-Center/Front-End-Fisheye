function photographerFactory(data) {
    const { name, portrait, id, city, country, tagline, price } = data;

    const picture = `assets/photographers/${portrait}`;
    const location = `${city}, ${country}`;
    const tjm =  `${price}€/jour`; 
   

    function getUserCardDOM() {
        // create user card container 
        const article = document.createElement( 'article' );
        // create and setting items 
        // --> profil picture
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)

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
        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(h3);
        article.appendChild(p);
        article.appendChild(salary);
        return (article);

    }
    function getPhotographerPage() {
        // create profil page informations 
        const Profilcontainer = document.createElement('div'); 
        // create header Profil Page
        const headerProfilPage = document.createElement('header');

        return Profilcontainer; 

    }
    return { name, picture, tagline, location, getUserCardDOM }
}