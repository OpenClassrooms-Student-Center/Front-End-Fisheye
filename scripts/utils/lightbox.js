function initLightbox() {
    //création des éléments html de la lightbox
    const lightbox = document.createElement('div');
    const previousMedia = document.createElement("i");
    const nextMedia = document.createElement("i");
    const closeMedia = document.createElement("i");
    const titleMedia = document.createElement("p");
    //ajouts des attributs, classes etc sur les élements crées
    lightbox.id= 'lightbox';
    lightbox.ariaLabel= "Zoom sur le media";
    lightbox.role = "dialog";
    lightbox.ariaModal="true";
    previousMedia.className ="previous-media fa-solid fa-angle-left fa-4x";
    nextMedia.className ="next-media fa-solid fa-angle-right fa-4x";
    closeMedia.className ="close-media fa-solid fa-xmark fa-4x";
    closeMedia.setAttribute("onclick","closeMedia()")
    titleMedia.className = "title-media";
    
    document.body.appendChild(lightbox);
   
    const mediasHTML = document.querySelectorAll(".media_img")
    
    mediasHTML.forEach(media => {
        console.log(media.tagName)
        media.addEventListener('click', e=> {
            console.log(media)
            console.log(media.dataset.id)
            console.log(medias) //medias est appelé dans le fichier photographers.js
            let index = medias.findIndex(element => { //function qui retourne l'index
                return element.id == media.dataset.id
            })
            console.log(index)
            console.log(medias[index])
            //ajoute la classe active pour afficher la lightbox
            lightbox.classList.add('active') 
            if(media.tagName === 'VIDEO') {
                const video = document.createElement('video')
                video.classList.add("content-lightbox")
                const source = document.createElement("source")
                source.src = media.querySelector("source").src
                video.appendChild(source)
                video.setAttribute("controls", "true")
                lightbox.appendChild(video);  
                
            }
            else {
                const img = document.createElement('img')
                //ajoute la class pour le style css
                img.classList.add("content-lightbox") 
                img.src = media.src
                lightbox.appendChild(img);
            }
            
            
          
            //créé les élements dans le DOM
           
            lightbox.appendChild(previousMedia);
            lightbox.appendChild(nextMedia);
            lightbox.appendChild(closeMedia);
            lightbox.appendChild(titleMedia);
            
        })   
    })
       
   }
   //timer pour attendre le chargement des médias
   const myTimeout = setTimeout(initLightbox, 3000); 
   //fermeture de la lightbox
   function closeMedia() {
    //enleve la classe active et cache la lightbox
    lightbox.classList.remove('active')
    lightbox.innerHTML = ''; //reset l'affichage
   
  }
  
 
    

