class Lightbox {
	constructor(openersSelector, closeBtn, prevBtn, nextBtn, lightboxItself, mediaViewerWrapper) {
		this.openersSelector = openersSelector
		this.closeBtn = document.querySelector(closeBtn)
		this.prevBtn = document.querySelector(prevBtn)
		this.nextBtn = document.querySelector(nextBtn)
		this.lightboxItself = document.querySelector(lightboxItself)
		this.mediaViewerWrapper = document.querySelector(mediaViewerWrapper)
	}

	openLightbox() {
		document.addEventListener('click', (event) => { // car elements chargés dynamiquement
			const opener = event.target.closest(this.openersSelector)
			if (opener) {
				this.currentMediaIndex = parseInt(opener.getAttribute('data-index'))
				this.currentMediaType = opener.getAttribute('data-type')
				this.currentMediaSrc = opener.getAttribute('data-original-src')
				this.currentMediaTitle = opener.getAttribute('data-title')
				this.showMedia()
				this.lightboxItself.style.display = 'flex'
			}
		})
	}

	showMedia() {

		this.mediaViewerWrapper.innerHTML = '' // remise à zéro du contenu du media viewer 

		if (this.currentMediaType === 'image') {
			const img = document.createElement('img')
			img.src = this.currentMediaSrc
			this.mediaViewerWrapper.appendChild(img)

			const mediaTitle = document.querySelector('.media_title_in_lightbox')
			img.title = this.currentMediaTitle
			mediaTitle.textContent = img.title

		} else if (this.currentMediaType === 'video') {
			const video = document.createElement('video')
			video.src = this.currentMediaSrc
			video.controls = true
			this.mediaViewerWrapper.appendChild(video)

			const mediaTitle = document.querySelector('.media_title_in_lightbox')
			video.title = this.currentMediaTitle
			mediaTitle.textContent = video.title
		}
	}

	closeLightbox() {
		this.closeBtn.addEventListener('click', () => {
			this.lightboxItself.style.display = 'none'
		})

		document.addEventListener('keydown', (event) => {
			if (event.key === 'Escape' && this.lightboxItself.style.display === 'flex') {
				this.lightboxItself.style.display = 'none'
			}
		})
	}

	showPreviousMedia() {
		this.prevBtn.addEventListener('click', () => {
			if (this.currentMediaIndex > 0) {
				this.currentMediaIndex--
				this.changeMedia()
			}
		})

		document.addEventListener('keydown', (event) => {
			if (event.key === 'ArrowLeft' && this.lightboxItself.style.display === 'flex' && this.currentMediaIndex > 0) {
				this.currentMediaIndex--
				this.changeMedia()
			}
		})
	}

	showNextMedia() {
		this.nextBtn.addEventListener('click', () => {
			if (this.currentMediaIndex < this.countTotalMediaItems() - 1) {
				this.currentMediaIndex++
				this.changeMedia()
			}
		})

		document.addEventListener('keydown', (event) => {
			if (event.key === 'ArrowRight' && this.lightboxItself.style.display === 'flex' && this.currentMediaIndex < this.countTotalMediaItems() - 1) {
				this.currentMediaIndex++
				this.changeMedia()
			}
		})
	}

	countTotalMediaItems() {
		this.totalMediaItems = document.querySelectorAll(this.openersSelector).length
		return this.totalMediaItems
	}

	changeMedia() {
		if (this.currentMediaIndex >= 0 && this.currentMediaIndex < this.countTotalMediaItems()) {

			let currentMedia = document.querySelector('img[data-index=\'' + this.currentMediaIndex + '\']')
			this.currentMediaSrc = currentMedia.getAttribute('data-original-src')
			this.currentMediaType = currentMedia.getAttribute('data-type')
			this.currentMediaTitle = currentMedia.getAttribute('data-title')
			this.showMedia()
		}
	}
}

const newLightbox = new Lightbox('.media_wrapper img', '.closing_lightbox_btn', '.prev_btn', '.next_btn', '.lightbox', '.media_viewer_wrapper')
newLightbox.openLightbox()
newLightbox.closeLightbox()
newLightbox.showMedia()
newLightbox.showPreviousMedia()
newLightbox.showNextMedia()
