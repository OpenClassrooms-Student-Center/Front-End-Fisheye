console.log("Window location:", window.location)

const urlSearchParams = URL.searchParams;
let params = (new URL(window.location)).searchParams;

console.log("parametres:", params)

let id = params.get("id");

console.log("id:", id)

// async function photographerPage() {
//     let page = await fetch('data/photographers.json')
//     const idPhotographeSelected = page.find((element)=> element.id === id);
//     if (idPhotographeSelected.ok === true) {
//         return idPhotographeSelected.json();
//     }
//     throw new Error ('Impossible de contacter le serveur')
// }

// photographerPage().then(idPhotographeSelected => console.log(idPhotographeSelected))

// PhotographerPage().then(page => console.log(page))


// const idPhotographeSelected = PhotographerPage().then.find((element)=> element.id === id);
// console.log(idPhotographeSelected);


let page = await fetch(`data/photographers.json`)
.then(r => r.json())
            
// console.log("liste des photographes", page.photographers)
// const idPhotographeSelected = page.find((element)=> element.id === id);
// console.log(idPhotographeSelected)

const pagePhotographe = page.photographers;
console.log(page)

console.log("liste des photographes", pagePhotographe);

const photographeSelectedById = pagePhotographe.find((element) => element.id == id);
console.log(photographeSelectedById);