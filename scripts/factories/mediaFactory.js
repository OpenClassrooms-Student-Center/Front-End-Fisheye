function mediaFactory(data){
    const {image, video, id, photographerId, title, likes, date} = data;
    const mediaImage = `assets/images/${photographerId}/${image}`;
    const mediaVideo = `assets/images/${photographerId}/${video}`;
    
    const article = document.createElement( 'article' );
    article.classList.add('mediaArticle');
    article.setAttribute('data-id',data.id);
    if (image){
        const img = document.createElement( 'img' );
        img.setAttribute("src", mediaImage);
        img.alt = title;
        img.classList.add('mediaImg');
        article.appendChild(img);
    } else if (video){
        const video = document.createElement( 'video' );
        video.setAttribute("src", mediaVideo);
        video.setAttribute("aria-label", title);
        video.classList.add('mediaVideo');
        video.setAttribute("controls", true);
        video.setAttribute("poster", "");
        article.appendChild(video);
    }
    return article;
}

export { mediaFactory };
