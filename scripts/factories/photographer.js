/**
 * 
 * @param {*} data du photographe
 * @returns 
 */
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
        img.setAttribute("alt", ""/*name*/)

        return img
    }
    /**
     * 
     * @param {*} level : niveau de titre 
     * @returns {hlevel} : élément titre avec le nom du photographe
     */
    function getName(level=2){
        // Nom du photographe
        const hlevel = document.createElement( 'h'+level );
        hlevel.textContent = name;
        return hlevel
    }

    function getCityCountry(){
        /* City, Country */
        const pcitycountry = document.createElement( 'h2' );
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

    /**
     * La modale de contact contient aussi le nom du photographe
     */
    function AddingNameInModalContact(){
        document.querySelector(".modal header h3").textContent = name;
    }

    /**
     * 
     * @param {*} param0 
     * @returns {article} : l'article pour le header du photographe
     */
    function getUniqPhotograph({article,img,hname,citycountry,slogan}){
        // les champs du header
        div = document.createElement( 'div' );
        div.classList.add("photograph")
        div.appendChild(hname)
        div.appendChild(citycountry)
        div.appendChild(slogan)
        article.appendChild(div)
        article.appendChild(img)
        AddingNameInModalContact()
        return article
    }
    
    /**
     * 
     * @param {*} header 
     * si false: vignette(index.html), si true: header(photographer.html)
     * @returns {article} : élément html
     */
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
        const hname = getName((header)?1:2)

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
                hname:hname,
                citycountry:pcitycountry,
                slogan:ptagline
            })
        }
        else {
            article.appendChild(photographerLink)
            // modification par rapport à la version initiale:
            // le lien englobe la photo et le titre
            photographerLink.appendChild(img);
            photographerLink.appendChild(hname);
            // les nouveaux champs à afficher mais hors lien de redirection
            article.appendChild(pcitycountry)
            article.appendChild(ptagline)
            article.appendChild(pprice)
            article.classList.add("hover_photograf_css")
        }

        return (article);
    }


    return { id, name, picture, price, getUserCardDOM }
}

