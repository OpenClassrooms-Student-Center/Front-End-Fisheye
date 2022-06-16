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

async function displayData(medias, photographer) {
   
    MediaFactory.createMediaCard(medias, photographer);
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

async function sortList(currentMedias, currentPhotographer) {
    const selectElement = document.querySelector('.selected');
    const opt = document.querySelector('.options');
    const optDate = document.querySelector('.optDate');
    const optTitle = document.querySelector('.optTitle');
    const optPopular = document.querySelector('.optPopular');
    

    selectElement.addEventListener('click', () => {
        opt.classList.toggle('hidden');
    });

    if (optDate) {
        optDate.addEventListener('click', () => {
            currentMedias = currentMedias.sort((a, b) => (b.date.localeCompare(a.date)));
            MediaFactory.manageSortList('date');
            document.querySelector("#medias_section").innerHTML = " ";
            MediaFactory.createMediaCard(currentMedias, currentPhotographer);
            sortList(currentMedias, currentPhotographer);
        });
    }
    if (optTitle) {
        optTitle.addEventListener('click', () => {
            MediaFactory.manageSortList('title');
            currentMedias = currentMedias.sort((a, b) => (a.title.localeCompare(b.title)));
            document.querySelector("#medias_section").innerHTML = " ";
            MediaFactory.createMediaCard(currentMedias, currentPhotographer);
            sortList(currentMedias, currentPhotographer);
        });
    }
    if (optPopular) {
        optPopular.addEventListener('click', () => {
            MediaFactory.manageSortList('popular');
            currentMedias = currentMedias.sort((a, b) => (b.likes - a.likes));
            document.querySelector("#medias_section").innerHTML = " ";
            MediaFactory.createMediaCard(currentMedias, currentPhotographer);
            sortList(currentMedias, currentPhotographer);
        });
    }
    
}

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