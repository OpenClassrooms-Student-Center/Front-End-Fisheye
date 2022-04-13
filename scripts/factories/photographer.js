
function photographerFactory(data) {
    

    const { name, id, city, country, tagline, price, portrait } = data;

    const picture = `assets/photographers/Photographers ID Photos/${portrait}`;

    // Construction de l'URL  photographe.html?id={id}
    const photographerUrl = new URL(BaseURL.base + "photographer.html")
    photographerUrl.searchParams.append('id',id);

    function getImg() {
        // photo vignette
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        return img
    }

    function getName(){
        // Nom du photographe
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        return h2        
    }

    function getCityCountry(){
        /* City, Country */
        const pcitycountry = document.createElement( 'p' );
        pcitycountry.textContent = city + ', ' + country
        pcitycountry.classList.add("citycountry")
        return pcitycountry
    }

    function getSlogan(){
        /* Slogan */
        const ptagline = document.createElement( 'p' );        
        ptagline.textContent = tagline
        ptagline.classList.add("tagline")
        return ptagline
    }

    function getPrice(){
        const pprice = document.createElement('p')
        pprice.textContent = price + "€/jour"
        pprice.classList.add("price")
        return pprice
    }

    function getUniqPhotograph({article,img,h2,citycountry,slogan}){
        // les champs du header
        div = document.createElement( 'div' );
        div.classList.add("photograph")
        div.appendChild(h2)
        div.appendChild(citycountry)
        div.appendChild(slogan)
        article.appendChild(div)
        article.appendChild(img)
        return article
    }
    
    function getUserCardDOM(header=false) {
        let article
        if(header){
            // header page photographe.html
            article = document.querySelector(".photograph-header")           
        }
        else{
            // vignette photographe
            article = document.createElement( 'article' );
            article.setAttribute("id", "photographer_"+id)
        }

        // lien vers la page du photographe
        const photographerLink = document.createElement('a')
        photographerLink.setAttribute("href",photographerUrl)

        // photo vignette
        const img = getImg()

        // Nom du photographe
        const h2 = getName()

        /* City, Country */
        const pcitycountry = getCityCountry()
        
        /* Slogan */
        const ptagline = getSlogan()

        /* Price per day */
        const pprice = getPrice()
    
        if(header){
            article = getUniqPhotograph({
                article:article,
                img:img,
                h2:h2,
                citycountry:pcitycountry,
                slogan:ptagline
            })
        }
        else {
            article.appendChild(photographerLink)
            // modification par rapport à la version initiale:
            // le lien englobe la photo et le titre
            photographerLink.appendChild(img);
            photographerLink.appendChild(h2);
            // les nouveaux champs à afficher mais hors lien de redirection
            article.appendChild(pcitycountry)
            article.appendChild(ptagline)
            article.appendChild(pprice)
        }

        return (article);
    }


    return { id, name, picture, price, getUserCardDOM }
}

