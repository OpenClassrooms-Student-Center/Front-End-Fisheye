// Récupération des données brutes
const datas = await get_Datas();
// Récupération de l'id du photographe dans l'url
const id = get_ID_from_url();
// Récupération des photographes
const photographers = datas.photographers;
// Récupération des donnes  du photographe selon l'id de la page 
const photographer = photographers.find(
  (photographer) => photographer.id == id
);


async function get_Datas() {
    let response = await fetch("./data/photographers.json");
    // et bien retourner le tableau photographers seulement une fois récupéré
    const Datas = await response.json();
    return Datas;
  }

// Fonction pour récupérer l'id du photographe dans l'url
function get_ID_from_url() {
  let url = window.location.search; // Récupère l'url
  let urlParams = new URLSearchParams(url); // Récupère les paramètres de l'url
  let id = urlParams.get("id"); // Récupère l'id de l'url
  return id;
}

function get_name_by_id() {  // Fonction pour récupérer le nom du photographe par son id
  let photographer = photographers.find(
    (photographer) => photographer.id == id
  ); // Récupère les données du photographe
  let fullname = photographer.name; // Récupère le nom du photographe
  const Pname = fullname.split(" ")[0]; // Récupère le prénom du photographe
  return Pname;
}   


function sortbyPops(Usermedias) {
  const medias = Usermedias;
  medias.sort((a, b) => {
    return b.likes - a.likes;
  });
  return medias;
}

function sortbyDate(Usermedias) {
  const medias = Usermedias;
  medias.sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });
  return medias;
}

function sortbyTitle(Usermedias) {
  const medias = Usermedias;
  medias.sort((a, b) => {
    return a.title.localeCompare(b.title);
  });
  return medias;
}


export { datas, id, photographer,  get_Datas, get_ID_from_url, get_name_by_id, sortbyPops, sortbyDate, sortbyTitle};