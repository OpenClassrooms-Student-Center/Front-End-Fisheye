function photographerFactory(data) {
    const { photo } = data;
    const picture = `assets/photographers/${portrait}`;
    //const gallery = `assets/photographers/images/${portrait}/`;
    
    function getUserCardDOM() {
         let str = 
         `<article>
            <a href="" title="${name} page">
                <img src="${picture}" alt="photo de ${name}">
                <h2 alt= "${name}">${name}</h2>
            </a>
            <h4 alt= "${city}, ${country}">${city}, ${country}</h4>
            <p>${tagline}</p>
            <small>${price}€/jour</small>
          </article>`; 
        return (str);
    }
    function getUserIdDOM() {
        const article = document.createElement( 'article' );
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        article.appendChild(h2);
        return (article);
   };

   /* function getUserPictures() {
        let str = 
        `<article>
           <a href="${urlPhotographers}.html" title="${name} page">
               <img src="${picture}" alt="photo de ${name}">
               <h2 alt= "${name}">${name}</h2>
           </a>
           <h4 alt= "${city}, ${country}">${city}, ${country}</h4>
           <p>${tagline}</p>
           <small>${price}€/jour</small>
         </article>`; 
       return (str);
   };*/
   return { 
       name, 
       city, 
       country, 
       tagline, 
       price, 
       portrait, 
       getUserCardDOM, 
       getUserIdDOM 
    }
}