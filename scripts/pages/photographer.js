// Gets photograper
const getPhotographerData = async () => {
    const ID = new URL(document.location.href).searchParams.get('id');

    const data = await fetchPhotographers();

    const filteredPhotographer = data.photographers.find(photographer => photographer.id == ID);
    const filteredPhotographerMedia = data.media.filter(media => media.photographerId == ID);
    
    return { filteredPhotographer, filteredPhotographerMedia };
};


// Sets photograper header
const setPhotograperHeader = (name, city, country, tagline, portrait) => {
    const photographerHeader = document.querySelector(".photograph-header");

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

    photographerHeader.innerHTML = header;
};


let totalLikes = 0;
let cardIndex = 0;

// Creates factory pattern
const mediaFactory = (object, name) => {  

    const media = {
        title: object.title,
        mediaUrl: object.image ? object.image : object.video,
        likes: object.likes,
        id: object.id,

        createMedia: () => {
            totalLikes += media.likes;

            const ExtentionType = media.mediaUrl.split('.')[1];
            const mediaElement = ExtentionType === 'mp4' ?
                `<video controls><source src="./assets/images/photographersWorks/${name.split(' ')[0]}/${media.mediaUrl}"/></video>`
                : `<img src="./assets/images/photographersWorks/${name.split(' ')[0]}/${media.mediaUrl}" alt="${media.title}">`                
            
            return `
                <div class="card" data-index="${cardIndex++}">
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
};


// Calls factory function
const callFactoryFunction = (filteredPhotographerMedia, name) => {
    
    const photographerMedia = document.querySelector(".galary-wrapper");
    photographerMedia.replaceChildren();

    filteredPhotographerMedia.forEach(media =>{ 
        photographerMedia.innerHTML += mediaFactory(media, name).createMedia();
    });
};


// Adding likes and pricing info
const addTotalLikesAndPricingInfo = (price) => {
    const photographerMedia = document.querySelector(".galary-wrapper");

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
    });
};


// Sorting media
const sortingMedia = (filteredPhotographerMedia, name) => {
    const select = document.querySelector('.select-container>select');

    select.addEventListener('change', (event) => {

        const filterType = event.target.value;
        
        const sortedPhotographerMedia = filteredPhotographerMedia.sort((a, b) => {

                if(filterType === 'popularity') {

                    return b.likes - a.likes;

                } else if (filterType === 'title') {

                    const titleA = a.title.toLowerCase();
                    const titleB = b.title.toLowerCase();

                    if (titleA < titleB) return -1;
                    if (titleA > titleB) return 1;
                    
                } else if(filterType === 'date') {
                    if (new Date(a.date) > new Date(b.date)) return -1;
                    if (new Date(a.date) < new Date(b.date)) return 1;
                }
            });
        // console.log(sortedPhotographerMedia);
        callFactoryFunction(sortedPhotographerMedia, name);
    });
};

// Creating lightbox
const createLightboxElements = () => {
    const cards = document.getElementsByClassName('card');
   
    // Creating elements
    const lightBoxCotainer = document.createElement('div');
    const lightBoxContent = document.createElement('div');
    const lightBoxImage = document.createElement('img');
    const lightBoxVideo = document.createElement('video');
    const lightBoxSource = document.createElement('source');
    const lightBoxPrev = document.createElement('i');
    const lightBoxNext = document.createElement('i');

    // Adding classes
    lightBoxCotainer.classList.add('lightbox');
    lightBoxContent.classList.add('lightbox-content');
    lightBoxImage.classList.add('lightbox-image');
    lightBoxPrev.classList.add('fa', 'fa-angle-left', 'light-box-prev');
    lightBoxNext.classList.add('fa', 'fa-angle-right', 'light-box-next');

    // Appending child elements
    lightBoxCotainer.appendChild(lightBoxContent);  
    lightBoxContent.appendChild(lightBoxImage);
    lightBoxContent.appendChild(lightBoxVideo);
    lightBoxContent.appendChild(lightBoxPrev);
    lightBoxContent.appendChild(lightBoxNext);

    document.body.appendChild(lightBoxCotainer);
   
    function showLightBox(mediaIndex, mediaType) {
     
        lightBoxCotainer.style.display = 'block';

        const mediaLocation = cards[mediaIndex].children[0];

        if(mediaType === 'img'){

            lightBoxVideo.style.display = 'none';
            lightBoxImage.style.display = 'block';

            lightBoxImage.setAttribute('src',  mediaLocation.getAttribute('src'));

        } else if(mediaType === 'video') {

            lightBoxImage.style.display = 'none';
            lightBoxVideo.style.display = 'block';

            lightBoxVideo.controls = true;
            lightBoxVideo.autoplay = true;

            lightBoxVideo.appendChild(lightBoxSource);

            lightBoxSource.setAttribute('src', mediaLocation.children[0].getAttribute('src'));
        } 
    };


    function currentImage(event) {
        const mediaType = event.target.localName;   
        const mediaIndex = parseInt(this.parentElement.getAttribute('data-index'));

        showLightBox(mediaIndex, mediaType);
    };

    // Openning lightbox on clikc
    Array.from(cards).forEach(card => {
        card.children[0].addEventListener('click', currentImage);
    })

    // Closing lightBox
    function closeLightbox(event) {
        if(this === event.target) {
            lightBoxCotainer.style.display = 'none';
        }
    };

    lightBoxCotainer.addEventListener('click', closeLightbox);
};  


// inits photograper
const initPhotographer = async () => {
    const { filteredPhotographer, filteredPhotographerMedia } = await getPhotographerData();

    const { id, name, city, country, tagline, price, portrait } = filteredPhotographer;
     
    setPhotograperHeader(name, city, country, tagline, portrait);
    callFactoryFunction(filteredPhotographerMedia, name);
    addTotalLikesAndPricingInfo(price);
    sortingMedia(filteredPhotographerMedia, name);
    createLightboxElements();
};
initPhotographer();

