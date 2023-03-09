function mediaFactory(data, position) {
    const { date, id, image, likes, photographerId, price, title, video } = data;
    const getVideo = `assets/images/medias/${video}`;
    const getImage = `assets/images/medias/${image}`;

function getMediaCardDOM() {
    const article = document.createElement( 'article' );
    article.setAttribute("post-likes", likes);
    article.setAttribute("post-date", date);
    article.setAttribute("post-title", title);
    article.setAttribute("class", "gallery-item");
    //Handling Images 
    const span = document.createElement('span')
    span.classList.add("infosAboutPhoto")

    if(image)
        {
        // Handling image
        const img = document.createElement( 'img' );
        img.setAttribute("src", getImage)
        img.setAttribute("class", "gallery-item-img")
        img.setAttribute("data-type", "img");
        img.setAttribute("data-position", position);
        img.setAttribute("data-likes", "1");
        img.setAttribute("alt", title + ", closeup view");
        img.setAttribute("aria-label", "click to open slider");
        img.setAttribute('data-title', title)
        ///////////////////////

        // Handling Title
        const h2 = document.createElement( 'h2' );
        h2.textContent = title;
        h2.setAttribute('id', 'gallery-title')
        ///////////////////////

        // Handling Likes number and heart image
        const containerHeartAndText = document.createElement('div')
        containerHeartAndText.setAttribute('class', 'container_heart')
        containerHeartAndText.setAttribute('data-like', '1')
        

        const titlePost = document.createElement('h3')
        titlePost.setAttribute("id", "like-" + id);
        titlePost.innerHTML = likes
        titlePost.setAttribute("aria-label", "likes");
        
        const heart = document.createElement('img')
        heart.setAttribute('src', "/assets/icons/heart-solid-black.svg")
        heart.setAttribute('class', 'heart')
        heart.setAttribute("post-like", "1")
        heart.setAttribute("id", "like-" + id)
        heart.setAttribute("alt", "likes of : "+ title);
        heart.setAttribute('post-id', id)
        ///////////////////////

        // Container for image
        const containerImg = document.createElement('span')
        containerImg.setAttribute("onclick", "openGallery(this)")
        ///////////////////////

        //AppendChild to handling our images
        article.appendChild(containerImg);
        containerImg.appendChild(img)
        article.appendChild(span);
        span.appendChild(h2);
        span.appendChild(containerHeartAndText);
        containerHeartAndText.appendChild(titlePost);
        containerHeartAndText.appendChild(heart);

        return (article)
            } 
        if(video != null) { 
            

            // Handling Title
            const h2 = document.createElement( 'h2' );
            h2.textContent = title;
            ///////////////////////

            // Handling Likes number and heart image
            const containerHeartAndText = document.createElement('div')
        containerHeartAndText.setAttribute('class', 'container_heart')
        containerHeartAndText.setAttribute('data-like', '1')
        

        const titlePost = document.createElement('h3')
        titlePost.setAttribute("id", "like-" + id);
        titlePost.innerHTML = likes
        
        const heart = document.createElement('img')
        heart.setAttribute('src', "/assets/icons/heart-solid-black.svg")
        heart.setAttribute('class', 'heart')
        heart.setAttribute("post-like", "1")
        heart.setAttribute("id", "like-" + id)
        heart.setAttribute("alt", "likes");
        heart.setAttribute('post-id', id)
        ///////////////////////
            
            // Creating clickable div to contain our video tag
            const divVideo = document.createElement('div')
            divVideo.setAttribute("onclick", "openGallery(this)") 
            ///////////////////////

            // Creating our video tag
            const videoTag = document.createElement('video')
            videoTag.setAttribute("src", getVideo)
            videoTag.setAttribute("data-type", "video");
            videoTag.setAttribute("data-likes", likes);
            videoTag.setAttribute("data-position", position);
            videoTag.setAttribute("class", "gallery-item-img")
            videoTag.setAttribute('data-title', title)
            ///////////////////////

            article.appendChild(divVideo);
            divVideo.appendChild(videoTag);
            article.appendChild(span);
            span.appendChild(h2);
            span.appendChild(containerHeartAndText);
            containerHeartAndText.appendChild(titlePost);
            containerHeartAndText.appendChild(heart);
            return (article)
        }
    }   
return { getMediaCardDOM }
}


