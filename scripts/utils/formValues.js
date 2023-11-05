// Récupérer le nom du photographe
function getPhotographerName(photographer) {
  const $namePhotographer = document.getElementById("photographerName");
  $namePhotographer.textContent = `${photographer.name}`;

  return $namePhotographer;
}
// Fonction pour récupérer les valeurs d'un formulaire
function getFormValues(form) {
  const formFields = form.querySelectorAll("input, textarea");
  const formValues = {};

  formFields.forEach((field) => {
    if (field.name) {
      formValues[field.name] = field.value;
    }
  });

  return formValues;
}
