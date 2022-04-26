export default function sliderVideo(media, name) {
    const pathName = name.split(/-| /).join("")
    const photoPath = `../assets/Sample_Photos/${pathName}/${media.image}`;

    return `
                <img src=${photoPath} class="photo__slider"></img>
                <span class="title__slider" >${media.title}</span>
                `
    
}