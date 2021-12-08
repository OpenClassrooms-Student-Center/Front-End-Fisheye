// ici faire une factory media sur le modèle de la factory photographer
function mediaFactory(data) {
   
    const { photographerId, id, image, video,  title, date, price } = data;
   

    const mediaPathImg = `../assets/images/${photographerInfos.name}/${image}`
    const mediaPathVideo = `../assets/images/${photographerInfos.name}/${video}`
    function getMediaItems() {
        // create user card container 
        const section = document.getElementById('mediaContainer');
        

        if (image) {
            // create and setting items 
        // --> profil picture
        const img = document.createElement( 'img' );
        img.setAttribute("src", mediaPathImg);
        img.setAttribute("alt", `${title} `);
        // insert items in article 
        section.appendChild(img)

        } else {
            const video = document.createElement('video');
            video.setAttribute("src", mediaPathVideo);
            video.setAttribute("alt", `${title}`);
            video.setAttribute("type", "video/mp4");
            video.setAttribute("autoplay", "autoplay")
            video.setAttribute("preload", "auto")
            video.setAttribute("controls", "")
            video.setAttribute("loop", "")
            video.setAttribute("muted", "")
            section.appendChild(video);
        }
        
        return (section);

    }
   
    return { getMediaItems }
}