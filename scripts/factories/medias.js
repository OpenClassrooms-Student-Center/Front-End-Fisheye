function mediaFactory(data, position) {
    const { date, id, image, likes, photographerId, price, title, video } = data;
    const getVideo = `assets/images/medias/${video}`;
    const getImage = `assets/images/medias/${image}`;
    console.log(getVideo)

function getMediaCardDOM() {
        
            const article = document.createElement( 'article' );
            const containerImg = document.createElement('span')
            containerImg.setAttribute("onclick", "openGallery(this)")
            //Handling Images
          
            const span = document.createElement('span')
            span.classList.add("infosAboutPhoto")

            

            if(image){
                const img = document.createElement( 'img' );
                img.setAttribute("src", getImage)
                img.setAttribute("class", "gallery-item-img")
                img.setAttribute("data-type", "img");
                img.setAttribute("data-position", position);

                const h2 = document.createElement( 'h2' );
                h2.textContent = title;
                h2.setAttribute('id', 'gallery-title')
    
                const h3 = document.createElement('h3')
                h3.innerHTML = likes +`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"/></svg>`
                
            //AppendChild to handling our images
            article.appendChild(containerImg);
            containerImg.appendChild(img)
            article.appendChild(span);
            span.appendChild(h2);
            span.appendChild(h3);
            ////////////////////////////////////
             return (article)
            } if(video != null) { 
                const article = document.createElement( 'article' );
                article.setAttribute("type", "video/mp4");

                const h2 = document.createElement( 'h2' );
                h2.textContent = title;

                const h3 = document.createElement('h3')
                h3.innerHTML = likes +`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"/></svg>`
                
                const span = document.createElement('span')
                span.classList.add("infosAboutPhoto")

                const videoTag = document.createElement('video')
                videoTag.setAttribute("src", `assets/images/medias/${video}`)
                videoTag.setAttribute("onclick", "openGallery(this)")
                videoTag.setAttribute("data-type", "video");
                videoTag.setAttribute("data-position", position);

                article.appendChild(videoTag);
                article.appendChild(span);
                span.appendChild(h2);
                span.appendChild(h3);
                return (article)
            }
        }   
    return { getMediaCardDOM }
}


