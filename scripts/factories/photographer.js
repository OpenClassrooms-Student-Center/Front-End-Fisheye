function photographerFactory(data) {
    const { name, portrait, id, tagline, city, price, country } = data;

    ////////////Getting all infos ////////////////////
    
    // Getting our Pictures
    const picture = `assets/photographers/${portrait}`;
    console.log(picture)

    // Our Ids
    const getId = `${id}`
    console.log(getId)

    // Our taglines
    const getTagline = `${tagline}`
    console.log(getTagline)

    // Our Cities
    const getCity = `${city}`
    console.log(getCity)

    // Our Prices
    const getPrices = `${price}`
    console.log(getPrices)

    // Our Countries
    const getCountries = `${country}`
    console.log(getCountries)
    console.log(getId)
    //Our Photographer
    const getPhotographer = `/photographer.html?id=${getId}`
    

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        // For accessibility, we add an alt = photo of photographer and an aria-label to tell that you can click on the image to see more infos
        img.setAttribute("alt", `profil de ${name}`)
        img.setAttribute("aria-label", `cliquez pour consulter le profil de ${name}`)
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        const h3 = document.createElement('h3')
        h3.textContent = getTagline
        const h4 = document.createElement('h4')
        h4.textContent = getCountries
        const h5 = document.createElement('h5')
        h5.textContent = getPrices+" € /h"
        const a = document.createElement('a')
        a.textContent = "Voir le profil"
        a.href=getPhotographer;
        
        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(h3);
        article.appendChild(h4);
        article.appendChild(h5);
        article.appendChild(a);
        
            article.addEventListener("click", () => {
                innerHTML.links(`<a href=photographer.html?id=${getId}>`);
            })

       /* let ahref = document.getElementsByTagName("article");
        console.log(ahref[0] +"ahref[0]")
        let links = ahref[0]
        console.log(links)
        let numberahref = ahref.length;
        console.log(numberahref  + "numberahref");
        for (let i = 0; i < numberahref; i++) {
          links.forEach((links) => {
            links.addEventListener("click", () => {
              innerHTML.links(`<a href="photographer.html?id=${photographers[i]._id}">`);
            });
          });
        }*/
        return (article);
    }
    // We added every data of our photographers
    return { name, portrait, id, tagline, city, price, country,  getUserCardDOM }
}