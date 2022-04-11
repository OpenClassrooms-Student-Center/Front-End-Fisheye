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
    incr(){
        this._total++
    }
    get total(){
        return this._total
    }
}

function TotalLikesFactory(price)
{
    const pricePerDay = price
    const totalLikes = new TotalLikes
    console.log("PRICE:"+price)
    function UserDivDOM(){
        const totalEl = document.querySelector('.likes-and-price')
        totalEl.innerHTML = `<div><span>${totalLikes.total}</span>
        <i class="fa fa-heart"></i></div><span>${pricePerDay}€ / jour</span>`
    }
    return {UserDivDOM}
}