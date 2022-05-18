function photographerFactory(data) {
    const { name, city, country, tagline, price, portrait } = data;
    const urlPhotographers = name.toLowerCase().split(" ").join(""); 
    const picture = `assets/photographers/${portrait}`;
    
    function getUserCardDOM() {
         let str = `
         <article>
            <a href="${urlPhotographers}.html">
                <img src="${picture}" alt="${name}">
                <h2 alt= "${name}">${name}</h2>
            </a>
            <h4 alt= "${city}, ${country}">${city}, ${country}</h4>
            <p>${tagline}</p>
            <small>${price}€/jour</small>
          </article>`; 

        /*const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);
        img.setAttribute("alt", name);
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        h2.setAttribute("alt", name);
        const h4 = document.createElement( 'h4' );
        h4.textContent = city + ', ' + country;
        const p = document.createElement( 'p' );
        p.textContent = tagline;
        const small = document.createElement( 'small' );
        small.textContent = price + '€/jours';
        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(h4);
        article.appendChild(p);
        article.appendChild(small);*/
        return (str);
    }
    return { name, city, country, tagline, price, portrait, getUserCardDOM }
}