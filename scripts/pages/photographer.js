//Mettre le code JavaScript lié à la page photographer.html
let params = new URL(document.location).searchParams;
let photographerId = params.get("id");

async function getData() {
    let reponse = await fetch('data/photographers.json');
    let data = (await reponse).json();
    // bien retourner les tableaux une fois récupéré
    return data;
}


async function headerPhotographer(foundPhotographer){
    // fabrication du header
    //selection Header
    const photographerHeader = document.querySelector('.photograph-header');
    const photographerHeaderModel = photographerFactory(foundPhotographer);
    const userHeaderDOM = photographerHeaderModel.userImageProfil();
    const userContentDOM = photographerHeaderModel.userContent();
    // créer le contenu du header
    photographerHeader.appendChild(userContentDOM);
    photographerHeader.appendChild(userHeaderDOM);
}

async function displayMedia(photo){
    const main = document.querySelector('#main')
    const gallery = document.createElement('div')
    gallery.classList.add('gallery')
    // affichage des images et du contenu
    photo.forEach((img) => {
        // creer une par une les images
        const libraryTemplate  = mediaFactory(img)
        const displayImg = libraryTemplate.createMedia()
        gallery.appendChild(displayImg)
        main.appendChild(gallery)
    })

    
}

async function priceContainer({foundPhotographer, photo}){
    //affichage du Prix et nbr de like du photographe
    const boxPrice = document.createElement('div');
    boxPrice.classList.add('boxPrice-photographer')
    // recuperer le prix 
    const photographPrice = document.createElement('p')
    photographPrice.textContent = `${foundPhotographer.price} €/jour`

    // nombre de likes
    const likeContainer = document.createElement('p');
    likeContainer.classList.add('photographer-likes');
    // calcul du nombre total de likes
     var totalLikes = 0
    photo.forEach((like) => {
        totalLikes += like.likes
    })
    likeContainer.textContent = totalLikes;

    // ajout de l'icone
    const icone = document.createElement('i')
    icone.classList.add('fa-solid', 'fa-heart')
    // ajouter tout ensemble
    likeContainer.appendChild(icone)
    boxPrice.appendChild(likeContainer)
    boxPrice.appendChild(photographPrice)
    main.appendChild(boxPrice)

    // Ecouter les boutons et les transformer d'une nodeList a un tableau 
    const selectionButton = document.querySelectorAll('.like-button')
    const buttonisNotLiked = Array.from(selectionButton)
    //  Aller chercher les elemnts contenant le nbr de likes et les transformer d'une nodeList a un tableau
    const LikesImg = document.querySelectorAll('.nbr_of_likes')
    const nbrlike = Array.from(LikesImg)
    // mapper le tableau pour n'afficher que les chiffres des elements avec parseInt()
    let nbrLikesImg = nbrlike.map(element => parseInt(element.textContent))


    // ajouter une boucle pour permettre de faire un like au clic et retrait d'un like au reclic
    buttonisNotLiked.forEach( (buttons, i) => {
        buttons.addEventListener('click', function(){            
            if(this.classList.contains('--liked')){
                this.classList.remove('--liked')
                nbrLikesImg[i]--
                totalLikes--
                likeContainer.innerHTML = totalLikes
                nbrlike[i].innerHTML = nbrLikesImg[i]
            }else{
                this.classList.toggle('--liked')
                nbrLikesImg[i]++
                totalLikes++
                likeContainer.innerHTML = totalLikes
                nbrlike[i].innerHTML = nbrLikesImg[i]                
            }
        })
    });
}

async function initPhotographer(){
    const { photographers, media } = await getData();
    // trouver le nom du photographe pour les images
    const foundPhotographer = photographers.find(element => element.id == photographerId);
    // filtrer les image du photographe
    const photo = media.filter(m => m.photographerId === parseInt(photographerId));
    headerPhotographer(foundPhotographer);
    displayMedia(photo);
    priceContainer({foundPhotographer, photo});
}
initPhotographer();
