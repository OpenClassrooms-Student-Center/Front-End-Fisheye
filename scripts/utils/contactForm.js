class FormValidator {
  //function to show the error message on the event's target

  showErrorMessage(target, errorMessage) {
    let divError = target.querySelector(".errorMessage");

    if (!divError) {
      divError = document.createElement("div");
      divError.classList.add("errorMessage", "errorVisible");
      divError.innerHTML = errorMessage;
      target.appendChild(divError);
    }
  }
  //function to hide the error message

  hideErrorMessage(target) {
    let divError = target.querySelector(".errorMessage");
    if (divError) {
      divError.remove();
    }
  }
  //function to show the red border's input when an error occured

  showInputError(target) {
    target.classList.add("borderError");
  }

  //function to hide the red border's input when it's ok

  hideInputError(target) {
    target.classList.remove("borderError");
  }

  // function to test if the name and the lastname are less than 2 characters

  testInputText(input) {
    let value = input.value;
    let parent = input.parentNode;
    if (value.length < 2) {
      this.showErrorMessage(
        parent,
        "Veuillez entrer 2 caractères ou plus pour ce champ."
      );
      this.showInputError(input);
      return false;
    } else {
      this.hideErrorMessage(parent);
      this.hideInputError(input);
      return true;
    }
  }
  testInputEmail(input) {
    let re =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    let value = input.value;
    let parent = input.parentNode;

    if (re.test(value) == false) {
      this.showErrorMessage(parent, "Veuillez entrer un email valide");
      this.showInputError(input);
      return false;
    } else {
      this.hideErrorMessage(parent);
      this.hideInputError(input);
      return true;
    }
  }

  testInputMessageText(input) {
    let value = input.value;
    let parent = input.parentNode;
    if (value.length < 3) {
      this.showErrorMessage(
        parent,
        "Veuillez entrer 3 caractères ou plus pour ce champ."
      );
      this.showInputError(input);
      return false;
    } else {
      this.hideErrorMessage(parent);
      this.hideInputError(input);
      return true;
    }
  }
  // function called at form submit event

  checkForm(form) {
    const inputs = form.querySelectorAll("input");

    if (
      this.testInputText(inputs[0]) &&
      this.testInputText(inputs[1]) &&
      this.testInputEmail(inputs[2]) &&
      this.testInputMessageText(inputs[3])
    ) {
      console.log(
        "Prenom: " + inputs[0].value,
        "Nom: " + inputs[1].value,
        "Mail: " + inputs[2].value,
        "Message: " + inputs[3].value
      );
    } else {
      console.log("attention il y a des erreurs");
    }
  }
}
