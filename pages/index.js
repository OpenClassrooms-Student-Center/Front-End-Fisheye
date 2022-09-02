import { photographerFactory } from '../scripts/factories/photographers.js';

// Récupère les données des photographes
async function getPhotographers() {
    const getPhotographers = fetch('../../data/photographers.json')
        .then(response => {
            if (response.ok) {
                return response.json()
                    .then(data => {
                        return data.photographers
                    }
                    )
            } else {
                console.error('Retour du serveur : ', response.status)
            }
        })
    return (
        await getPhotographers
    )
}

// Affiche les données des photographes
async function displayData(photographers) {
    const photographersSection = document.querySelector('.photographers');
    photographers.forEach(photographer => {
        const userCardDOM = photographerFactory(photographer, 'index');
        photographersSection.appendChild(userCardDOM);
    });
}

async function init() {
    // Récupère les datas des photographes
    const photographers = await getPhotographers();
    await displayData(photographers);
}

init()
