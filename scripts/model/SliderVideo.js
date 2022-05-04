export default function sliderVideo(media) {
    return `
                <${media.tag} controls muted="true" src=${media.path} class="photo__slider"></${media.tag}>
                <span class="title__slider" >${media.title}</span>
                `
    
}