//Mettre le code JavaScript lié à la page photographer.html
let params = new URL(document.location).searchParams;
let photographerId = params.get("id");


async function getPhotographers() {
    // Ceci est un exemple de données pour avoir un affichage de photographes de test dès le démarrage du projet, 
    // mais il sera à remplacer avec une requête sur le fichier JSON en utilisant "fetch".
    let reponse = await fetch('data/photographers.json');
    let photographers = (await reponse).json();

    // et bien retourner le tableau photographers seulement une fois récupéré
    return photographers;
}

async function tableauPhotographer(){
    // recupération des données du photographe dans le tableau
    const getResponse = await getPhotographers();
    const arrayPhotographer = getResponse.photographers;
    const foundId = arrayPhotographer.find(element => element.id == photographerId);

    // fabrication du header
    const photographerHeader = document.querySelector('.photograph-header');
    const headerElement = document.createElement('div');
    headerElement.innerHTML = "bonjour";
    const photographerHeaderModel = photographerFactory(foundId);
    const userHeaderDOM = photographerHeaderModel.userImageProfil();
    const userContentDOM = photographerHeaderModel.userContent();
    
    photographerHeader.appendChild(userContentDOM);
    photographerHeader.appendChild(userHeaderDOM);


}
tableauPhotographer();
