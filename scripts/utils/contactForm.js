export function displayModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "block";
}

export function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
}

function validate(event) {
  //paramètre event
  try {
    event.preventDefault(); //prevents page refreshing when form is filled
    let isValid = true; //set status to valid to prevent errors showing before form is sent

    const fields = [
      //array of objects with form fields to be validated
      { id: "first", name: "prénom" },
    ];

    fields.forEach((field) => {
      //loop through each field id, trimmed spaces and error message
      const baliseField = document.getElementById(field.id);
      const valeurField = baliseField.value.trim();
      const errorElement = document.getElementById("error-" + field.id);
      errorElement.textContent = "";

      if (valeurField === "") {
        //condition and outcome message
        console.log(`Le champ ${field.name} est vide`);
        isValid = false;
        errorElement.textContent = `Le champ ${field.name} est vide`;
      }
    });

    // --------------------------------------------------------------------------

    //query selector to initiate the "error-message" class
    const errorMessageSpans = document.querySelectorAll(".error-message");

    //apply red text color to all error message spans and hide if no error
    let hasError = false;
    errorMessageSpans.forEach((span) => {
      if (span.innerHTML.trim() !== "") {
        span.style.color = "red";
        hasError = true;
      } else {
        span.style.backgroundColor = "";
      }
    });
    // --------------------------------------------------------------------------

    //if all validation conditions are met then logic is applied
    if (isValid) {
      fields.forEach((field) => {
        const errorElement = document.getElementById("error-" + field.id);
        errorElement.textContent = ""; //no error message is displayed
      });
      console.log("All fields are filled, message sent");
      closeModal();
      setTimeout(() => {
        form.submit(); //form is submit after 5s
      }, 5000);
    }
  } catch (error) {
    //else error messages are displayed
    console.error(error.message);
  }
}

const form = document.querySelector("form"); //initialize form
form.addEventListener("submit", validate); //sumbit form if valide
