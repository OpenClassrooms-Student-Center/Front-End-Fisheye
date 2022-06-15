//Get the "id" parameter in URL
const photographerUrl = window.location.search;
const urlParams = new URLSearchParams(photographerUrl);
const photographerId = urlParams.get('id')

async function getPhotographers() {
    return fetch("../data/photographers.json")
        .then(function (res) {
            if (res.ok) {
                return res.json();
            }
        })
        .then(function (data) {
            return data;
        })
        .catch(function (err) {
            alert("Erreur : " + err);
        });
}

async function displayData(currentMedias, currentPhotographer) {
   
    MediaFactory.createMediaCard(currentMedias, currentPhotographer);
    MediaFactory.createPhotographerHeader();
    MediaFactory.createLikesCountCard();
    MediaFactory.displayNameInModal();
    MediaFactory.createSortList();
};

//Like btn incrementation
async function likesClick() {
    const likeBtn = document.querySelectorAll(".likes i");
    const totalLikes = document.querySelector(".likes-count");
    
    likeBtn.forEach((btn) => {
        btn.addEventListener("click", () => {
            const likeNumber = btn.parentNode.firstChild;

            if (btn.classList.contains('fa-regular')) {
                btn.classList.replace('fa-regular', 'fa-solid');
                likeNumber.textContent = (parseInt(likeNumber.textContent) + 1);
                totalLikes.textContent = (parseInt(totalLikes.textContent) + 1);
                
            } else if (btn.classList.contains('fa-solid')){
                btn.classList.replace('fa-solid', 'fa-regular');
                likeNumber.textContent = (parseInt(likeNumber.textContent) - 1);
                totalLikes.textContent = (parseInt(totalLikes.textContent) - 1);
            }
        });
    })
};

async function init() {
    //Get data for photographers and media
    const { photographers, media } = await getPhotographers();
    const currentPhotographer = photographers.find(id => id.id == photographerId)
    const mediasOfPhotographer = media.filter(media => media.photographerId == photographerId)
    
    const mediasSortLikes = mediasOfPhotographer.sort((a, b) => (b.likes - a.likes));
    const mediasSortTitle = mediasOfPhotographer.sort((a, b) => (a.title.localeCompare(b.title)));
    const mediaSortDate = mediasOfPhotographer.sort((a, b) => (b.date.localeCompare(a.date)));

    let currentMedias = mediasSortLikes;
    // const selectElement = document.querySelector('.sort_list--select');
    // selectElement.addEventListener('change', (event) => {
    //     switch (event.target.value) {
    //         case 'popular':
    //             currentMedias = mediasSortLikes;
    //             break;
    //         case 'date':
    //             currentMedias = mediaSortDate;
    //             break;
    //         case 'title':
    //             currentMedias = mediasSortTitle;
    //             break;
    //         default:
    //         currentMedias = mediasSortLikes;
    //         break;
    //     }
    // });

    displayData(currentMedias, currentPhotographer);

    likesClick();

    Lightbox.init()

};

init();