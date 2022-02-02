function lightboxFactory(data) {
    const { image , video, title } = data;

    function getLightboxDOM() {
        //INTEGRATION DE LA LIGHTBOX
        const lightbox = document.querySelector(".lightbox");

        const previous = document.createElement("i");

        previous.innerHTML          = '<i class="fas fa-chevron-left"></i>';
        previous.style.position     = "absolute";
        previous.style.top          = "47%";
        previous.style.left         = "16%";
        previous.style.fontSize     = "40";  
        previous.style.cursor       = "pointer";
        previous.classList.add      = "previous";

        const next = document.createElement("i");

        next.innerHTML              = '<i class="fas fa-chevron-right"></i>';
        next.style.position         = "absolute";
        next.style.top              = "47%"; 
        next.style.right            = "16%";  
        next.style.fontSize         = "40";
        next.style.cursor           = "pointer";
        next.classList.add          = "next";

        const closeBtn = document.createElement("i");

        closeBtn.innerHTML         = '<i class="fas fa-times"></i>';
        closeBtn.style.position    = "absolute";
        closeBtn.style.top         = "4%";
        closeBtn.style.right       = "16%";
        closeBtn.style.fontSize    = "40";
        closeBtn.style.cursor      = "pointer";
      
        const container = document.createElement("div");
        container.classList.add("container"); 

        container.style.width       = "60%";
        container.style.height      = "90%";
        container.style.position    = "absolute";
        container.style.margin      = "auto";
        container.style.top         = "0";
        container.style.bottom      = "0";
        container.style.left        = "0"; 
        container.style.right       = "0";

        const img = document.createElement("img");
        img.setAttribute("src", "");
        img.setAttribute("alt", "");
        img.style.width = "100%";
        img.style.height = "100%";
        img.style.objectFit = "cover";

        const vid = document.createElement("video");
        vid.setAttribute("src", "");
        vid.setAttribute("alt", "");
        vid.style.width = "100%";
        vid.style.height = "100%";
        vid.style.objectFit = "cover";
        container.appendChild(vid);

        const titleMedia = document.createElement("p");
        titleMedia.style.fontSize = "20px";
        titleMedia.style.color = "#901C1C";
        titleMedia.style.width = "100%";
        titleMedia.style.height = "30px";
        titleMedia.style.textAlign = "start";

        //OUVERTURE DE LA LIGHTBOX 
        function openLightbox() {
            lightbox.style.display = "block";
        };

        const medias = document.querySelectorAll(".galleryLink");

        for (let i = 0; i < medias.length; i++) {
            mediaLink = medias[i];

            mediaLink.addEventListener("click", (e) => {
                e.preventDefault();
                openLightbox();
                selectedMedia = medias[i].querySelector(".currentMedia");
                selectedMedia.classList.add("selected");

                displayMedia();
                previousMedia();
                nextMedia();
                closeLightbox();
                
                function displayMedia() {
                    img.src = selectedMedia.src; 
                    img.alt = selectedMedia.alt;
                    titleMedia.textContent = selectedMedia.alt;

                    if (typeof selectedMedia.alt === "undefined") {
                        img.replaceWith(vid);
                        vid.src = selectedMedia.src;
                        vid.alt = selectedMedia.alt; 
                        titleMedia.textContent = "Wild horses in the mountains";
                        vid.play();
                    }
                    else {
                        vid.replaceWith(img);
                    }
                };

                function previousMedia() {
                    previous.addEventListener("click", (e) => {
                        e.preventDefault();
                        selectedMedia.classList.remove("selected");
                        i--;
                        selectedMedia = medias[i].querySelector(".currentMedia");
                        selectedMedia.classList.add("selected");
                        displayMedia();
                    })
                };
                
                function nextMedia() {
                    next.addEventListener("click", (e) => {
                        e.preventDefault();
                        selectedMedia.classList.remove("selected");
                        i++;
                        selectedMedia = medias[i].querySelector(".currentMedia");
                        displayMedia();
                    })
                };

                function closeLightbox() {
                    closeBtn.addEventListener("click", () => {
                        lightbox.style.display = "none";
                    })
                };
            });
        };
        
        lightbox.appendChild(container);
        container.appendChild(img);
        container.appendChild(titleMedia);
        lightbox.appendChild(previous);
        lightbox.appendChild(next);
        lightbox.appendChild(closeBtn);     
    };   

    return { image, video, title, getLightboxDOM };
};



