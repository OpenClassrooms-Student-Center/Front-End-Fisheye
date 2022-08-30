import { mediaFactory } from "../factories/mediaFactory";
import { setInnerHtml } from "../utils/dom";




export async function displayMedia(medias, querySelector, photographerId) {
    let totalLikes = 0;

    medias.forEach((media) => {
        if (photographerId) {
            if (photographerId == media.photographerId) {

                console.log(media);
                // Then we are going use the MediaFactory to generate DOM
                const mediasSection = document.querySelector(querySelector);
                const mediaModel = mediaFactory(media);
                const mediaDOM = mediaModel.getMediaDOM();

                if (mediaDOM) {
                    mediasSection.appendChild(mediaDOM);
                }
                // End of MediaFactory Work

                totalLikes += media.likes; // Count all likes
                setInnerHtml(".total_likes", totalLikes);
            }
        }
    });

    console.log("Total Like: " + totalLikes);
}

