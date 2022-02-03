
class SlideShow {
    constructor(photographerName, listOfPhotos, indexOfCurrent) {
        //initialisation les elements du slideshow
        this.photographerName = photographerName;
        this.listOfPhotos = listOfPhotos;
        this.indexOfCurrent = indexOfCurrent;
        this.img = document.getElementsByClassName("current-img")[0];
        this.videoSrc = document.getElementById("video-src");
        this.video = document.getElementsByClassName("current-video")[0];
        this.titleImg = document.getElementById("title-img");
        this.modal = document.getElementById("slideshow_modal");
        this.nextButton = document.getElementById("next");
        this.prevButton = document.getElementById("prev");
        this.closeButton = document.getElementById("close");

        const context = this;
        this.nextButton.addEventListener("click", function () {
            context.nextPhoto()
        })

        this.prevButton.addEventListener("click", function () {
            context.prevPhoto()
        })
        this.closeButton.addEventListener("click", function () {
            context.close()
        })

        //fonctions clavier pour les touches directionnelles
        document.onkeydown = function (e) {
            e = e || window.event;
            if (e.key == "ArrowRight") {
                context.nextPhoto()
            }

            if (e.key == "ArrowLeft") {
                context.prevPhoto()
            }

            if (e.key == "Escape") {
                context.close()
            }
        };

    }

    close() {
        this.modal.style.display = "none";
    }

    open(index) {
        const media = this.listOfPhotos[index]
        const isPhoto = media.image ? true : false;
        this.indexOfCurrent = index;
        this.modal.style.display = "block";

        if (isPhoto) {
            const photoLink = `assets/images/${this.photographerName}/${media.image}`;
            this.video.style.display = 'none'
            this.img.style.display = 'block'
            this.img.setAttribute("src", photoLink)
            this.img.setAttribute("alt", media.title)


        } else {
            const videoLink = `assets/images/${this.photographerName}/${media.video}`;
            this.video.style.display = 'block'
            this.img.style.display = 'none'
            this.videoSrc.setAttribute("src", videoLink)
            this.video.load();
            this.video.play();
        }
        this.prevButton.focus();
        this.titleImg.textContent = media.title;

        this.checkControlers(index)


    }

    nextPhoto() {

        //si on est pas sur la derniere image
        if (this.indexOfCurrent !== this.listOfPhotos.length - 1) {

            //l'image suivante
            const nextMedia = this.listOfPhotos[this.indexOfCurrent + 1]

            //s'il s'agit d'une image
            if (nextMedia.image !== undefined) {
                this.img.style.display = 'block';

                //le lien de l'image suivante
                const nextPhotoLink = `assets/images/${this.photographerName}/${nextMedia.image}`;

                //changement de l'image actuelle
                this.img.setAttribute("src", nextPhotoLink)
                this.video.style.display = 'none';

                //s'il s'agit d'une video
            } else if (nextMedia.video !== undefined) {
                this.video.style.display = 'block';

                //le lien de l'image suivante
                const nextVideoLink = `assets/images/${this.photographerName}/${nextMedia.video}`;

                //changement de l'image actuelle
                this.videoSrc.setAttribute("src", nextVideoLink)
                this.img.style.display = 'none';

                this.video.load();
                this.video.play();
            }
            this.titleImg.textContent = nextMedia.title;

            this.indexOfCurrent++;
            this.checkControlers(this.indexOfCurrent)
        }
    }

    checkControlers(index) {
        const isLast = index === this.listOfPhotos.length - 1;
        const isFirst = index === 0;

        if (isLast) {
            this.nextButton.style.display = 'none'
        } else {
            this.nextButton.style.display = 'block'
        }
        if (isFirst) {
            this.prevButton.style.display = 'none'
            this.nextButton.focus();
        } else {
            this.prevButton.style.display = 'block'
        }
    }

    prevPhoto() {
        if (this.indexOfCurrent !== 0) {

            //l'image suivante
            const nextMedia = this.listOfPhotos[this.indexOfCurrent - 1]

            if (nextMedia.image !== undefined) {
                this.img.style.display = 'block';

                //le lien de l'image suivante
                const nextPhotoLink = `assets/images/${this.photographerName}/${nextMedia.image}`;

                //changement de l'image actuelle
                this.img.setAttribute("src", nextPhotoLink)
                this.video.style.display = 'none';
                //img.setAttribute("id", nextMedia.id)
            } else if (nextMedia.video !== undefined) {
                this.video.style.display = 'block';

                //le lien de l'image suivante
                const nextVideoLink = `assets/images/${this.photographerName}/${nextMedia.video}`;

                //changement de l'image actuelle
                this.videoSrc.setAttribute("src", nextVideoLink)
                this.img.style.display = 'none';

                this.video.setAttribute("id", nextMedia.id)

                this.video.load();
                this.video.play();
            }

            this.titleImg.textContent = nextMedia.title;

            this.indexOfCurrent--;
            this.checkControlers(this.indexOfCurrent)

        }

    }

}