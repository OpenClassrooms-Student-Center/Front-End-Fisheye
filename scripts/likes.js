// Ajout ou retrait d'un like au clic    
export default class likeEvent {
    constructor() {
        let galerie = document.getElementById('photographer-gallery');

        galerie.addEventListener('click', (e) => {
            let likeBtn = -1 != e.target.classList.value.split(' ').indexOf('fa-heart');
            if (likeBtn) {
                let totalLikes = parseInt(document.getElementById('total-likes').innerHTML);
                let counterLike = e.target.parentNode.firstElementChild.firstElementChild;
                let likeValue = parseInt(counterLike.innerHTML);
                let isLiked = -1 != e.target.classList.value.split(' ').indexOf('isLiked');
                let totalPhLikes = document.getElementById('total-likes');
 
                if (isLiked) {
                    e.target.classList.remove('isLiked');
                    e.target.classList.replace('fas', 'far');
                    totalPhLikes.innerHTML= --totalLikes
                    counterLike.innerHTML = --likeValue
                } else {
                    e.target.classList.add('isLiked');
                    e.target.classList.replace('far', 'fas');
                    totalPhLikes.innerHTML=  ++totalLikes;
                    counterLike.innerHTML = ++likeValue;
                }
              }
        })
    }

}