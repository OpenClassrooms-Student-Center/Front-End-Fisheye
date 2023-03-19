
let isOpen = false;

function displayModal() {
  isOpen = true;
  const modal = document.getElementById("contact_modal");
  // add focus on input prenom when the modal is open
  // const prenom = document.querySelector("#prenom");
  // prenom.focus();
  modal.style.display = "block";
  hiddeBanner();
}

function closeModal() {
  isOpen = false;
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
  hiddeBanner();
}

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





