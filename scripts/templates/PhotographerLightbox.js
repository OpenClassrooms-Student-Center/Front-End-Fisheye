import Image from "../models/Image.js";
import Video from "../models/Video.js";

export default class PhotographerLightbox {
	constructor(medias) {
		this.medias = medias;
		this.currentIndex = 0; // Index du média actuel
	}

	displayCurrentMedia(focusOnOpen = false) {
		const media = this.medias[this.currentIndex];
		const lightboxMediaContainer = document.querySelector(".lightbox_media");
		lightboxMediaContainer.innerHTML = "";

		let mediaElement;

		if (media instanceof Image) {
			mediaElement = `<img src="${media.src}" alt="${media.title}" />` +
                           `<h3 class="media-title">${media.title}</h3>`;
		} else if (media instanceof Video) {
			mediaElement = `<video controls><source src="${media.src}" type="video/mp4"></video>` +
                           `<h3 class="media-title">${media.title}</h3>`;
		}

		lightboxMediaContainer.innerHTML = mediaElement;

		if (focusOnOpen) {
			const focusableElements = lightboxMediaContainer.querySelectorAll("button, [href], input, select, textarea, [tabindex]:not([tabindex=\"-1\"])");
			if (focusableElements.length > 0) {
				focusableElements[0].focus();
			}
		}
	}

	trapFocus(event) {
		const focusableElements = document.querySelector(".lightbox_modal").querySelectorAll("button, [href], input, select, textarea, [tabindex]:not([tabindex=\"-1\"])");
		const firstFocusableElement = focusableElements[0];
		const lastFocusableElement = focusableElements[focusableElements.length - 1];

		if (event.key === "Tab") {
			if (event.shiftKey) { // Si Shift + Tab est pressé
				if (document.activeElement === firstFocusableElement) {
					lastFocusableElement.focus();
					event.preventDefault();
				}
			} else { // Si Tab est pressé
				if (document.activeElement === lastFocusableElement) {
					firstFocusableElement.focus();
					event.preventDefault();
				}
			}
		}
	}

	openLightbox(index, openedByKeyboard = false) {
		this.lastFocusedElement = document.activeElement; // Mémoriser l'élément actif
		this.currentIndex = index;
		document.querySelector(".lightbox_modal").style.display = "block";
		this.displayCurrentMedia(openedByKeyboard);
	
		// Trouver le premier élément focusable dans la lightbox et lui donner le focus
		const focusableElements = document.querySelector(".lightbox_modal").querySelectorAll("button, [href], input, select, textarea, [tabindex]:not([tabindex=\"-1\"])");
		if (focusableElements.length > 0) {
			focusableElements[0].focus();
		}
	
		document.addEventListener("keydown", this.trapFocus.bind(this));
	}

	closeLightbox() {
		document.querySelector(".lightbox_modal").style.display = "none";
		document.removeEventListener("keydown", this.trapFocus.bind(this));
		
		if (this.lastFocusedElement) this.lastFocusedElement.focus(); // Restaurer le focus
	}

	attachEventListeners() {
		document.querySelector(".lightbox_prev").addEventListener("click", () => this.navigate(-1));
		document.querySelector(".lightbox_next").addEventListener("click", () => this.navigate(1));
		document.querySelector(".lightbox_close").addEventListener("click", () => this.closeLightbox());
		document.addEventListener("keydown", (e) => this.navigateKeyboard(e));
		this.setupMediaLinks();
	}

	setupMediaLinks() {
		document.querySelectorAll(".media_link").forEach((link, index) => {
			link.setAttribute("data-index", index); // Attribuer un index à chaque lien
			link.addEventListener("click", (e) => {
				e.preventDefault();
				this.openLightbox(index); // Ouvrir la lightbox sans mise au point automatique
			});
			link.addEventListener("keydown", (e) => {
				if (e.key === "Enter" || e.key === " ") { // Enter ou espace
					e.preventDefault();
					this.openLightbox(index, true); // Ouvrir la lightbox avec mise au point automatique
				}
			});
		});
	}

	navigateKeyboard(e) {
		if (e.key === "ArrowLeft") {
			this.navigate(-1);
		} else if (e.key === "ArrowRight") {
			this.navigate(1);
		} else if (e.key === "Escape") {
			this.closeLightbox();
		}
	}

	navigate(direction) {
		this.currentIndex += direction;
		if (this.currentIndex < 0) this.currentIndex = this.medias.length - 1;
		else if (this.currentIndex >= this.medias.length) this.currentIndex = 0;
		this.displayCurrentMedia();
	}

	updateMedias(medias) {
		this.medias = medias;
		this.setupMediaLinks(); 
	}

	initLightbox() {
		this.attachEventListeners();
	}
}