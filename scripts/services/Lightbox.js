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
		document.addEventListener('click', (event) => {
			const opener = event.target.closest(this.openersSelector)
			if (opener) {
				this.currentMediaIndex = parseInt(opener.getAttribute('data-index'))
				this.currentMediaType = opener.getAttribute('data-type')
				this.currentMediaSrc = opener.getAttribute('data-original-src')
				this.currentMediaTitle = opener.getAttribute('data-title')
				this.showMedia()
				this.lightboxItself.style.display = 'flex'

				this.focusedElementBeforeLightbox = document.activeElement
				this.enableFocusTrap()
			}
		})
	
		this.keydownListener = (event) => {
			if (event.code === 'Space' && this.lightboxItself.style.display === 'flex') {
				this.playVideoOnSpaceKey()
			}
		}
	
		document.addEventListener('keydown', this.keydownListener)
	}

	openLightboxWithEnterKey() {

		document.addEventListener('keydown', (event) => {
			if (event.key === 'Enter') {
				const focusedElement = document.activeElement // si element en focus correspond au média :
				if (focusedElement && focusedElement.matches(this.openersSelector)) {

					this.currentMediaIndex = parseInt(focusedElement.getAttribute('data-index'))
					this.currentMediaType = focusedElement.getAttribute('data-type')
					this.currentMediaSrc = focusedElement.getAttribute('data-original-src')
					this.showMedia()
					this.lightboxItself.style.display = 'flex'
				}}
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

		this.closeBtn.setAttribute('tabindex', '0')
		this.closeBtn.addEventListener('click', () => {
			this.lightboxItself.style.display = 'none'
			document.removeEventListener('keydown', this.keydownListener)
		})

		// fermeture de la lightbox quand le focus est sur la croix et touche entrée pressée
		this.closeBtn.addEventListener('keydown', (event) => {
			if (event.key === 'Enter') {
				this.lightboxItself.style.display = 'none'
				document.removeEventListener('keydown', this.keydownListener)
			}
		})
		// fermeture de la lightbox en appuyant sur la touche échap
		document.addEventListener('keydown', (event) => {
			if (event.key === 'Escape' && this.lightboxItself.style.display === 'flex') {
				this.lightboxItself.style.display = 'none'
			}
		})

		if (this.focusedElementBeforeLightbox) {
			this.focusedElementBeforeLightbox.focus()
		}

		this.disableFocusTrap()
	}

	// permet au focus de rester dans la lightbox après ouverture
	enableFocusTrap() {
		this.focusTrapListener = (event) => {
			if (this.lightboxItself.style.display === 'flex') {

				const focusableElements = this.lightboxItself.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
				const firstFocusableElement = focusableElements[0]
				const lastFocusableElement = focusableElements[focusableElements.length - 1]

				if (event.target === lastFocusableElement && event.key === 'Tab' && !event.shiftKey) {
					event.preventDefault()
					firstFocusableElement.focus()
				} else if (event.target === firstFocusableElement && event.key === 'Tab' && event.shiftKey) {
					event.preventDefault()
					lastFocusableElement.focus()
				}
			}
		}

		document.addEventListener('keydown', this.focusTrapListener)
	}

	// permet au focus de se décloisonner de la lightbox à la fermeture de celle ci 
	disableFocusTrap() {
		document.removeEventListener('keydown', this.focusTrapListener)
	}


	showPreviousMedia() {

		this.prevBtn.setAttribute('tabindex', '0')
		this.prevBtn.addEventListener('click', () => {
			if (this.currentMediaIndex > 0) {
				this.currentMediaIndex--
				this.changeMedia()
			}
		})

		this.prevBtn.addEventListener('keydown', (event) => {
			if (event.key === 'Enter' && this.currentMediaIndex > 0) {
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
		
		this.nextBtn.setAttribute('tabindex', '0')
		this.nextBtn.addEventListener('click', () => {
			if (this.currentMediaIndex < this.countTotalMediaItems() - 1) {
				this.currentMediaIndex++
				this.changeMedia()
			}
		})

		this.nextBtn.addEventListener('keydown', (event) => {
			if (event.key === 'Enter' && this.currentMediaIndex < this.countTotalMediaItems() - 1) {
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

	playVideoOnSpaceKey() {
		if (this.currentMediaType === 'video') {
			const video = this.mediaViewerWrapper.querySelector('video')
			if (video) {
				if (video.paused) {
					video.play()
				} else {
					video.pause()
				}
			}
		}
	}
}

const newLightbox = new Lightbox('.media_wrapper img', '.closing_lightbox_btn', '.prev_btn', '.next_btn', '.lightbox', '.media_viewer_wrapper')
newLightbox.openLightbox()
newLightbox.openLightboxWithEnterKey()
newLightbox.closeLightbox()
newLightbox.showMedia()
newLightbox.showPreviousMedia()
newLightbox.showNextMedia()
newLightbox.playVideoOnSpaceKey()
