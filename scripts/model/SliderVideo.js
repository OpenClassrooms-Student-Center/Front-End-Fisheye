export default function sliderVideo(media) {
    return `
                <${media.tag} controls muted="true" src=${media.path} class="photo__slider" role="Image" aria-label="${media.title} de ${media.name}" alt="${media.title}"></${media.tag}>
                <span class="title__slider" >${media.title}</span>
                `
    
}