export default function sliderVideo(media) {

    return `
                <img src=${media.path} class="photo__slider" role="Image" aria-label="${media.title} de ${media.name}" alt="${media.title}"></img>
                <span class="title__slider" >${media.title}</span>
                `
    
}