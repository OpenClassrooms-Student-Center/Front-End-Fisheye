function mediaFactory(data) {
    const { id, photographerId, title, image, video, likes, date, price } = data;

    const movie = `assets/video/${video}`;
    const picture = `assets/images/${image}`;



    function getMediaDOM() {

        // Create DOM only if we got id
        if (id && photographerId) {
            const article = document.createElement("article");
            article.setAttribute("class", "media_card");


            const linkElement = article.appendChild(
                buildElement("a", "photographer.html?id=" + id)
            );

            if (video) {
                insertVideoInsideElement(linkElement, movie);
            } else {
                if (image) {
                    insertPictureInsideElement(linkElement, picture);
                }
            }


            if (title) {
                title_h6 = "<h6>" + title + "</h6>";
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
