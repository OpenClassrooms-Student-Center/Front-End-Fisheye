
const carousel = {

    
    createImageHTML: function(photographerName, media, index) {

        const carouselItem = `

            <li class="carousel__item item-${index}" aria-hidden="false">
                
                <a tabindex="2" class="carousel__media-container" aria-labelledby="title-${index}">
                    <img 
                        src="assets/Sample_Photos/${photographerName}/${media.image}"
                        class="carousel__media"
                        alt="${media.title}"
                    >
                </a>
                <span id="title-${index}" class="carousel__name" aria-hidden="true" tabindex="3">${media.title}</span>

            </li>
        `

        return carouselItem
    },

    createVideoHTML: function(photographerName, media, index) {

        const carouselItem = `

            <li class="carousel__item item-${index}" aria-hidden="true">

                <a tabindex="2" class="carousel__media-container" aria-labelledby="title-${index}">
                    <video 
                        class="carousel__media" 
                        controls
                        aria-label="${media.title}"
                    />
                        <source src="assets/Sample_Photos/${photographerName}/${media.video}" type="video/mp4">
                    </video>
                </a>
                <span id="title-${index}" class="carousel__name" aria-hidden="true" tabindex="3">${media.title}</span>

            </li>
        `

        return carouselItem
    }
}

export default carousel