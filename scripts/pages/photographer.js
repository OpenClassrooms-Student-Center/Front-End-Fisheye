//Mettre le code JavaScript lié à la page photographer.html
let url = new URL(window.location.href);
let id = url.searchParams.get("id");

//méthode qui récupère les data du json, les photographe et les photo(media)
async function getMedia() {  
    let medias= [];
    await fetch("../data/photographers.json")
        .then((res)=> res.json())
        .then((data) => (medias = data))
        .catch(err => console.log('oh no', err))
    return medias
}

const table=[];
async function setMedia(medias, photographers) {
//récupère les donnés du photographe grace a son id    
    const PhotographersData = photographers
    const photographSection = document.querySelector(".photograph_section");    
    PhotographersData
        .map(photographer =>  new Photographer(photographer))
        .forEach((photographer) => {           
            if(photographer.id == id){               
                const photograph = new PhotographCard(photographer)
                photographSection.innerHTML = photograph.getPhotographCardDOM();
                photographe = photographer
            }
        });
//récupère les medias propre au photographe choisi    
    const mediasData = medias
    const mediaSection = document.querySelector(".media_section");
    
    let x=0
    mediasData
        .map(media =>  new Media(media))
        .forEach(( media) => {                      
            if(media.photographerId == id){                      
                table[x]=media;
                x=x+1;
            }
        });
//on a mis uniquement les media d'un photographe et on les tri par like puis on les affiches
    table.sort((a,b)=>(a._likes <b._likes ? 1 : -1))   
    table.forEach(( media) => {                      
            const Template = new MediaCard(media, photographe)
            mediaSection.appendChild(Template.getMediaCardDOM())        
    });
};

const sort = document.getElementById("photo-select")
console.log(sort.value);
sort.addEventListener("change", modifySort)

function modifySort(){
    const mediaSection = document.querySelector(".media_section");
    mediaSection.innerHTML="";
    if(sort.value == "Date"){
        table.sort((a,b)=>(a._date <b._date ? 1 : -1))
        table.forEach(( media) => {                      
            const Template = new MediaCard(media, photographe)
            mediaSection.appendChild(Template.getMediaCardDOM())        
    });
    }
    else if(sort.value == "Titre"){
        table.sort((a,b)=>(a._title >b._title ? 1 : -1))
        table.forEach(( media) => {                      
            const Template = new MediaCard(media, photographe)
            mediaSection.appendChild(Template.getMediaCardDOM())        
    });
    }
    else if(sort.value == "Popularité"){
        table.sort((a,b)=>(a._likes <b._likes ? 1 : -1))
        table.forEach(( media) => {                      
            const Template = new MediaCard(media, photographe)
            mediaSection.appendChild(Template.getMediaCardDOM())        
    });
    }
    
}

async function initMedia() {
    // Récupère les datas des photographes
    const  mediaUser  = await getMedia();
    const { media } = mediaUser;
    const { photographers } = mediaUser;
    setMedia(media, photographers);
};

initMedia();