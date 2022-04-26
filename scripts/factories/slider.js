import sliderVideo from "../model/SliderVideo.js";
import sliderPhoto from "../model/SliderPhoto.js";

export default function sliderFactory(firstMedia, sortMedia, name) {
    console.table(sortMedia)
    console.log(firstMedia)
    let n = 0
    const slider = document.querySelector(".slider")
    sortMedia.forEach((media, index) =>{
        const slide = document.createElement("article")
        slide.classList.add("slide")
        if (media.video) {
            slide.innerHTML = sliderVideo(media, name)   

        } else if (media.image) {
            slide.innerHTML = sliderPhoto(media, name)   
        }

        if (firstMedia.id === media.id){
            n = index 
        }
        document.querySelector(".slider").appendChild(slide);

    })
    slider.classList.add("active")
    const slides = document.querySelectorAll(".slide")
    const firstSlide = slides[n]
    firstSlide.className += " active"
    
    const nbrSlider = slides.length


    const back = document.querySelector(".back")
    const next = document.querySelector(".next")
    const close = document.querySelector(".close")

    back.addEventListener("click", () => {
        n--
        if (n < 0) { n = nbrSlider - 1 }
        removeActiveImages()
        slides[n].classList.add("active")
    })

    next.addEventListener("click", () => {
        n++
        if (n >= nbrSlider) { n = 0 }
        removeActiveImages()
        slides[n].classList.add("active")
    })

    close.addEventListener("click", () => {
        removeActiveImages()
        slider.classList.remove("active")
        for ( let i = 0 ; i < nbrSlider; i++) {
            slider.parentNode.removeChild(slides[0])
            
        }
    })

    function removeActiveImages(){
        for( let i = 0; i < nbrSlider ;  i++) {
            slides[i].classList.remove('active')
        }
    }

}