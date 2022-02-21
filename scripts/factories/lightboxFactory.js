function lightboxFactory(data) {
    const { image , video, title } = data;

    function getLightboxDOM() {
        const main                  = document.querySelector("#main");
        const lightbox              = document.querySelector(".lightbox");
        const previous              = document.createElement("i");
        const next                  = document.createElement("i");
        const closeBtn              = document.createElement("i");
        const container             = document.createElement("div");
        const img                   = document.createElement("img");
        const vid                   = document.createElement("video");
        const titleMedia            = document.createElement("p");

        previous.innerHTML          = '<i class="fas fa-chevron-left"></i>';
        previous.style.position     = "absolute";
        previous.style.top          = "47%";
        previous.style.left         = "16%";
        previous.style.fontSize     = "40px"; 
        previous.style.color        = "#901C1C";
        previous.style.cursor       = "pointer";
        previous.classList.add      = "previous";
        previous.setAttribute("title", "Image précédente");

        next.innerHTML              = '<i class="fas fa-chevron-right"></i>';
        next.style.position         = "absolute";
        next.style.top              = "47%"; 
        next.style.right            = "16%";  
        next.style.fontSize         = "40px";
        next.style.color            = "#901C1C";
        next.style.cursor           = "pointer";
        next.classList.add          = "next"; 
        next.setAttribute("title", "Image suivante");

        closeBtn.innerHTML          = '<i class="fas fa-times"></i>';
        closeBtn.style.position     = "absolute";
        closeBtn.style.top          = "6%";
        closeBtn.style.right        = "16%";
        closeBtn.style.fontSize     = "40px";
        closeBtn.style.color        = "#901C1C";
        closeBtn.style.cursor       = "pointer";
        closeBtn.setAttribute("title", "Fermer la lightbox");
      
        container.classList.add("container"); 
        container.style.width       = "55%";
        container.style.height      = "85%";
        container.style.position    = "absolute";
        container.style.margin      = "auto";
        container.style.top         = "0";
        container.style.bottom      = "0";
        container.style.left        = "0"; 
        container.style.right       = "0";

        img.style.width             = "100%";
        img.style.height            = "100%";
        img.style.borderRadius      = "5px";
        img.style.objectFit         = "cover";
        img.setAttribute("src", "");
        img.setAttribute("alt", "");

        vid.style.width             = "100%";
        vid.style.height            = "100%";
        vid.style.borderRadius      = "5px";
        vid.style.objectFit         = "cover";
        vid.setAttribute("src", "");
        vid.setAttribute("alt", "");
    
        titleMedia.style.fontSize   = "24px";
        titleMedia.style.color      = "#901C1C";
        titleMedia.style.width      = "100%";
        titleMedia.style.height     = "30px";
        titleMedia.style.textAlign  = "start";

        // Ouverture de la lightbox
        function openLightbox() {
            lightbox.style.display = "block";
            lightbox.setAttribute("aria-hidden", "false");
            main.setAttribute("aria-hidden", "true");
        };

        const medias = document.querySelectorAll(".galleryLink");

        for (let i = 0; i < medias.length; i++) {
            mediaLink = medias[i];

            mediaLink.addEventListener("click", (e) => {
                e.preventDefault();
                openLightbox();
                selectedMedia = medias[i].querySelector(".currentMedia");
                selectedMedia.classList.add("selected");

                // Affiche le média sélectionné
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

                displayMedia();

                // Affiche le média précédent
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

                previousMedia();
                
                // Affiche le média suivant
                function nextMedia() {
                    next.addEventListener("click", (e) => {
                        e.preventDefault();
                        selectedMedia.classList.remove("selected");
                        i++;
                        selectedMedia = medias[i].querySelector(".currentMedia");
                        displayMedia();
                    })
                };

                nextMedia();

                // Fermeture de la ligtbox
                function closeLightbox() {
                    closeBtn.addEventListener("click", () => {
                        lightbox.style.display = "none";
                        lightbox.setAttribute("aria-hidden", "true");
                        main.setAttribute("aria-hidden", "false");
                    })
                };

                // Fermeture de la lightbox avec la touche Echap 
                window.addEventListener("keydown", (e) => {
                    const keyCode = e.keyCode ? e.keyCode : e.which;
                
                    if (lightbox.style.display = "block" && keyCode === 27) {
                        lightbox.style.display = "none";
                    };

                    if (lightbox.style.display = "block" && keyCode === 37) {
                        selectedMedia.classList.remove("selected");
                        i--;
                        selectedMedia = medias[i].querySelector(".currentMedia");
                        selectedMedia.classList.add("selected");
                        displayMedia();
                    };

                    if (lightbox.style.display = "block" && keyCode === 39) {
                        selectedMedia.classList.remove("selected");
                        i++;
                        selectedMedia = medias[i].querySelector(".currentMedia");
                        displayMedia();
                    }
                });

                closeLightbox();

                
                  
            });
        };
        
        lightbox.appendChild(container);
        container.appendChild(img);
        container.appendChild(vid);
        container.appendChild(titleMedia);
        lightbox.appendChild(previous);
        lightbox.appendChild(next);
        lightbox.appendChild(closeBtn);     
    };   

    return { image, video, title, getLightboxDOM };
};



