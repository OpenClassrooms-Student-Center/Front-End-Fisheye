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
