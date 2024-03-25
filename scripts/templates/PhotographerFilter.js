export default class PhotographerFilter {
	constructor (medias, lightbox) {
		this.medias = medias;
		this.lightbox = lightbox;
	}

	applySort (sortBy) {
		switch (sortBy) {
		case "likes":
			this.medias.sort((a, b) => b.likes - a.likes);
			break;
		case "date":
			this.medias.sort((a, b) => new Date(b.date) - new Date(a.date));
			break;
		case "title":
			this.medias.sort((a, b) => a.title.localeCompare(b.title));
			break;
		}

		const photographerMedias = document.querySelector(".photograph-medias");
		photographerMedias.innerHTML = "";

		this.medias.forEach((media) => media.render());

		// Mise à jour des médias dans la lightbox
		this.lightbox.updateMedias(this.medias);
	}

	initSort () {
		this.applyActiveSort();

		const chevron = document.querySelector(".chevron");
		const sortButton = document.querySelector(".sort_button");
		const sortDropdown = document.querySelector(".sort_dropdown");
		
		// Fonction pour basculer l'affichage du menu déroulant et ajuster tabindex
		const toggleDropdown = () => {
			sortDropdown.classList.toggle("show");
			sortButton.classList.toggle("radius_bottom_none");

			// Si sortDropdown a la classe 'show', rendre les li focusables
			if (sortDropdown.classList.contains("show")) {
				chevron.classList.add("rotate_bottom");
				sortButton.setAttribute("aria-expanded", "true");
				document.querySelectorAll(".sort_dropdown li").forEach(li => {
					li.setAttribute("tabindex", "0"); // Rendre focusable
				});
			} else {
				chevron.classList.remove("rotate_bottom");
				sortButton.setAttribute("aria-expanded", "false");
				document.querySelectorAll(".sort_dropdown li").forEach(li => {
					li.setAttribute("tabindex", "-1"); // Rendre non focusable
				});
			}
		};

		sortButton.addEventListener("click", toggleDropdown);

		// Fonction pour mettre à jour le texte du bouton et gérer le tri
		const updateSort = (sortDropdownLink) => {
			// Appliquer le tri sélectionné
			const sortBy = sortDropdownLink.getAttribute("data-sort");
			this.applySort(sortBy);
		
			// Mise à jour du texte du bouton et de la classe active
			const sortButtonText = document.querySelector(".sort_button_text");
			sortButtonText.textContent = sortDropdownLink.textContent;
			const activeLi = document.querySelector(".sort_dropdown li.active");
			if (activeLi) {
				activeLi.classList.remove("active");
				activeLi.setAttribute("aria-selected", "false");
			}
			sortDropdownLink.classList.add("active");
			sortDropdownLink.setAttribute("aria-selected", "true");
		
			toggleDropdown(); // Fermer le menu déroulant après sélection
		
			// Remettre le focus sur le bouton de tri après la mise à jour
			sortButton.focus();
		};

		// Attacher les gestionnaires d'événements aux liens de tri
		document.querySelectorAll(".sort_dropdown li").forEach(link => {
			link.addEventListener("click", (event) => {
				event.preventDefault();
				updateSort(event.currentTarget);
			});
			// Ajout pour gérer l'appui sur la touche Entrée
			link.addEventListener("keydown", (event) => {
				if (event.key === "Enter" || event.key === " ") {
					event.preventDefault();
					updateSort(event.currentTarget);
				}
			});
		});

		// Fermer le dropdown si l'utilisateur clique en dehors
		window.addEventListener("click", (event) => {
			if (!sortButton.contains(event.target) && sortDropdown.classList.contains("show")) {
				toggleDropdown();
			}
		});
	}

	// Appliquer le tri actif dès l'initialisation
	applyActiveSort () {
		const activeSortLink = document.querySelector(".sort_dropdown li.active");
		if (activeSortLink) {
			const sortButtonText = document.querySelector(".sort_button_text");
			sortButtonText.textContent = activeSortLink.textContent;
			document.querySelectorAll(".sort_dropdown li").forEach(link => {
				link.setAttribute("aria-selected", "false");
			});
			activeSortLink.setAttribute("aria-selected", "true");
			
			// Appliquer le tri basé sur l'option active
			const sortBy = activeSortLink.getAttribute("data-sort");
			this.applySort(sortBy);
		}
	}
}
