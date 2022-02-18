// AFFICHE LE PROFIL DES PHOTOGRAPHES (Page photographer/Header)
function profileFactory(data) {
    const { name, portrait, city, country, tagline, price } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const headerPh                      = document.querySelector('.photograph-header');
        const profile                       = document.createElement('div');
        const img                           = document.createElement('img');
        const photographerName              = document.createElement('h2');
        const photographerCity              = document.createElement('p');
        const photographerTagline           = document.createElement('p');
        const priceAndLikes                 = document.createElement('div');
        const photographerPrice             = document.createElement('p');
        const body                          = document.querySelector("body");
        
        profile.style.margin                = "auto 0";
        profile.style.order                 = "1" ; 

        img.setAttribute("src", picture); 
        img.setAttribute("alt", "Portrait de " + name)
        img.style.width                     = "200px";
        img.style.height                    = "200px";
        img.style.objectFit                 = "cover";
        img.style.borderRadius              = "50%";
        img.style.margin                    = "auto 0";
        img.style.order                     = "3"; 

        photographerName.textContent        = name;
        photographerName.style.fontSize     = "64px";
        photographerName.style.color        = "#D3573C";

        photographerCity.textContent        = city + ', ' + country; 
        photographerCity.style.fontSize     = "24px";
        photographerCity.style.color        = "#D3573C";

        photographerTagline.textContent     = tagline;
        photographerTagline.style.fontSize  = "18px";
        photographerTagline.style.marginTop = "20px";
        photographerTagline.style.color     = "#525252";

        priceAndLikes.style.background      = "#D88876";
        priceAndLikes.style.position        = "fixed";
        priceAndLikes.style.bottom          = "0px";
        priceAndLikes.style.right           = "30px";
        priceAndLikes.style.height          = "50px";
        priceAndLikes.style.paddingRight    = "25px";
        
        photographerPrice.textContent       = price + '€/jour';
        photographerPrice.style.fontSize    = "24px";
        photographerPrice.style.lineHeight  = "50px";

        profile.appendChild(photographerName);
        profile.appendChild(photographerCity);
        profile.appendChild(photographerTagline);
        headerPh.appendChild(profile);
        headerPh.appendChild(img);
        body.appendChild(priceAndLikes);
        priceAndLikes.appendChild(photographerPrice);

        return (profile);
    }
    return { name, picture, city, country, tagline, price, getUserCardDOM }
}