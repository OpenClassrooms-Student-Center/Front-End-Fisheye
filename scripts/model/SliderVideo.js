export default function sliderVideo(media, name) {
    const pathName = name.split(/-| /).join("")
    const photoPath = `../assets/Sample_Photos/${pathName}/${media.video}`;

    return `
                <iframe src=${photoPath} class="photo__slider"></iframe>
                <span class="title__slider" >${media.title}</span>
                `
    
}