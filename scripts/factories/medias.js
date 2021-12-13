// ici faire une factory media sur le modèle de la factory photographer
function mediaFactory(data) {
   
    const { photographerId, id, image, video,  title, date, price, likes } = data;
   

    const mediaPathImg = `../assets/images/${photographerInfos.name}/${image}`
    const mediaPathVideo = `../assets/images/${photographerInfos.name}/${video}`
    function getMediaItems() {
        // select portfolio items container 
        const section = document.getElementById('mediaContainer');
        // create and setting items 
        // container for image, like and title 
        const article = document.createElement('article');
        const infosItemsContainer = document.createElement('div');
        const h3 = document.createElement('h3'); 
        const likesPerItem = document.createElement('span'); 
        const likeIcon = document.createElement('i')


        // setting title
        h3.textContent = title; 
        // setting likes
        likesPerItem.textContent = likes; 
        likesPerItem.appendChild(likeIcon)
        likeIcon.classList.add('fas')
        likeIcon.classList.add('fa-heart') 
        // create image or video 
        if (image) {
            // create image and setting path
            const img = document.createElement( 'img' );
            img.setAttribute("src", mediaPathImg);
            img.setAttribute("alt", `${title} `);
            // insert items in articles
            article.appendChild(img)
            article.style.order = '1';
        } else {
            // create video  and setting path 
            const video = document.createElement('video');
            video.setAttribute("src", mediaPathVideo);
            video.setAttribute("alt", `${title}`);
            video.setAttribute("type", "video/mp4");
            video.setAttribute("autoplay", "autoplay")
            video.setAttribute("preload", "auto")
            video.setAttribute("controls", "")
            video.setAttribute("loop", "")
            video.setAttribute("muted", "")

            // insert video in article 
            article.appendChild(video);
            article.style.order = '2';
        }

        //insert items in sectoon container 
        article.appendChild(infosItemsContainer)
        infosItemsContainer.appendChild(h3)
        infosItemsContainer.appendChild(likesPerItem)
        section.appendChild(article)
        return (section);

    }
    
    return { getMediaItems }
}