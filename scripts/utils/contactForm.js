const modal = document.getElementById("contact_modal");

function displayModal() {
  const contactMeText = document.getElementById("modal_title");
  const firstNameInput = document.getElementById("first-name");
  const btn = document.getElementsByClassName("send_form");
  const closeBtn = document.getElementsByClassName("close_form");
  const photographerName = document.getElementsByClassName("photographer_header").innerText;

  modal.setAttribute("aria-label", "Contact me " + photographerName);
  contactMeText.innerHTML = `Contactez-moi <br/> ${ photographerName }`;
  modal.style.display = "block";

  // When the contact modal opens, we set the focus on the first form field
  firstNameInput.focus();

  // On click on the 'send' button, the user's inputs are logged in the console
  if (btn) {
    btn.addEventListener("click", function(e) {
      e.preventDefault();
      const firstName = document.getElementById("first-name").value;
      const lastName = document.getElementById("last-name").value;
      const email = document.getElementById("email").value;
      const message = document.getElementById("message").value;
      setTimeout(function() {
        console.log("Prénom : ", firstName);
        console.log("Nom : ", lastName);
        console.log("Email : ", email);
        console.log("Message : ", message);
      }, 2000);
    });
  }
  // Close the contact modal, for keyboard navigation
  document.addEventListener('keypress', function(e) {
    if (closeBtn === document.activeElement && e.key === 'Enter') {
      modal.style.display = "none";
    }
  });
}

// Close the contact modal on click on the cross icon
function closeModal() {
  modal.style.display = "none";
}
