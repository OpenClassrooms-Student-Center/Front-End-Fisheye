export default function sliderVideo(media) {

    return `
                <img src=${media.path} class="photo__slider"></img>
                <span class="title__slider" >${media.title}</span>
                `
    
}