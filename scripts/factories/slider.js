export default function sliderFactory(firstMedia, sortMedia, name) {
    console.table(sortMedia)
    console.log(firstMedia)
    let n = 0
    const slider = document.querySelector(".slider")
    sortMedia.forEach((media, index) =>{
        console.log(media)
        const pathName = name.split(/-| /).join("")
        const photoPath = `../assets/Sample_Photos/${pathName}/${media.image}`;
        const templateElm = document.querySelector(".slider__template");
        const slide= document.importNode(templateElm.content, true);
        const img = slide.querySelector(".photo__slider");
        img.src = photoPath;
        const title = slide.querySelector(".title__slider")
        title.textContent = media.title
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
        if (n > nbrSlider) { n = 0 }
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