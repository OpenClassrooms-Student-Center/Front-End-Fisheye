import { mediaFactory } from "../factories/mediaFactory";
import { setInnerHtml } from "../utils/dom";


export async function displayMedia(medias, querySelector, photographerId) {
    let totalLikes = 0;

    medias.forEach((media) => {
        if (photographerId) {
            if (photographerId == media.photographerId) {

                if (process.env.NODE_ENV === 'development') { console.log(media); }
                // Then we are going use the MediaFactory to generate DOM
                const mediasSection = document.querySelector(querySelector);
                const mediaModel = mediaFactory(media);
                const mediaDOM = mediaModel.getMediaDOM();

                if (mediaDOM) {
                    mediasSection.appendChild(mediaDOM);
                }
                // End of MediaFactory Work

                // If media object got Likes propriety then
                if (media.likes) {
                    totalLikes += media.likes; // Count all likes
                    setInnerHtml(".total_likes", totalLikes);
                }
                else {
                    console.warn("Theres is no like and totalLikes, look mediaFactory returned a object without likes propriety")
                }
            }
        }
    });

    if (process.env.NODE_ENV === 'development') { console.log("Total Like: " + totalLikes); }
}

