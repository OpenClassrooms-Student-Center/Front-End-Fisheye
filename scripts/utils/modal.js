

// validation de la totalité des champs 
let contactMe = document.getElementById('modal_contact_me')
contactMe.addEventListener('submit', function(e) {
    e.preventDefault();
    
     if ((validUser(inputFirst, 'prénom'))  &&
      (validUser(inputLast, 'nom'))         && 
      (validEmail(email))                   && 
      (ValidText(text))){
  
     
          alert("Le formulaire est envoyé !");
          form.submit();
     
      }    
    
    
     });









// valider le nom et le prénom du modal 
const validUser = function(input , nom ){

    let small = input.nextElementSibling;
    if (!/[a-zA-Z]{3,15}/.test(input.value)){
    small.innerHTML = 'le ' + nom + ' doit contenir plus de 2 caractères'
    small.classList.remove('label-valide')
    small.classList.add('label-invalide')
    return false ;
  } else if 
      (/[0-9]/.test(input.value)) {
        small.innerHTML = 'le ' + nom + ' ne doit pas contenir de chiffre'
        small.classList.remove('label-valide')
        small.classList.add('label-invalide')
        return false;
    } else if 
    (/[a-zA-Z]{3,15}/.test(input.value)) {
       small.innerHTML = 'le ' + nom + ' est valide'  
      small.classList.remove('label-invalide')
      small.classList.add('label-valide')  
      return true;
      }
  }



 // validation de l'email
 const validEmail = function(inputEmail) {
    let emailRegExp = new RegExp(
      '^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,3}$',
      'g'
    );
  
      let small = inputEmail.nextElementSibling;
  
      if (emailRegExp.test(inputEmail.value)) {
        small.innerHTML = "adresse valide"
        small.classList.remove('label-invalide')
        small.classList.add('label-valide')
        return true;
      }  
        small.innerHTML = 'adresse non valide'
        small.classList.remove('label-valide')
        small.classList.add('label-invalide')
        return false;
      
  
  }
const ValidTExt = function (inputText){
    let small = inputEmail.nextElementSibling;
    if(inputText == '' ){
        console.log('non');

    } else{
        console.log('oui');
    }
}

const inputFirst = document.getElementById('first_name')
const inputLast = document.getElementById('last_name')
const email = document.getElementById('email_modal')
const text = document.getElementById('text_modal')

inputFirst.addEventListener('change', function (){
    validUser (inputFirst, 'prenom')
  });
  
inputLast.addEventListener('change', function(){
    validUser (inputLast, 'nom')
  });

email.addEventListener('change', function() {
    validEmail(this);
  });

