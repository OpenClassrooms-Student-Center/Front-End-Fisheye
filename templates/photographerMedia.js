const photographerMedia = {
    
    // createAttributes: function(mediaLink, media, photographerName, image) {

    //     const listOfAttributes = [
    //         {
    //             element: mediaLink,
    //             attributes: [['href', `#`]],
    //         },
    //         {
    //             element: media,
    //             attributes: [['src', `../assets/Sample Photos/${photographerName}/${image}`]],
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
    //             classes: ["fa-solid", "fa-heart", "like", "like--btn"],
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

            <article class="">

                <a href="#" class="media__link">
                    <img src="assets/Sample Photos/${photographerName}/${image}" alt="" class="media__picture">
                </a>

                <div class="media__infos">

                    <span class="media__name">${title}</span>

                    <div class="media__likes">
                        <span class="media__likes-number">${likes}</span>
                        <i class="fa-solid fa-heart like like--btn"></i>
                    </div>

                </div>

            </article>
        `

        return articleElements

    },

    createVideoHTML: function(photographerName, { video, title, likes }) {

        const articleElements = `

            <article class="">

                <a href="#" class="media__link">
                    <video src="assets/Sample Photos/${photographerName}/${video}" alt="" class="media__picture">
                </a>

                <div class="media__infos">

                    <span class="media__name">${title}</span>

                    <div class="media__likes">
                        <span class="media__likes-number">${likes}</span>
                        <i class="fa-solid fa-heart like like--btn"></i>
                    </div>

                </div>

            </article>
        `

        return articleElements
    }
    
}

export default photographerMedia