function photographerTemplate(data) {
    const { name, portrait, id } = data;

    const picture = `assets/photographers/portrait/${portrait}`;
    const PhotographerLink = `photographer.html?id=${id}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const link = document.createElement('a');
        const img = document.createElement( 'img' );
        const h2 = document.createElement( 'h2' );

        link.setAttribute("href", PhotographerLink);      
        img.setAttribute("src", picture);        
        h2.textContent = name;

        article.appendChild(link);
        link.appendChild(img);
        link.appendChild(h2);
        return (article);
    }

    return { name, picture, getUserCardDOM }

}