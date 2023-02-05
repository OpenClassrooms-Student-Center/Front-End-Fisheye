const photographerProfile = {

    createHTML: function(data) {

        const { name, city, country, tagline, picture } = data
        
        const presentationElement = `

            <div class="presentation">
                <h1 class="presentation__name">${name}</h1>
                <p 
                    class="presentation__infos presentation__location"
                    aria-label="Location et tagline du photographe"
                >
                    <span>${city}, ${country}</span>
                    <span class="presentation__tagline"> ${tagline} </span>
                </p>
            </div>
        `

        const pictureElement = `          
            <img 
                src="${picture}" 
                class="photograph-header__picture"
                alt="${name}"
            >
        `

        return [presentationElement, pictureElement]
    }    
}
    





        


export default photographerProfile