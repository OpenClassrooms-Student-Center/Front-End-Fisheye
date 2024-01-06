//Mettre le code JavaScript lié à la page photographer.html
import { getPhotographers } from './index.js';

// Création d'un objet URL à partir de l'URL actuelle du document
const url = new URL(document.location);

// Accès aux searchParams de cet objet URL
const params = url.searchParams;

// Récupération de la valeur du paramètre 'id'
const id = params.get('id');

console.log(id);

async function displayPhotographer() {
  const datas = await getPhotographers();
  console.log(datas);
}
