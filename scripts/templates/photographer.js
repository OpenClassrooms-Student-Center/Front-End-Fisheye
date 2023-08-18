function photographerTemplate(data) {
    const { name, portrait,city, country } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const link = document.createElement( 'a' );
        link.href=`./photographer.html?id=${data.id}`
        const img = document.createElement( 'img' );
        const divLocation = document.createElement( 'div' );
        divLocation.classList.add('location');
        divLocation.textContent = `${city}, ${country}`;
        img.setAttribute("src", picture)
        img.classList.add('img')
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        article.appendChild(link);
        link.appendChild(img);
        link.appendChild(h2);
        link.appendChild(divLocation);

        return (article);
    }
    return { name, picture, getUserCardDOM }
}