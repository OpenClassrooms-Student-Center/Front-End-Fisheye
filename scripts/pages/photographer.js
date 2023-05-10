//Mettre le code JavaScript lié à la page photographer.html


const params = (new URL(document.location).searchParams);
const id = parseInt(params.get("id"));

getPhotographers();
console.log(photographers);
// console.log(photographers);
