export default class PhotographerLikes {
    constructor(medias, photographer) {
        this.medias = medias;
        this.photographer = photographer;
      }
   
   
    renderLikes() {      
            const medias = this.medias
            const photographer = this.photographer
            // Accumuler le nombre total de likes
            const totalLikes = medias.reduce((total, media) => total + media.likes, 0);

            const photographerLikesAndPrice = document.querySelector(".likes_and_price");
            //const photographerPrice = document.querySelector(".photographer_price");

            const LikesAndPrice = `<div class="photographer_likes">
                                      <span class="total_likes">${totalLikes}</span><img src="./assets/icons/heart-black.svg" class="heart"></img>
                                    </div>
                                    <div>
                                        <span class="photographer_price">${photographer.price} $/jour</span>
                                    </div>
                                 `
            photographerLikesAndPrice.innerHTML = LikesAndPrice;
 
    }
    /*
    updateTotalLikes() {
        const totalLikesElement = document.querySelector(".total_likes");
        const allLikes = document.querySelectorAll('.numbers-likes');
        const totalLikes = Array.from(allLikes).reduce((total, like) => total + parseInt(like.textContent), 0);
        totalLikesElement.textContent = totalLikes;    
    }

    toggleLike(heart, numbersLikes) {
    
      !heart.classList.contains("liked") ? this.likes++ : this.likes--;
    
      heart.classList.toggle("liked");
      numbersLikes.textContent = this.likes;
    

    }
*/

}