/* eslint-disable */
function OurPhotographerFactory(data) {
    const { name, portrait, id, tagline, city, price, country } = data;

    ////////////Getting all infos ////////////////////
    
    // Getting our Pictures
    const picture = `assets/photographers/${portrait}`;

    function getOurUserCardDOM() {
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );

        /// Handling image ///

        img.setAttribute("src", picture)
        // For accessibility, we add an alt = photo of photographer and an aria-label to tell that you can click on the image to see more infos
        img.setAttribute("alt", `profil de ${name}`)

        //////////////////////


        const h2 = document.createElement( 'h2' );
        h2.textContent = name;

        const h3 = document.createElement('h3')
        h3.textContent = city + ", " + country

        const h4 = document.createElement('h4')
        h4.textContent = tagline

        const h5 = document.createElement('h5')
        h5.textContent = price+"€ / jour"
        
        const containerPrice = document.createElement('div')
        containerPrice.setAttribute('class', 'container_total_price')
        const containerLikes = document.createElement('div')
        containerLikes.setAttribute('class', 'container_total_likes')
        // Handling first div
        const div = document.createElement('div')
        div.classList.add("photographer-section")
        ///////////////////////

        // Handling second div
        const aside = document.createElement('div')
        aside.setAttribute('id', 'aside')
        aside.classList.add('aside')
        ///////////////////////

        const totalLikes = document.createElement('h5')
        totalLikes.setAttribute('id', 'totalLikes')

        const heartContainer = document.createElement('img')
        heartContainer.setAttribute('src', "/assets/icons/heart-solid-black.svg")
        heartContainer.setAttribute('class', "heart-total")

        const imgContainer = document.createElement('article');

        // Append child to create our template
        div.appendChild(article)
        div.appendChild(aside)
        aside.appendChild(containerLikes)
        containerLikes.appendChild(totalLikes)
        containerLikes.appendChild(heartContainer)
        aside.appendChild(containerPrice)
        containerPrice.appendChild(h5)
        div.appendChild(imgContainer)
        article.appendChild(h2);
        article.appendChild(h3);
        article.appendChild(h4);
        imgContainer.appendChild(img)
        ////////////////////////////////////////

        return (div);
    }
    // We added every data of our photographer
    return { name, portrait, id, tagline, city, price, country,  getOurUserCardDOM }
}