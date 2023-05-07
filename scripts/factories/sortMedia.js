
async function displaySortMedia(photographerName, media) {

	const selectContainer = document.querySelector(".select-container");
	const selectElement = selectContainer.querySelector("select");
	const selectedElement = document.createElement("div");
	const optionsList = document.createElement("div");

	selectedElement.classList.add("select-selected");
	selectedElement.textContent = selectElement.options[selectElement.selectedIndex].textContent;
	selectContainer.appendChild(selectedElement);
	optionsList.classList.add("select-items", "select-hide");

	await sortMedia(selectedElement.textContent);

	for (let option of selectElement.options) {
		const optionItem = document.createElement("div");
		optionItem.textContent = option.textContent;

		optionItem.addEventListener("click", () => {
			const previousOptionItem = optionsList.querySelector(".select-hide-option");
			if (previousOptionItem) {
				previousOptionItem.classList.remove("select-hide-option");
			}
			optionItem.classList.add("select-hide-option");
			selectedElement.textContent = option.textContent;
			optionsList.classList.add("select-hide");
			selectedElement.classList.toggle("select-arrow-active");
			optionsList.insertBefore(optionItem, optionsList.firstChild);
			sortMedia(optionItem.textContent);
		});
        
		if (selectedElement.textContent !== optionItem.textContent) {
			optionsList.appendChild(optionItem);
		} else {
			optionItem.classList.add("select-hide-option");
			optionsList.insertBefore(optionItem, optionsList.firstChild);
		}
	}

	selectContainer.appendChild(optionsList);

	selectedElement.addEventListener("click", (e) => {
		e.stopPropagation();
		optionsList.classList.toggle("select-hide");
		selectedElement.classList.toggle("select-arrow-active");
	});


	function sortMedia(sortBy) {
		let sortedMedia = [];

		if (sortBy === "Titre") {
			sortedMedia = media.sort((a, z) => {
				return a.title.localeCompare(z.title);
			});
		} 
		if (sortBy === "Date") {
			sortedMedia = media.sort((a, z) => {
				return new Date(a.date).valueOf() - new Date(z.date).valueOf();
			});
		}
		if (sortBy === "Popularité") {
			sortedMedia = media.sort((a, z) => {
				return parseInt(z.likes) - parseInt(a.likes);
			});
		}

		const mediaContainer = document.querySelector(".media-container");
		mediaContainer.innerHTML = "";

		sortedMedia.forEach(async (media) => {
			const photographMedia = await mediaFactory(photographerName, media);
			const sortedMediaCardDOM = photographMedia.getMediaCardDOM();
			mediaContainer.appendChild(sortedMediaCardDOM);
		});
	}
}