import * as dom from "../utils/dom";

export function mediaFactory(data) {
    const { id, photographerId, title, image, video, likes } = data;

    const movie = `assets/video/${video}`;
    const picture = `assets/images/${image}`;

    function getMediaDOM() {

        // Create DOM only if we got ids and a Picture or a Video
        const hasPhotographer = id && photographerId;
        const hasContent = image || video

        if (hasPhotographer && hasContent) {
            // CREATE A ARTICLE
            const article = document.createElement("article");
            article.setAttribute("class", "media_card");

            // Build A HREF ELEMENT
            const linkElement = article.appendChild(
                dom.buildElement("a", `photographer.html?id=${id}`)
            );
            dom.setArialLabel(linkElement, "Lilac breasted roller, closeup view") // Set ArielLabel to AHref


            // Check if image or video exists
            if (image) {
                dom.insertPictureInsideElement(linkElement, picture, title); // Insert picture with ALT

            }
            else if (video) {
                dom.insertVideoInsideElement(linkElement, movie, `Movie ${video}`); // Insert Video with Ariel Label
            }

            // Generate Details (title + Likes)
            if (title) {
                let title_h6 = `<h6>${title}</h6>`;
                let likes_h6 = `<h6 aria-label='likes'>0</h6>`;
                if (likes) {
                    likes_h6 = `<h6 aria-label='likes'>${likes}</h6>`;
                }
                dom.insertHTMLAfterElement(linkElement, `<div class='details'>${title_h6}${likes_h6}</div>`);
            }

            // Return Article
            return article;

        }
        else {
            return false;
        }
    }

    return { photographerId, picture, movie, getMediaDOM };
}
