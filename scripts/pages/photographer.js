//Mettre le code JavaScript lié à la page photographer.html
let params = new URL(document.location).searchParams;
let photographerId = params.get("id");
console.log(params.get("id"))

async function getData() {
    // Ceci est un exemple de données pour avoir un affichage de photographes de test dès le démarrage du projet, 
    // mais il sera à remplacer avec une requête sur le fichier JSON en utilisant "fetch".
    // fecther les données du JSON
    let reponse = await fetch('data/photographers.json');
    let data = (await reponse).json();
    // et bien retourner le tableau photographers seulement une fois récupéré
    return data;
}

async function headerPhotographer(){
    // recupération des données du photographe dans le tableau
    const getResponse = await getData();
    const arrayPhotographer = getResponse.photographers;
    const arrayMedia = getResponse.media;
    // trouver le nom du photographe pour les images
    const foundPhotographer = arrayPhotographer.find(element => element.id == photographerId);
    // fabrication du header
    //selection Header
    const photographerHeader = document.querySelector('.photograph-header');
    const photographerHeaderModel = photographerFactory(foundPhotographer);
    const userHeaderDOM = photographerHeaderModel.userImageProfil();
    const userContentDOM = photographerHeaderModel.userContent();
    // créer le contenu du header
    photographerHeader.appendChild(userContentDOM);
    photographerHeader.appendChild(userHeaderDOM);

    // filtrer les image du photographe
    const media = arrayMedia.filter(m => m.photographerId === parseInt(photographerId));
    const main = document.querySelector('#main')
    const gallery = document.createElement('div')
    gallery.classList.add('gallery')
    // initialisaton total de likes 
    let totalLikes = 0
    // affichage des images et du contenu
    media.forEach((img) => {
        // creer une par une les images
        const libraryTemplate  = mediaFact(img)
        const displayImg = libraryTemplate.createMedia()
        gallery.appendChild(displayImg)
        main.appendChild(gallery)

        // calculer le nbr de like
        totalLikes += img.likes

        return totalLikes
    })
    //affichage du Prix et nbr de like du photographe
    const boxPrice = document.createElement('div');
    boxPrice.classList.add('boxPrice-photographer')
    // recuperer le prix 
    const photographPrice = document.createElement('p')
    photographPrice.textContent = `${foundPhotographer.price}€/jour`
    // recuperer le nbr de likes
    const likesContainer = document.createElement('p');
    likesContainer.classList.add('photographer-likes');
    likesContainer.textContent = totalLikes;
    // ajout de l'icone
    const icone = document.createElement('i')
    icone.classList.add('fa-solid', 'fa-heart')
    // ajouter tout ensemble
    likesContainer.appendChild(icone)
    boxPrice.appendChild(likesContainer)
    boxPrice.appendChild(photographPrice)
    main.appendChild(boxPrice)
}




async function init(){
    const { photographers, media } = await getData();
    headerPhotographer(photographers, media);

}
init();


