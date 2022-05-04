import sliderVideo from "../model/SliderVideo.js";
import sliderPhoto from "../model/SliderPhoto.js";

export default function sliderFactory(firstMedia, sortMedia, name) {
    let n = 0
    const slider = document.querySelector(".slider")
    const slidesContainer = document.querySelector(".slides__container")
    const slides = []
    sortMedia.forEach((media, index) => {
      
        const slide = document.createElement("article")
        slide.classList.add("slide")
        if (media.tag === "video") {
            slide.innerHTML = sliderVideo(media)  

        } else if (media.tag === "img") {
            slide.innerHTML = sliderPhoto(media)
        }

        if (firstMedia.id === media.id){
            n = index 
        }
        
        slidesContainer.appendChild(slide);
        slides.push(slide)
    })
    slider.classList.add("active")
    const firstSlide = slides[n]
    firstSlide.className += " active"
    
    const nbrSlider = slides.length


    const back = document.querySelector(".back")
    const next = document.querySelector(".next")
    const close = document.querySelector(".close")

    back.addEventListener("click", () => {
        slides[n].classList.remove('active')
        n--
        if (n < 0) { n = nbrSlider - 1 }
        slides[n].classList.add("active")
    })

    next.addEventListener("click", () => {
        slides[n].classList.remove('active')
        n++
        if (n >= nbrSlider) { n = 0 }
        
        slides[n].classList.add("active")
    })

    close.addEventListener("click", () => {
        slidesContainer.innerHTML = ""
        slider.classList.remove("active")
       
    })

    function removeActiveImages(){
        for( let i = 0; i < nbrSlider ;  i++) {
           
        }
    }

}