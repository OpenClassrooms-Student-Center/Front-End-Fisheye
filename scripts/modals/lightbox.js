// POINTER DOM
let lightboxModal = document.querySelector('.lightbox')
let lightboxModalClose = document.querySelector('.close-lightbox')

let lightboxContain = document.querySelector(".lightbox-container")
let lightboxTitle = document.querySelector(".lightbox-media-title")

let prev = document.querySelector('.left-arrow')
let next = document.querySelector('.right-arrow')

let titleContain = document.querySelector('.title-image')

let all = []
let position = 0

const openLightbox = (e) => {
    lightboxModal.style.display = 'block'
    window.scrollTo(0, 0)

    let media = e.target.parentNode.parentNode
    console.log(media);

    position = [...media.parentNode.children].indexOf(media)
    console.log(position)

    setVideoCtrl()

    setMedia()

}

const setVideoCtrl = () => {
    all = document.querySelectorAll('.card-image')
    for (let m of all) {
        let videoElt = m.childNodes[1].children[0]
        console.log(videoElt);

        if (videoElt.nodeName === 'VIDEO') {
            videoElt.setAttribute('controls', "")
            console.log('dans video');
        }

    }

}

const setMedia = () => {
    // Défini la position du media
    lightboxContain.innerHTML = all[position].childNodes[1].innerHTML

    // insertion du titre
    let titleImg = all[position].childNodes[1].dataset.title
    let eltTitle = `<h3>${titleImg}</h3>`
    lightboxContain.insertAdjacentHTML('beforeend', eltTitle)


}

const closeLightbox = () => {
    lightboxModal.style.display = 'none'
}

const prevMedia = () => {
    position--
    if (position == -1) {
        position = all.length - 1
    }
    setMedia()
}
const nextMedia = () => {
    position++
    if (position == all.length) {
        position = 0
    }
    setMedia()
}

const refreshCardPosition = () => {
    all = document.querySelectorAll('.card-image')
    console.log('refresh' + all);

}

const startLightboxListener = () => {
    all = document.querySelectorAll('.card-image')
    console.log(all)

    for (let m of all) {
        console.log(m.childNodes[1]);
        m.childNodes[1].addEventListener('click', openLightbox)

    }


    lightboxModalClose.addEventListener('click', closeLightbox)

    prev.addEventListener('click', prevMedia)
    next.addEventListener('click', nextMedia)
}
