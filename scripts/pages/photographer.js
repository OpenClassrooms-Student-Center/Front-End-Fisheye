//Get the "id" parameter in URL
const photographerUrl = window.location.search;
const urlParams = new URLSearchParams(photographerUrl);
const photographerId = urlParams.get('id')

async function getPhotographers() {
    return fetch("/data/photographers.json")
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

async function displayData(medias, photographer) {
    MediaFactory.createMediaCard(medias, photographer);
    MediaFactory.createPhotographerHeader();
    MediaFactory.createLikesCountCard();
    MediaFactory.displayNameInModal();
    MediaFactory.createSortList();
};

//Like btn incrementation
async function likesClick() {
    const likeBtn = document.querySelectorAll(".likes button");
    const heart = document.querySelectorAll(".likes i");
    const totalLikes = document.querySelector(".likes-count");
    
    likeBtn.forEach((btn) => {
        btn.addEventListener("click", () => {
            const likeNumber = btn.parentNode.firstChild;

            if (btn.firstChild.classList.contains('fa-regular')) {
                btn.firstChild.classList.replace('fa-regular', 'fa-solid');
                likeNumber.textContent = (parseInt(likeNumber.textContent) + 1);
                totalLikes.textContent = (parseInt(totalLikes.textContent) + 1);
                
            } else if (btn.firstChild.classList.contains('fa-solid')){
                btn.firstChild.classList.replace('fa-solid', 'fa-regular');
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
    let currentMedias = mediasOfPhotographer.sort((a, b) => (b.likes - a.likes));
    
    displayData(currentMedias, currentPhotographer);
    likesClick();
    Lightbox.init()
    sortList(currentMedias, currentPhotographer);
};

init();