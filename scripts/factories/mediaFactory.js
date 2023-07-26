function mediaFactory(data, photographerName, length) {
    const { title, image, video, id } = data;
    const firstName = photographerName;

    function getMediaDOM() {
        const mediaSection = document.querySelector(".photographer-media");
        const divMedia = document.createElement("div");
        const img = document.createElement("img");
        const videoElement = document.createElement("video");
        const source = document.createElement("source");
        const h3 = document.createElement("h3");

        divMedia.classList.add('media');
        img.classList.add('media-source', 'image');
        videoElement.classList.add('media-source', 'video');

        if (image) {
            const images = `assets/medias/${firstName}/${image}`;
            
            img.setAttribute("src", images);

            h3.textContent = title;

            
            divMedia.appendChild(img);
            divMedia.appendChild(h3);

            mediaSection.appendChild(divMedia);
        }

        if (video) {
            const videos = `assets/medias/${firstName}/${video}`;
            
            h3.textContent = title;

            videoElement.appendChild(source);
            videoElement.setAttribute("width", "350px")
            videoElement.setAttribute("height", "300px")
            videoElement.setAttribute("controls", "controls")
            videoElement.setAttribute("data-video", "style")
            source.setAttribute("src", videos);
            divMedia.appendChild(videoElement)
            divMedia.appendChild(h3)
            mediaSection.appendChild(divMedia);
        }
    }

    return { getMediaDOM }
}