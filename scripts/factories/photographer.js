function photographerFactory(data) {
    const { name, city, country, tagline, price, portrait } = data;
    const urlPhotographers = name.toLowerCase().split(" ").join(""); 
    const picture = `assets/photographers/${portrait}`;
    
    function getUserCardDOM() {
         let str = 
         `<article>
            <a href="${urlPhotographers}.html">
                <img src="${picture}" alt="${name}">
                <h2 alt= "${name}">${name}</h2>
            </a>
            <h4 alt= "${city}, ${country}">${city}, ${country}</h4>
            <p>${tagline}</p>
            <small>${price}€/jour</small>
          </article>`; 
        return (str);
    }
    return { name, city, country, tagline, price, portrait, getUserCardDOM }
}