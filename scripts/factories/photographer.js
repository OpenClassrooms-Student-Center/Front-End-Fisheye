function photographerFactory(data) {
    const { name, portrait, city, tagline, price } = data;

    const picture = `assets/photographers/portrait/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );

        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);
        img.onclick = function(){
            window.location.href = './photographer.html';
        };

        const h2 = document.createElement( 'h2' );
        h2.textContent = name;

        const location = document.createElement( 'h3' );
        location.textContent = city;

        const description = document.createElement ( 'i' );
        description.textContent = tagline;

        const pricePerDay = document.createElement ( 'p' );
        pricePerDay.textContent = price;

        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(location);
        article.appendChild(description);
        article.appendChild(pricePerDay);


        return (article);
    }
    return { name, picture, getUserCardDOM }
}