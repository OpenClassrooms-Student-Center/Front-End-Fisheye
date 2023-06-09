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
        let e=0;
//on a mis uniquement les media d'un photographe et on les tri par like puis on les affiches
    table.sort((a,b)=>(a._likes <b._likes ? 1 : -1))   
    table.forEach(( media) => {                      
            const Template = new MediaCard(media, photographe)
            mediaSection.appendChild(Template.getMediaCardDOM(e))
            e=e+1;        
    });

//on récupère et affiche le total des likes et le prix

    const likeAndPrice = document.getElementById("likeAndPrice");
    let nbrLike = 0;
    table.forEach((media)=>{

        nbrLike = nbrLike + media._likes;
    })
    likeAndPrice.innerHTML = `
        <span>
        <span id="likeTotal">${nbrLike}</span> <i class="fa-solid fa-heart"></i></span>
        <span>${photographe._price}€/jour</span>
    `

};
// modification du tri des images par date/titre/popularité
const sort = document.getElementById("photo-select")
sort.addEventListener("change", modifySort)

function modifySort(){
    const mediaSection = document.querySelector(".media_section");
    mediaSection.innerHTML="";
    let e=0;
    if(sort.value == "Date"){
        table.sort((a,b)=>(a._date <b._date ? 1 : -1))
        table.forEach(( media) => {                      
            const Template = new MediaCard(media, photographe)
            mediaSection.appendChild(Template.getMediaCardDOM(e)) 
            e=e+1;       
    });
    }
    else if(sort.value == "Titre"){
        table.sort((a,b)=>(a._title >b._title ? 1 : -1))
        table.forEach(( media) => {                      
            const Template = new MediaCard(media, photographe)
            mediaSection.appendChild(Template.getMediaCardDOM(e)) 
            e=e+1;       
    });
    }
    else if(sort.value == "Popularité"){
        table.sort((a,b)=>(a._likes <b._likes ? 1 : -1))
        table.forEach(( media) => {                      
            const Template = new MediaCard(media, photographe)
            mediaSection.appendChild(Template.getMediaCardDOM(e))
            e=e+1;        
    });
    }
    
}

//lightbox
let index=0;
function lightboxOn(e){
    index=e
    const lightbox = document.getElementById("imageCloseUp");
	lightbox.style.display = "block";
    const html = document.querySelector("html");
    html.style.overflowY = "hidden";
    console.log(table[e])
    if(table[e]._image){
        let box = `
            <div class="lightbox">
                <span class="close" onclick="lightboxOff()">X</span>
                <span id="previous" onclick="lightboxOn(${e-1})"><</span>
                <div>
                <img id="truc" src="/assets/photographers/${table[e]._photographerId}/${table[e]._image}"  />
                <p>${table[e]._title}</p>
                </div>
                <span id="next" onclick="lightboxOn(${e+1})">></span> 
            </div>
            `
            lightbox.innerHTML= box;
    }
    else if(table[e]._video){
        const ext = table[e]._video.split(".",2)[1]
        let box = `
            <div class="lightbox">
                <span class="close" onclick="lightboxOff()">X</span>
                <span id="previous" onclick="lightboxOn(${e-1})"><</span>
                <div>
                <video controls >
                <source src="/assets/photographers/${table[e]._photographerId}/${table[e]._video}" type="video/${ext}">
                </video>
                <p>${table[e]._title}</p>
                </div>
                <span id="next" onclick="lightboxOn(${e+1})">></span> 
            </div>
            `
            lightbox.innerHTML= box;
    }  
        if(e == table.length-1){
            const next = document.getElementById("next");
            next.innerHTML = ""
        }
        if(e == 0){
            const previous = document.getElementById("previous");
            previous.innerHTML = ""
        }
}

function lightboxOff(){
    const lightbox = document.getElementById("imageCloseUp");
	lightbox.style.display = "none";
    const html = document.querySelector("html");
    html.style.overflowY = "visible";
}


window.addEventListener('keydown', function (event) {
    const lightbox = document.getElementById("imageCloseUp");
	if(lightbox.style.display == "block"){
        if (event.key == "ArrowLeft") {
           if(index > 0){                    
            lightboxOn(index-1);
            console.log("test--")
           }
        }
        else if(event.key == "ArrowRight"){
            if(index < table.length-1){
                lightboxOn(index+1);
                console.log("test++")
            }
        }
        else if (event.key == "Escape"){
            lightboxOff()
        }  
    }
})

//like et dislike

function like(e){
    const like = document.getElementsByClassName(`like-${e}`);
    const nbrLike = document.getElementsByClassName(`nbrLike-${e}`);
    let a= Number(nbrLike[0].outerText) + 1;
    like[0].innerHTML = `<span class="nbrLike-${e}"> ${a} </span><i class="fa-solid fa-heart" onclick="dislike(${e})"></i>` ;
    const likeTotal = document.getElementById("likeTotal");
    let b = Number(likeTotal.innerText) + 1;
    likeTotal.innerText = b;
}

function dislike(e){
    const like = document.getElementsByClassName(`like-${e}`);
    const nbrLike = document.getElementsByClassName(`nbrLike-${e}`);
    let a= Number(nbrLike[0].outerText) - 1;
    like[0].innerHTML = `<span class="nbrLike-${e}"> ${a} </span><i class="fa-regular fa-heart" onclick="like(${e})"></i>` ;
    let b = Number(likeTotal.innerText) - 1;
    likeTotal.innerText = b;
}

async function initMedia() {
    // Récupère les datas des photographes
    const  mediaUser  = await getMedia();
    const { media } = mediaUser;
    const { photographers } = mediaUser;
    setMedia(media, photographers);
};

initMedia();
