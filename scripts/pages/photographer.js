const setPhotographerData = async () => {
    const ID = new URL(document.location.href).searchParams.get('id');

    const data = await fetchPhotographers();

    const filteredPhotographer = data.photographers.find(photographer => photographer.id == ID);
    const filteredPhotographerMedia = data.media.filter(media => media.photographerId == ID);
    
    return { filteredPhotographer, filteredPhotographerMedia };
}


const setPhotographer = async () => {
    const { filteredPhotographer, filteredPhotographerMedia } = await setPhotographerData();

    const { id, name, city, country, tagline, price, portrait } = filteredPhotographer;

    const picture = `assets/images/photographers/${portrait}`;

    const elements = `
        <div class="content">
            <h1>${name}</h1>
            <p>${city}, ${country}</p>
            <p>${tagline}</p>
            <!-- <small>200€/jour</small> -->
        </div>
        <button class="contact_button" onclick="displayModal()">
            Contactez-moi
        </button>
        <img src="${picture}" alt="${name}">
    `;

    const photographersSection = document.querySelector(".photograph-header");

    photographersSection.innerHTML = elements;
}

 setPhotographer();