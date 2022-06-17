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

// async function sortList(currentMedias, currentPhotographer) {
    
//     const selectElement = document.querySelector('.sort_list--select');
//     const optPopular = document.querySelector('.sort_list--select :nth-child(1)');
//     const optDate = document.querySelector('.sort_list--select :nth-child(2)');
//     const optTitle = document.querySelector('.sort_list--select :nth-child(3)');
//     selectElement.addEventListener('change', (event) => {
//         switch (event.target.value) {
//             case 'popular':
//                 currentMedias = currentMedias.sort((a, b) => (b.likes - a.likes));
//                 optPopular.classList.add('selected');
//                 optDate.classList.remove('selected');
//                 optTitle.classList.remove('selected');
//                 break;
//             case 'date':
//                 currentMedias = currentMedias.sort((a, b) => (b.date.localeCompare(a.date)));
//                 optPopular.classList.remove('selected');
//                 optDate.classList.add('selected');
//                 optTitle.classList.remove('selected');
//                 break;
//             case 'title':
//                 currentMedias = currentMedias.sort((a, b) => (a.title.localeCompare(b.title)));
//                 optPopular.classList.remove('selected');
//                 optDate.classList.remove('selected');
//                 optTitle.classList.add('selected');
//                 break;
//             default:
//                 currentMedias = mediasOfPhotographer.sort((a, b) => (b.likes - a.likes));
//                 break;
//         }
//         document.querySelector("#medias_section").innerHTML = " ";
//         MediaFactory.createMediaCard(currentMedias, currentPhotographer);
//     });
// }
async function sortList(currentMedias, currentPhotographer) {
    const selectElement = document.querySelector('.selected');
    const options = document.querySelector('.options');
    const optDate = document.querySelector('.optDate');
    const optTitle = document.querySelector('.optTitle');
    const optPopular = document.querySelector('.optPopular');    

    selectElement.addEventListener('click', () => {
        console.log('click');
        options.classList.toggle('hidden');
    });

    if (optDate) {
        optDate.addEventListener('click', () => {
            currentMedias = currentMedias.sort((a, b) => (b.date.localeCompare(a.date)));
            refreshSortList(currentMedias, currentPhotographer, "date");
        });
    }
    if (optTitle) {
        optTitle.addEventListener('click', () => {
            currentMedias = currentMedias.sort((a, b) => (a.title.localeCompare(b.title)));
            refreshSortList(currentMedias, currentPhotographer, "title");
        });
    }
    if (optPopular) {
        optPopular.addEventListener('click', () => {
            currentMedias = currentMedias.sort((a, b) => (b.likes - a.likes));
            refreshSortList(currentMedias, currentPhotographer, "popular");
        });

    function refreshSortList(currentMedias, currentPhotographer, opt) {
        MediaFactory.manageSortList(opt);
        document.querySelector("#medias_section").innerHTML = " ";
        MediaFactory.createMediaCard(currentMedias, currentPhotographer);
        MediaFactory.createLikesCountCard();
        likesClick();
        Lightbox.init();
    }
    }
    
        // switch (selectElement.getAttribute('data-criterion')) {
        //                 case 'popular':
        //                     currentMedias = currentMedias.sort((a, b) => (b.likes - a.likes));
        //                     break;
        //                 case 'date':
        //                     currentMedias = currentMedias.sort((a, b) => (b.date.localeCompare(a.date)));
        //                     break;
        //                 case 'title':
        //                     currentMedias = currentMedias.sort((a, b) => (a.title.localeCompare(b.title)));
        //                     break;
        //                 default:
        //                     currentMedias = mediasOfPhotographer.sort((a, b) => (b.likes - a.likes));
        //                     break;
        //             }
        
        // document.querySelector("#medias_section").innerHTML = " ";
        // MediaFactory.createMediaCard(currentMedias, currentPhotographer);
    
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