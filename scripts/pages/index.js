   

// Récupération du JSON

let photographers = [];

const fetchPhotographers = async () => {
    await fetch('/data/photographers.json')
    .then((res) => res.json())
    .then((promise) => {
        photographers = promise;
    });

};


// Utilisation du json pour le menu

const photographerDisplay = async (a) => {
    
    await fetchPhotographers();

    const div_photographers_main = document.getElementById('photographer_section')
    
    let div_main = document.createElement("div")
    
    let picture_photographers = document.createElement("img")
    picture_photographers.classList.add('img_main');
    
        
    
    
    let portrait = './assets/photographers/' + (photographers.photographers[a].portrait)
    picture_photographers.src = portrait

    const link = document.createElement('a')
    link.href = "/photographer.html?id="  + (photographers.photographers[a].id) 

    const paragraph_name = document.createElement( 'h2' );
        paragraph_name.textContent = (photographers.photographers[a].name);

    const h3 = document.createElement( 'h3' );
        h3.textContent = (photographers.photographers[a].city) + ', ' + (photographers.photographers[a].country) ;
        
    const paragraph_tagline = document.createElement('p')
        paragraph_tagline.textContent = (photographers.photographers[a].tagline);
        paragraph_tagline.classList.add('text_main')
        paragraph_tagline.classList.add('bold')
    
    const paragraph_price = document.createElement('p');
        paragraph_price.textContent =  (photographers.photographers[a].price) + "€/jour";
        paragraph_price.classList.add('color_grey');
        paragraph_price.classList.add('text_main');
    
    
    div_photographers_main.appendChild(div_main);
    div_main.appendChild(link)
    link.appendChild(picture_photographers);
    div_main.appendChild(paragraph_name);
    div_main.appendChild(h3);
    div_main.appendChild(paragraph_tagline);
    div_main.appendChild(paragraph_price);
    
    
  
};
for (a = 0 ; a < 6 ; a++){
    photographerDisplay(a)
}    













    