class TotalLikes{
    constructor(){
        if (TotalLikes.exists) {
            return TotalLikes.instance
        }
        this._total = 0
        TotalLikes.instance = this
        TotalLikes.exists = true
        return this
    }
    incr(incr=1){
        this._total+=incr
    }

    get total(){
        return this._total
    }
}
/**
 * Factory  du total des likes et du prix par jour du photographe
 * @param {*} price 
 * @returns {UserDivDOM} : render de la DIV associée
 */
function TotalLikesFactory(price)
{
    const pricePerDay = price
    const totalLikes = new TotalLikes()
    function UserDivDOM(){
        const totalEl = document.querySelector('.likes-and-price')
        totalEl.innerHTML = `<div><span>${totalLikes.total}</span>
        <i class="fa fa-heart"></i></div><span>${pricePerDay}€ / jour</span>`
    }
    return {UserDivDOM}
}