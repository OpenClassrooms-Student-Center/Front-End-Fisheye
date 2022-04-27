export default function sliderVideo(media) {

    return `
                <${media.tag} src=${media.path} class="photo__slider"></iframe>
                <span class="title__slider" >${media.title}</span>
                `
    
}