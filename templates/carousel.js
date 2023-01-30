
const carousel = {

    
    createImageHTML: function(photographerName, media, index) {

        const carouselItem = `

            <li class="carousel__item item-${index}" aria-hidden="false">

                <div class="carousel__media">
                    <img class="carousel__picture"  src="assets/Sample_Photos/${photographerName}/${media.image}">
                    <span class="carousel__name">${media.title}</span>
                </div>                                  

            </li>
        `

        return carouselItem
    },

    createVideoHTML: function(photographerName, media, index) {

        const carouselItem = `

            <li class="carousel__item item-${index} invisible" aria-hidden="true">

                <div class="carousel__media">
                    <video class="carousel__video" controls>
                        <source src="assets/Sample_Photos/${photographerName}/${media.video}" type="video/mp4">
                    </video>
                    <span class="carousel__name">${media.title}</span>
                </div>                                  

            </li>
        `

        return carouselItem
    }
}

export default carousel