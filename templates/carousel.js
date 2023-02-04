
const carousel = {

    
    createImageHTML: function(photographerName, media, index) {

        const carouselItem = `

            <li class="carousel__item item-${index}" aria-hidden="false">

                <div class="carousel__creation">
                    <img 
                        src="assets/Sample_Photos/${photographerName}/${media.image}"
                        class="carousel__media"
                        alt="${media.title}"
                        tabindex="0"
                    >
                    <span class="carousel__name" aria-hidden="true">${media.title}</span>
                </div>                                  

            </li>
        `

        return carouselItem
    },

    createVideoHTML: function(photographerName, media, index) {

        const carouselItem = `

            <li class="carousel__item item-${index}" aria-hidden="true">

                <div class="carousel__creation">
                    <video 
                        class="carousel__media" 
                        controls
                        aria-label="${media.title}"
                    />
                        <source src="assets/Sample_Photos/${photographerName}/${media.video}" type="video/mp4">
                    </video>
                    <span class="carousel__name" aria-hidden="true">${media.title}</span>
                </div>                                  

            </li>
        `

        return carouselItem
    }
}

export default carousel