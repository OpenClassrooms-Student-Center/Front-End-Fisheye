export default function createPhotoCard(media){
    const article = `
                <${media.tag} src=${media.path} class="photo"></${media.tag}>
                <span class="photo__title" >${media.title}</span>
                <span class="photo__likes" >${media.likes}</span>
                <i class="fas fa-heart"></i>`
    return article
}