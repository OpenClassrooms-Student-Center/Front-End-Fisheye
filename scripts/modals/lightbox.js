// POINTER DOM
let lightboxModal = document.querySelector('.lightbox')
let lightboxModalClose = document.querySelector('.close-lightbox')

let lightboxContain = document.querySelector(".lightbox-container")
let lightboxTitle = document.querySelector(".lightbox-media-title")

let prev = document.querySelector('.left-arrow')
let next = document.querySelector('.right-arrow')

let titleContain = document.querySelector('.title-image')
let mainContain = document.querySelector('#main')

let all = []
let position = 0

const openLightbox = (e) => {
    // accéssibilité clavier
    mainContain.setAttribute('aria-hidden', 'true')
    lightboxModal.setAttribute('aria-hidden', 'false')
    lightboxModalClose.focus()


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
const removeVideoCtrl = () => {
    all = document.querySelectorAll('.card-image')
    for (let m of all) {
        let videoElt = m.childNodes[1].children[0]
        console.log(videoElt);

        if (videoElt.nodeName === 'VIDEO') {
            videoElt.removeAttribute('controls')

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
    // accéssibilité clavier
    mainContain.setAttribute('aria-hidden', 'true')
    lightboxModal.setAttribute('aria-hidden', 'false')
    // remove lecteur vidéo
    removeVideoCtrl()
    // close modal
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
        //commande clavier
        m.childNodes[1].addEventListener('keypress', openLightbox)

    }

    // ---- EventListener CLose lightbox
    lightboxModalClose.addEventListener('click', closeLightbox)
    //commande clavier
    lightboxModalClose.addEventListener('keypress', (e) => {
        if (e.key == 'Enter') {
            closeLightbox()
        }
    })
    // ---- EventListener prevMedia lightbox
    prev.addEventListener('click', prevMedia)
    //commande clavier
    prev.addEventListener("keypress", (e) => {
        if (e.key == 'Enter') {
            prevMedia()
        }
    })
    // ---- EventListener nextMedia lightbox
    next.addEventListener('click', nextMedia)
    //commande clavier
    next.addEventListener("keypress", (e) => {
        if (e.key == 'Enter') {
            nextMedia()
        }
    })

    // ---- Navigation fleche directionnel
    document.addEventListener('keydown', (e) => { arrowKeyNavigation(e) })
}
// Navigation fleche directionnel
const arrowKeyNavigation = (e) => {
    e = e || window.e

    if (e.keyCode == '37') {
        nextMedia()
    }
    if (e.keyCode == '39') {
        prevMedia()
    }

    if (e.keyCode == '27') {
        closeLightbox(e)
    }
}