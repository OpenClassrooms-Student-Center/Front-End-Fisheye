function displayModal() {
	const modal = document.getElementById("contact_modal");
	const closeModalBtn = document.querySelector("[data-js='close-modal']");

	modal.style.display = "block";
	modal.setAttribute("aria-hidden", "false");
	closeModalBtn?.focus();
}

function closeModal() {
	const openModalBtn = document.querySelector("[data-js='open-modal']");
	const modal = document.getElementById("contact_modal");
	modal.style.display = "none";
	modal.setAttribute("aria-hidden", "true");
	openModalBtn?.focus();
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
