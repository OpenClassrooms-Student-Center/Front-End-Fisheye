// Permet de recuperer l'ID du photographe
let params = new URL(document.location).searchParams;
let id = parseInt(params.get("id"));
console.log(id)


// const photographName = document.querySelector('.photograph-name');
// photographName.textContent = `${name}`
