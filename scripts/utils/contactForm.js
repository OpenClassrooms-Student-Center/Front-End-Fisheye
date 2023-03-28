let isOpen = false;

function displayModal() {
  isOpen = true;
  const modal = document.getElementById("contact_modal");
  const contactForm = document.querySelector("#modal");
  const page = document.querySelector("body");

  const modalChildren = modal.querySelectorAll("*");
  // ajouter l'attribut tabindex à tous les éléments enfants de la modal
  for (let i = 0; i < modalChildren.length; i++) {
    modalChildren[i].setAttribute("tabindex", "0");
  }
  if (isOpen) {
    modal.style.display = "block";
    page.setAttribute("aria-hidden", "true");
    // mettre le focus sur le premier élément du formulaire
    document.querySelector("#prenom").focus();
    contactForm.setAttribute("aria-hidden", "false");
    contactForm.setAttribute("aria-modal", "true");
    // cacher la bannière fixe
    hiddeBanner();

    // ajouter gestionnaire d'événements pour la navigation au clavier
    modal.addEventListener("keydown", function (event) {
      if (event.key === "Tab") {
        event.preventDefault();
        // récupérer tous les éléments focusables dans la modal
        const focusableElements = contactForm.querySelectorAll(
          "a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex='-1'])"
        );
        // récupérer l'élément sur lequel le focus est actuellement
        const currentFocus = document.activeElement;
        // récupérer l'index de l'élément sur lequel le focus est actuellement
        const currentIndex = Array.prototype.indexOf.call(
          focusableElements,
          currentFocus
        );
        // déterminer l'index de l'élément suivant ou précédent selon la touche enfoncée
        let nextIndex =
          event.shiftKey && currentIndex === 0
            ? focusableElements.length - 1
            : (currentIndex + 1) % focusableElements.length;
        // mettre le focus sur l'élément suivant ou précédent
        focusableElements[nextIndex].focus();
      }
      if (event.key === "Escape") {
        closeModal();
      }
    });
  }
}

function closeModal() {
  isOpen = false;
  const modal = document.getElementById("contact_modal");
  const contactForm = document.querySelector("#modal");
  contactForm.setAttribute("aria-hidden", "true");
  contactForm.setAttribute("aria-modal", "false");
  modal.style.display = "none";

  // reset du formulaire
  document.querySelector("#prenom").value = "";
  document.querySelector("#nom").value = "";
  document.querySelector("#email").value = "";
  document.querySelector("#message").value = "";
  
  hiddeBanner();
}

// cacher la bannière fixe
function hiddeBanner() { 
  if (isOpen) {
    const banner = document.querySelector(".banner");
    banner.style.display = "none";
  } else {
    const banner = document.querySelector(".banner");
    banner.style.display = "block";
  }
}

// recupérer la valeur entrée dans chaque input du formulaire et faire un console.log au moment du submit
const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  try {
    const userObject = {
      prenom: document.querySelector("#prenom").value,
      nom: document.querySelector("#nom").value,
      email: document.querySelector("#email").value,
      message: document.querySelector("#message").value,
    };
    console.log(userObject);
    closeModal();
  } catch (error) {
    console.log(error);
  }
});

