export default function sliderVideo(media) {
    return `
                <${media.tag} controls autoplay="true" muted="true" src=${media.path} class="photo__slider"></iframe>
                <span class="title__slider" >${media.title}</span>
                `
    
}