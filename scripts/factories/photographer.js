function photographerFactory(data) {
    const { name, portrait, city, country, tagline, price } = data;
console.log("coucou");
console.log(data.portrait);
    const picture = `assets/photographers/${portrait}`;
    

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)

        const link = document.createElement ('a');
        link.classList.add('photographer-link');
        const details = document.createElement('p');
        details.classList.add('photographer-details');
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        const h3 = document.createElement('h3');
        h3.textContent = city + ', '+ country;
        const h4 = document.createElement('h4');
        h4.textContent = tagline;
        const h5 = document.createElement('h5');
        h5.textContent = price+'€/jour';
        article.appendChild(link);
        article.appendChild(details);
        link.appendChild(img);
        link.appendChild(h2);
        details.appendChild(h3);
        details.appendChild(h4);
        details.appendChild(h5);
        return (article);
    }
    return { name, picture, getUserCardDOM, city, country, tagline, price}
}