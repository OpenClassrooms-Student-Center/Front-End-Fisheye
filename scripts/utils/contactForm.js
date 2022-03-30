const modal = document.getElementById("contact_modal");
const main=document.getElementById("main");
var firstName=document.getElementById('firstName'); 
var familyName=document.getElementById('familyName');
var email=document.getElementById('email');

function displayModal() {
	modal.style.display = "block";
    main.setAttribute('aria-hidden','true');
    modal.setAttribute('aria-hidden','false');
    adaCompliant(modal);//navigation au clavier
    const submitBtn=document.getElementById("send");
    // au clic sur "envoyer" on n'envoie que sil n'y a pas d'erreur dans les champs (all errors=0)
    submitBtn.addEventListener("click",(e)=>{
        var errorFirstName=firstNameError(firstName.value);
        var errorFamilyName=familyNameError(familyName.value);
        var errorEmail=emailError(email.value);
        if (errorFirstName+errorFamilyName+errorEmail==0){
            e.preventDefault();
            console.log(document.getElementById('firstName').value);
            console.log(document.getElementById('familyName').value);
            console.log(document.getElementById('email').value);
            console.log(document.getElementById('message').value);
            closeModal();
        }else{
            e.preventDefault();
            return
        }
    });
    //"envoyer" clicable au clavier
    submitBtn.addEventListener("keyup", (e)=>{
        if (e.keyCode === 13) {
            e.preventDefault();
            submitBtn.click();
        }
    });
}



function closeModal() {
    modal.style.display = "none";
    modal.setAttribute('aria-hidden','true');
    main.setAttribute('aria-hidden','false');
}


//TESTS DU QUESTIONNAIRE
//Test prénom
var errorFirstName=1;  //les variables erreursChamp sont à 1 s'il y a une erreur dans ce champ, 0 sinon

const logFirstName = document.getElementById('logFirstName'); //champ de message d'erreur à destination de l'utilisateur
firstName.addEventListener('change',(e)=> firstNameError(e.target.value));

function firstNameError(firstNameInput) {
    firstName.style.borderWidth="5px";
    if (firstNameInput.length>1){
        firstName.style.borderColor="green";
        logFirstName.style.display="none";
        errorFirstName=0;
    }else{
        firstName.style.borderColor="red";
        errorFirstName=1;
        logFirstName.style.display="block";
        logFirstName.innerHTML="<span style='font-size:14px;color:red'> Veuillez entrer 2 caractères ou plus pour le champ du prénom.</span>";
    }
    return errorFirstName
};
//Test nom
var errorFamilyName=1; //les variables erreursChamp sont à 1 s'il y a une erreur dans ce champ, 0 sinon
const logFamilyName = document.getElementById('logFamilyName'); //champ de message d'erreur à destination de l'utilisateur
familyName.addEventListener('change', (e)=>{
    const nameInput=e.target.value;
    familyNameError(nameInput)
    }
);

function familyNameError(nameInput) {
    familyName.style.borderWidth="5px";
    if (nameInput.length>1){
        familyName.style.borderColor="green";
        logFamilyName.style.display="none";
        errorFamilyName=0;
    }else{
        familyName.style.borderColor="red";
        errorFamilyName=1;
        logFamilyName.style.display="block";
        logFamilyName.innerHTML="<span style='font-size:14px;color:red'> Veuillez entrer 2 caractères ou plus pour le champ du prénom.</span>";
    }
    return errorFamilyName
};


//Test mail
var errorEmail=1; //les variables erreursChamp sont à 1 s'il y a une erreur dans ce champ, 0 sinon
const logEmail = document.getElementById('logEmail'); //champ de message d'erreur à destination de l'utilisateur
email.addEventListener('change', (e)=>{
    const emailInput=e.target.value;
    emailError(emailInput);
});


function emailError(emailInput) {
  email.style.borderWidth="5px";
  var expressionReguliereEmail	= /^[0-9a-z._-]+@{1}[0-9a-z.-]{2,}[.]{1}[a-z]{2,5}$/; //format d'une adresse mail
  if (expressionReguliereEmail.exec(emailInput)!=null){
    email.style.borderColor="green";
    logEmail.style.display="none";
    errorEmail=0; //on valide le test dès que le champs respecte le format d'une adresse mail
  }else{
    email.style.borderColor="red";
    errorEmail=1;
    logEmail.style.display="block";
    logEmail.innerHTML="<span style='font-size:14px;color:red'> Veuillez entrer une adresse email valide.</span>";
  }
  return errorEmail
};
