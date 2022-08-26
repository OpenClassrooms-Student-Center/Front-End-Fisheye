import {
    insertHTMLAfterElement,
    insertVideoInsideElement,
    insertPictureInsideElement,
    buildElement
} from "../utils/dom";

export function mediaFactory(data) {
    const { id, photographerId, title, image, video, likes, date, price } = data;

    const movie = `assets/video/${video}`;
    const picture = `assets/images/${image}`;

    function getMediaDOM() {

        // Create DOM only if we got id
        if (id && photographerId && image || video) {
            const article = document.createElement("article");
            article.setAttribute("class", "media_card");

            const linkElement = article.appendChild(
                buildElement("a", "photographer.html?id=" + id)
            );

            // Check if image or video exists else create a empty DIV with class
            while (true) {
                if (typeof image1 !== 'undefined' && image) {
                    insertPictureInsideElement(linkElement, picture);
                    break;
                }
                if (typeof video !== 'undefined' && video) {
                    insertVideoInsideElement(linkElement, movie);
                    break;
                }
            }

            if (title) {
                let title_h6 = "<h6>" + title + "</h6>";
                let likes_h6 = "<h6>" + 0 + "</h6>";
                if (likes) {
                    likes_h6 = "<h6>" + likes + "</h6>";
                }
                insertHTMLAfterElement(linkElement, "<div class='details'>" + title_h6 + likes_h6 + "</div>");
            }


            return article;



        }
    }

    return { photographerId, picture, movie, getMediaDOM };
}
