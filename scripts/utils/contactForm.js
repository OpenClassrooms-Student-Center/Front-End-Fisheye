const contactForm = {
  firstName: {
    element: document.getElementById("first-name"),
    test: () => document.getElementById("first-name").value.length >= 2,
    errorMessage:
      "Veuillez entrer au moins 2 caractères (uniquement des lettres).",
  },
  lastName: {
    element: document.getElementById("last-name"),
    test: () => document.getElementById("last-name").value.length >= 2,
    errorMessage:
      "Veuillez entrer au moins 2 caractères (uniquement des lettres).",
  },
  email: {
    element: document.getElementById("email"),
    test: () =>
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/g.test(
        document.getElementById("email").value
      ),
    errorMessage: "Veuillez entrer une adresse email valide.",
  },
  message: {
    element: document.getElementById("message"),
    test: () => document.getElementById("message").value.length >= 10,
    errorMessage: "Veuillez entrer au moins 10 caractères.",
  },
  submitBtn: document.querySelector(".submit_button"),
};

async function getPhotographer() {
  const response = await fetch("data/photographers.json");
  const data = await response.json();
  const photographers = data.photographers;
  const urlParams = new URL(document.location).searchParams;
  const id = urlParams.get("id");
  return photographers.find((photographer) => photographer.id == id);
}

async function displayModal() {
  const photographer = await getPhotographer();
  const modal = document.getElementById("contact_modal");
  const headerModal = document.querySelector(".header_modal");
  const modalTitle = document.createElement("h2");

  modalTitle.classList.add("modal_title");
  modalTitle.innerHTML = `Contactez-moi<br> ${photographer.name}`;
  headerModal.prepend(modalTitle);

  modal.style.display = "flex";
}

function closeModal() {
  const modal = document.getElementById("contact_modal");
  const modalContent = document.querySelector(".modal");
  const modalTitle = document.querySelector(".modal_title");
  const confirmationModal = document.querySelector(".submit-confirmation");

  modalTitle.remove();

  modal.style.display = "none";
  modalContent.style.display = "flex";
  confirmationModal.style.display = "none";
}

function checkForm() {
  let isValid = true;
  Object.keys(contactForm).forEach((key) => {
    if (key !== "submitBtn") {
      if (!contactForm[key].test()) {
        contactForm[key].element.setAttribute(
          "placeholder",
          `${contactForm[key].errorMessage}`
        );
        contactForm[key].element.style.border = "1px solid red";
        isValid = false;
      } else {
        contactForm[key].element.setAttribute("placeholder", "");
        contactForm[key].element.style.border = "1px solid #fff";
      }
    }
  });
  return isValid;
}

function resetForm() {
  Object.keys(contactForm).forEach((key) => {
    if (key !== "submitBtn") {
      contactForm[key].element.value = "";
    }
  });
}

function submitForm() {
  const form = {
    firstName: document.getElementById("first-name").value,
    lastName: document.getElementById("last-name").value,
    email: document.getElementById("email").value,
    message: document.getElementById("message").value,
  };
  console.log("Form submitted", form);
}

contactForm.submitBtn.addEventListener("click", (event) => {
  event.preventDefault();
  if (!checkForm()) {
    return console.log("Form not submitted");
  }
  submitForm();
  resetForm();
  document.querySelector(".modal").style.display = "none";
  document.querySelector(".submit-confirmation").style.display = "flex";
});
