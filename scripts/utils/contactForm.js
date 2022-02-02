class FormValidation {
  testEntriesForm() {
    // form entries & validations

    const inputName = document.getElementById("first");
    const inputLastName = document.getElementById("last");
    const inputEmail = document.getElementById("email");
    let re =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const inputMessage = document.getElementById("message");
    //const signInForm = document.getElementById("signinform");

    //LISTENERS

    inputName.addEventListener("focusout", (event) => {
      testInputText(event.target);
    });

    inputLastName.addEventListener("focusout", (event) => {
      testInputText(event.target);
    });
    inputEmail.addEventListener("focusout", (event) => {
      testInputEmail(event.target);
    });
    inputMessage.addEventListener("focusout", (event) => {
      testInputMessageText(event.target);
    });
  }
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
    let value = input.value;
    let parent = input.parentNode;

    if (re.test(value) == false) {
      showErrorMessage(parent, "Veuillez entrer un email valide");
      showInputError(input);
      return false;
    } else {
      hideErrorMessage(parent);
      hideInputError(input);
      return true;
    }
  }

  testInputMessageText(input) {
    let value = input.value;
    let parent = input.parentNode;
    if (value.length < 3) {
      showErrorMessage(
        parent,
        "Veuillez entrer 3 caractères ou plus pour ce champ."
      );
      showInputError(input);
      return false;
    } else {
      hideErrorMessage(parent);
      hideInputError(input);
      return true;
    }
  }
}
/*const modal = document.getElementById("contact_modal");
const main = document.getElementById("main");*/
//let contactBtn = document.getElementById("contactme");
//let btn = contactBtn.item(0);
/*console.log(contactBtn); //null  car ne s'execute pas après la création du btn mais avant!
const closeCross = document.getElementById("close-button");*/

//open contact modal event

/*function displayModal() {
  console.log("open");
  modal.style.display = "block";
  main.style.display = "none";
}*/

/*btn.addEventListener("click", (event) => {
  displayModal(event);
  main.style.display = "none";
});

contactBtn.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    displayModal(e);
  }
});*/

// close event

/*function closeModal() {
  console.log("close");
  modal.style.display = "none";
}

closeCross.addEventListener("click", (event) => {
  closeModal(event);
  main.style.display = "block";
});

closeCross.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeModal(e);
  }
});*/

// form entries & validations

/*const inputName = document.getElementById("first");
const inputLastName = document.getElementById("last");
const inputEmail = document.getElementById("email");
const regexBirth = new RegExp("([0-9]{4})-([0-9]{2})-([0-9]{2})");
let re =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const inputMessage = document.getElementById("message");
const signInForm = document.getElementById("signinform");

//LISTENERS

inputName.addEventListener("focusout", (event) => {
  testInputText(event.target);
});

inputLastName.addEventListener("focusout", (event) => {
  testInputText(event.target);
});
inputEmail.addEventListener("focusout", (event) => {
  testInputEmail(event.target);
});
inputMessage.addEventListener("focusout", (event) => {
  testInputMessageText(event.target);
});
//signInForm.addEventListener("submit", checkform);*/

// function called at form submit event

/*function checkform(event) {
  event.preventDefault();
  let isError = false;

  if (!testInputText(inputName)) {
    isError = true;
  }
  if (!testInputText(inputLastName)) {
    isError = true;
  }
  if (!testInputEmail(inputEmail)) {
    isError = true;
  }
  if (!testInputMessageText(inputMessage)) {
    isError = true;
  }
  if (isError == true) {
    console.log("no");
  } else if (isError == false) {
    console.log(inputName);
    console.log(
      "ok",
      "Prenom: " + inputName.value,
      "Nom: " + inputLastName,
      "Mail: " + inputEmail,
      "Message: " + inputMessage
    );
  }
}*/
const form = document.getElementById("form");
form.addEventListener("submit", checkform);
