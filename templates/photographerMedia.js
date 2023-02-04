const photographerMedia = {
    
    // createAttributes: function(mediaLink, media, photographerName, image) {

    //     const listOfAttributes = [
    //         {
    //             element: mediaLink,
    //             attributes: [['href', `#`]],
    //         },
    //         {
    //             element: media,
    //             attributes: [['src', `../assets/Sample_Photos/${photographerName}/${image}`]],
    //         }
    //     ] 
    
    //     return listOfAttributes
    // },
    
    
    // createClasses: function(mediaArticle, mediaLink, media, mediaInfos, mediaName, mediaLikes, mediaLikesNumber, mediaLikeIcon) {

    //     const listOfClasses = [

    //         {
    //             element: mediaArticle,
    //             classes: ["media__article"],
    //         },
    //         {
    //             element: mediaLink,
    //             classes: ["media__link"],
    //         },
    //         {
    //             element: media,
    //             classes: ["media__picture"],
    //         },
    //         {
    //             element: mediaInfos,
    //             classes: ["media__infos"],
    //         },
    //         {
    //             element: mediaName,
    //             classes: ["media__name"],
    //         },
    //         {
    //             element: mediaLikes,
    //             classes: ["media__likes"],
    //         },
    //         {
    //             element: mediaLikesNumber,
    //             classes: ["media__likes-number"],
    //         },
    //         {
    //             element: mediaLikeIcon,
    //             classes: ["fa-solid", "fa-heart", "like-icon", "like-icon--btn"],
    //         },
    //     ] 

    //     return listOfClasses
    // },

    // createContent: function(mediaName, mediaLikesNumber, title, likes) {

    //     let listOfContents = [
    //         {
    //             element: mediaName,
    //             content: title,
    //         },
    //         {
    //             element: mediaLikesNumber,
    //             content: likes,
    //         },
    //     ]
    
    //     return listOfContents
        
    // },


    // createChilds: function(mediaArticle, mediaLink, media, mediaInfos, mediaName, mediaLikes, mediaLikesNumber, mediaLikeIcon) {

    //     const listOfChilds = [

    //         {
    //             element: mediaLink,
    //             childs: [media],
    //         },
    //         {
    //             element: mediaLikes,
    //             childs: [mediaLikesNumber, mediaLikeIcon],
    //         },
    //         {
    //             element: mediaInfos,
    //             childs: [mediaName, mediaLikes],
    //         },
    //         {
    //             element: mediaArticle,
    //             childs: [mediaLink, mediaInfos],
    //         },
    //     ]

    //     return listOfChilds
    // }
    
    createImageHTML: function(photographerName, {image, title, likes}) {

        const articleElements = `

            <article>

                <a href="#" class="media__link" aria-label="${title}, gros plan">
                    <img 
                        src="assets/Sample_Photos/${photographerName}/${image}" 
                        class="media__picture"
                        alt="" 
                    />
                </a>

                <div class="media__infos">
                    <span class="media__name" aria-hidden="true">${title}</span>

                    <div class="media__likes">
                        <span class="media__likes-number" aria-hidden="true">${likes}</span>
                        <span class="sr-only">Nombre de likes, ${likes}</span>
                        <i 
                            class="fa-solid fa-heart like-icon like-btn"
                            role="button"
                            aria-label="Aimer la création"
                        >
                        </i>
                    </div>

                </div>

            </article>
        `

        return articleElements

    },

    createVideoHTML: function(photographerName, { video, title, likes }) {

        const articleElements = `

            <article>

                <a href="#" class="media__link" aria-label="${title}, gros plan">
                    <video 
                        src="assets/Sample_Photos/${photographerName}/${video}" 
                        class="media__picture"
                    />
                </a>

                <div class="media__infos">

                    <span class="media__name" aria-hidden="true">${title}</span>

                    <div class="media__likes">
                        <span class="media__likes-number" aria-hidden="true">${likes}</span>
                        <span class="sr-only">Nombre de likes, ${likes}</span>
                        <i 
                            class="fa-solid fa-heart like-icon like-btn"
                            role="button"
                            aria-label="Aimer la création"
                        ></i>
                    </div>

                </div>

            </article>
        `

        return articleElements
    }
    
}

export default photographerMedia