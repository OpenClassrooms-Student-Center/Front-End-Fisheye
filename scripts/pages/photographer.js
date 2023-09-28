// Gets photograper
const getPhotographerData = async () => {
    const ID = new URL(document.location.href).searchParams.get('id');

    const data = await fetchPhotographers();

    const filteredPhotographer = data.photographers.find(photographer => photographer.id == ID);
    const filteredPhotographerMedia = data.media.filter(media => media.photographerId == ID);
    
    return { filteredPhotographer, filteredPhotographerMedia };
}

// Sets photograper
const setPhotographer = async () => {
    const { filteredPhotographer, filteredPhotographerMedia } = await getPhotographerData();

    const { id, name, city, country, tagline, price, portrait } = filteredPhotographer;

    const picture = `assets/images/photographers/${portrait}`;

    const header = `
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

    let totalLikes = 0;
    // Creates factory pattern
    const mediaFactory = (objet) => {  
       
        const media = {
           title: objet.title,
           mediaUrl: objet.image ? objet.image : objet.video,
           likes: objet.likes,

            createMedia: () => {
                const ExtentionType = media.mediaUrl.split('.')[1];
                let mediaElement = '';
                totalLikes += media.likes;

                mediaElement = ExtentionType === 'mp4' ?
                   `<video controls><source src="./assets/images/photographersWorks/${name.split(' ')[0]}/${media.mediaUrl}"></source></video>`
                   : `<img src="./assets/images/photographersWorks/${name.split(' ')[0]}/${media.mediaUrl}" alt="${media.title}">`                
               
                return `
                    <div class="card">
                        ${ mediaElement }
                        <div>
                            <h2>${media.title}</h2>
                            <div>
                                <small>${media.likes}</small>
                                <i class="fa-solid fa-heart"></i>
                            </div>
                        </div>
                    </div>`;
            },
        }       
        return media;
    }

    const photographerHeader = document.querySelector(".photograph-header");
    const photographerMedia = document.querySelector(".galary-wrapper");

    photographerHeader.innerHTML = header;
    photographerMedia.innerHTML = filteredPhotographerMedia.map(media => {
        return mediaFactory(media).createMedia();
    });

    // Adding likes and pricing info
    const likesAndPricing = `
        <div class="photograph-likes-pricing">
            <div>
                <span> ${totalLikes} </span> <i class="fa-solid fa-heart"></i>
            </div>
            <span>${price}€ / jour</span>
        </div>`;

    photographerMedia.parentElement.innerHTML  += likesAndPricing;


    const totalMediaLikes = document.querySelector(".photograph-likes-pricing span");

    Array.from(document.querySelectorAll('.galary-wrapper .card i')).map(like => {
        like.addEventListener('click', () => {

            const small = like.parentElement.firstElementChild;
            const likes =  parseInt(small.textContent);
            small.textContent = likes + 1;
         
            const parsedTotalMediaLikes = parseInt(totalMediaLikes.textContent);
            totalMediaLikes.textContent = parsedTotalMediaLikes + 1;
           
        });
    })

}

setPhotographer();