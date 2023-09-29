function displayModal() {
	const bodyElement = document.body;

	const modal = document.getElementById("contact_modal");
	const closeModalBtn = document.querySelector("[data-js='close-modal']");

	modal.style.display = "block";
	modal.setAttribute("aria-hidden", "false");
	closeModalBtn?.focus();

	const scrollbarWidth =
		window.innerWidth - document.documentElement.clientWidth;

	bodyElement.style.maxWidth = `${
		bodyElement.offsetWidth + scrollbarWidth
	}px`;
	bodyElement.style.overflow = "hidden";
	bodyElement.style.paddingRight = `${scrollbarWidth}px`;

	const photographerInfo = document.querySelector(".photographer-info");
	photographerInfo.style.marginRight = `${36 + scrollbarWidth}px`;

}

function closeModal() {
	const bodyElement = document.body;

	const openModalBtn = document.querySelector("[data-js='open-modal']");
	const modal = document.getElementById("contact_modal");
	modal.style.display = "none";
	modal.setAttribute("aria-hidden", "true");
	openModalBtn?.focus();

	bodyElement.style.overflow = null;
	bodyElement.style.paddingRight = null;
	bodyElement.style.maxWidth = null;

	const photographerInfo = document.querySelector(".photographer-info");
	photographerInfo.style.marginRight = null;
}

function handleForm(e) {
	e.preventDefault();
	const formData = new FormData(e.currentTarget);
	const formDataObject = {};
	formData.forEach((value, key) => {
		formDataObject[key] = value;
	});
	console.log(formDataObject);
}

document.addEventListener("keydown", (e) => {
	const modal = document.querySelector("#contact_modal");

	if (e.key === "Escape" && modal.getAttribute("aria-hidden") == "false") {
		closeModal();
	}
});

document
	.querySelector("[data-js='close-modal']")
	.addEventListener("keydown", function (event) {
		if (event.key === " " || event.code === "Space") {
			closeModal();
		}
	});
