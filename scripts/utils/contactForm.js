function displayModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "block";
}

function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
}

// TODO: créer les regex pour les champs prénom / nom / email
// TODO: ajouter une max length pour le champ message
// TODO: créer les event listener et fonctions qui vérifient la validité des champs
// TODO: créer la fonction validate qui va afficher les infos saisies dans la console
