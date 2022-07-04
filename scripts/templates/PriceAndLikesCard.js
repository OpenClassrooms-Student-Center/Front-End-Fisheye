export { PriceAndLikesCard }
class PriceAndLikesCard {
    constructor(likes, price) {
        this.price = price
        this.likes = likes
    }
 
    getPriceAndLikesDom() {
        const div = document.createElement('div')

        div.setAttribute('class', 'priceAndLikes')
        div.innerHTML = `
            <div class="likeContent">
                <span class="likes">${this.likes}</span>
                <i 
                    class="fa-solid fa-heart icon icon--black" 
                    data-fa-transform="up-0.75" 
                    aria-label="likes"
                >
                </i>
            </div>
            <span class="price">${this.price}€ / jour</span></div>
        `
        
        return div
    }
}
