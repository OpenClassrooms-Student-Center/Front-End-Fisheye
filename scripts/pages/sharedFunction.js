async function getPhotographers() {
    const url = "./data/photographers.json"; // Data source .JSON
    photographers = await fetchJSON(url, "photographers"); // use fetchJSON function from utils/fetch.js
    return { photographers }; // Return data of PhotoGraphers
}


async function displayData(photographers, querySelector, id) {

    photographers.forEach((photographer) => {
        if (id) {
            if (photographer.id == id) {
                // Then we are going use the PhotographerFactory to set DOM
                console.log(photographer);
                const photographerModel = photographerFactory(photographer);
                photographerModel.setPhotographerHeader();
                photographerModel.setStickyBarPrice();
                // End of PhotographerFactory Work
            }
        } else {
            // Then we are going use the PhotographerFactory to generate DOM
            const photographersSection = document.querySelector(querySelector);
            const photographerModel = photographerFactory(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
            // End of PhotographerFactory Work
        }
    });
}

async function getMedias() {
    const url = "./data/photographers.json"; // Data source .JSON
    medias = await fetchJSON(url, "media"); // use fetchJSON function from utils/fetch.js
    return { medias }; // Return data of Media
}


async function displayMedia(medias, querySelector, photographerId) {
    let totalLikes = 0;

    medias.forEach((media) => {
        if (photographerId) {
            if (photographerId == media.photographerId) {

                console.log(media);
                // Then we are going use the MediaFactory to generate DOM
                const mediasSection = document.querySelector(querySelector);
                const mediaModel = mediaFactory(media);

                const mediaDOM = mediaModel.getMediaDOM();
                mediasSection.appendChild(mediaDOM);
                // End of MediaFactory Work

                totalLikes += media.likes; // Count all likes
                setInnerHtml(".total_likes", totalLikes);
            }
        }
    });

    console.log("Total Like: " + totalLikes);
}


