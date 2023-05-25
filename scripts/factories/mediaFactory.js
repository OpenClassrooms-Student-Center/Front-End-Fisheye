function mediaFactory(data, photographerName) {
    const { title, image, video } = data;
    const firstName = photographerName;

    const h1 = document.querySelector("h1");

    function getMediaDOM() {
        const mediaSection = document.querySelector(".photographer-media");
        const divMedia = document.createElement("div");
        const img = document.createElement("img");
        const videoElement = document.createElement("video");
        const source = document.createElement("source");
        const h3 = document.createElement("h3");

        divMedia.classList.add('media');

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
            
            videoElement.appendChild(source);
            videoElement.setAttribute("width", "350px")
            videoElement.setAttribute("height", "300px")
            videoElement.setAttribute("controls", "controls")
            videoElement.setAttribute("data-video", "style")
            source.setAttribute("src", videos);
            mediaSection.appendChild(videoElement);
        }
    }

    return { getMediaDOM }
}