export default class PhotographerLikes {
	constructor(medias, photographer) {
		this.medias = medias
		this.photographer = photographer
	}
    
	render() {      
		const medias = this.medias
		const photographer = this.photographer
		const photographerLikesAndPrice = document.querySelector(".likes_and_price")

		// Accumuler le nombre total de likes
		const totalLikes = medias.reduce((total, media) => total + media.likes, 0)
           
		const LikesAndPrice = `<div class="photographer_likes">
                                      <span class="total_likes">${totalLikes}</span><img src="./assets/icons/heart-black.svg" class="heart"></img>
                                    </div>
                                    <div>
                                        <span class="photographer_price">${photographer.price} € / jour</span>
                                    </div>
                                 `
		photographerLikesAndPrice.innerHTML = LikesAndPrice
	}

}