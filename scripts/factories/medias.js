function mediaFactory(data) {
    const { date, id, image, likes, photographerId, price, title, video } = data;
    const getVideo = `assets/images/medias/${video}`;
    const getImage = `assets/images/medias/${image}`;
    console.log(getVideo)

function getMediaCardDOM() {
        if(image){
            const article = document.createElement( 'article' );

            //Handling Images
            const img = document.createElement( 'img' );
            img.setAttribute("src", getImage)
            /////////////////

            const h2 = document.createElement( 'h2' );
            h2.textContent = title;

            const h3 = document.createElement('h3')
            h3.innerHTML = likes +`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"/></svg>`
            
            const span = document.createElement('span')
            span.classList.add("infosAboutPhoto")

            const containerImg = document.createElement('span')
            containerImg.setAttribute("onclick", "openGallery(this)")
            //AppendChild to handling our images
            article.appendChild(containerImg);
            containerImg.appendChild(img)
            article.appendChild(span);
            span.appendChild(h2);
            span.appendChild(h3);
            ////////////////////////////////////
            
// Launch carousel on click
        /*containerImg.onclick = function(){
            const carousel = document.getElementById('medias_modal')
            carousel.style.display ="flex"
//////////////////

//Hiding the rest of the page
            mediasSection = document.getElementById("medias")
            mediasSection.style.display="none"
            photographSection = document.getElementById('photograph_header')
            photographSection.style.display = "none"
//Creating our elements and setting them with attributes
            img.setAttribute("id", "image_carousel")
            img.classList.add("active")
            const button = document.createElement('img')
            button.setAttribute("src", "assets/icons/test.svg")
            button.classList.add('closure_button')
// Creating our arrow
            const arrowRight = document.createElement('span')
            arrowRight.innerHTML=">"
            arrowRight.classList.add('arrow')
//Getting all our img's
            carousel.appendChild(button);
            carousel.appendChild(arrowRight)
            carousel.appendChild(img)
            carousel.appendChild(h2);
// close carousel on click  
            button.setAttribute("class", "light-button");
            button.setAttribute("aria-label", title);
            button.setAttribute("onclick", "openGallery(this)");

            button.onclick = function(){
                const carousel = document.getElementById('medias_modal')
                carousel.style.display ="none"
                photographSection = document.getElementById('photograph_header')
                photographSection.style.display = "block"
                mediasSection = document.getElementById("medias")
                mediasSection.style.display="grid"
                window.location.reload()
            }
            /*
//Change image for next on click
            let count = 4;
            let numberOfFor = 0;
            arrowRight.onclick = function(){
//Mauvaise récupération des images
            const items = document.querySelectorAll("img")
            let array = []
           
            img.classList.remove("active")
            items.forEach(item => {
                
                console.log(items)
                let nbSlide = items.length
                let currentImage = document.getElementById('image_carousel')
//Mauvais count
//Mauvais appendChild                
                
                if(count < nbSlide){   
                    console.log("---if count < nbSlide---")
                    if(count < nbSlide - 1){
                        console.log("nbSlide", nbSlide)
                        console.log("count", count)
                        count++;
                        
                        carousel.appendChild(item);
                    if(img.classList.contains("active") || item.classList.contains("active")){
                        console.log("img => ", "on rentre dans cette condition")
// item.classList.remove("active")
                        item.classList.remove("active")
                        
                    }
                    else
                    {
                        console.log("pas active")
                        img.classList.remove('active')
                    } 
                    }
                    else
                    {
                        console.log("on a terminé le slider")
                        count = 0;
                    }
                        numberOfFor++;
                        console.log("For : " + numberOfFor)
                    }     
                })      
            }
        }*/
             return (article)
            } else { 
                console.log("//////////")
                const article = document.createElement( 'article' );
                const h2 = document.createElement( 'h2' );
                h2.textContent = title;
                const h3 = document.createElement('h3')
                h3.innerHTML = likes +`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"/></svg>`
                const span = document.createElement('span')
                span.classList.add("infosAboutPhoto")
                const h4 = document.createElement('video')
                h4.setAttribute("src", `assets/images/medias/${video}`)
                h4.classList.add("img_carousel")
                article.appendChild(h4);
                article.appendChild(span);
                span.appendChild(h2);
                span.appendChild(h3);
                console.log("rentre dans condition")
                    h4.onclick = function(){
                        const carousel = document.getElementById('medias_modal')
                        carousel.style.display ="flex"
                        mediasSection = document.getElementById("medias")
                        mediasSection.style.display="none"
                        photographSection = document.getElementById('photograph_header')
                        photographSection.style.display = "none"
                        h4.classList.add("img_carousel")
                        const button = document.createElement('img')
                        button.setAttribute("src", "assets/icons/test.svg")
                        button.classList.add('closure_button')
                        carousel.appendChild(button);
                        carousel.appendChild(h4);
                        carousel.appendChild(h2);
                        h4.setAttribute("controls", "true")
                        h4.setAttribute("id", "video")
                    }
                return (article)
            }
        }   
    return { date, id, image, likes, photographerId, price, title, video, getMediaCardDOM }
}


