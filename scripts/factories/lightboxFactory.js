function lightboxFactory(data) {

    const { image , video } = data;
    let mediaImage = `assets/medias/${image}`;

    function getLightboxDOM() {

        //INTEGRATION DE LA LIGHTBOX
        const lightbox = document.querySelector(".lightbox");
        lightbox.classList.add("lightbox");
      
        const container = document.createElement("div");
        container.classList.add("container");
        container.style.width = "60%";
        container.style.height = "90%";
        container.style.position = "absolute";
        container.style.margin = "auto";
        container.style.top = "0px";
        container.style.bottom = "0px";
        container.style.left = "0px"; 
        container.style.right = "0px";
    
        const previous = document.createElement("i");
        previous.innerHTML = '<i class="fas fa-chevron-left"></i>';
        previous.style.position = "absolute";
        previous.style.top = "47%";
        previous.style.left = "16%";
        previous.style.fontSize = "40px";  
        previous.style.cursor = "pointer";
        previous.classList.add = "previous";
    
        const next = document.createElement("i");
        next.innerHTML = '<i class="fas fa-chevron-right"></i>';
        next.style.position = "absolute";
        next.style.top = "47%"; 
        next.style.right = "16%";  
        next.style.fontSize = "40px";
        next.style.cursor = "pointer";
        next.classList.add = "next";
    
        const closeLightbox = document.createElement("i");
        closeLightbox.innerHTML = '<i class="fas fa-times"></i>';
        closeLightbox.style.position = "absolute";
        closeLightbox.style.top = "4%";
        closeLightbox.style.right = "16%";
        closeLightbox.style.fontSize = "40px";
        closeLightbox.style.cursor = "pointer";

        //OUVERTURE DE LA LIGHTBOX AU CLIC
        const photos = document.querySelectorAll("img");
        const videos = document.querySelectorAll("video");

        photos.forEach(img => { 
            img.addEventListener("click", () => {
                lightbox.style.display = "block";
                container.appendChild(img);
                img.style.width = "100%";
                img.style.height ="100%"; 
                img.style.margin = "auto";
                img.style.objectFit = "cover"; 
                img.classList.add("selected");
            })
        });

        videos.forEach(video => {
            video.addEventListener("click", () => {
                lightbox.style.display = "block";
                container.appendChild(video);
                video.style.width = "100%";
                video.style.height ="100%"; 
                video.style.margin = "auto";
                video.classList.add("selected"); 
            });
        })
        

        //FERMETURE DE LA LIGHTBOX 
        closeLightbox.addEventListener("click", () => {
            lightbox.style.display = "none";
            location.reload(); 
            //COMMENT FAIRE REAPPARAITRE LE MEDIA ????
        })

        //PHOTOS SUIVANTE 
        const medias = (data.image + data.video);

        

        const previousMedia = () => {
            previous.addEventListener("click", () => {
                if(medias.classList.contains("selected")) {
                   // medias.classList.remove("selected");
                   // i--;
                   console.log(true);
                }
            });
        };

        for (let i = 0; i < medias.length; i++) {
            myMedia = medias[i];
            previousMedia();
        //   nextMedia();
        


    };
      
        lightbox.appendChild(container);
        lightbox.appendChild(previous);
        lightbox.appendChild(next);
        lightbox.appendChild(closeLightbox); 
    };

    

    return { image, video, getLightboxDOM };
};

