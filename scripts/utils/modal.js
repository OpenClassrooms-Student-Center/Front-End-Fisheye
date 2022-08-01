

// validation de la totalité des champs 
let contactMe = document.getElementById('modal_contact_me')
contactMe.addEventListener('submit', function(e) {
    e.preventDefault();
    
     if ((validUser(inputFirst, 'prénom'))  &&
      (validUser(inputLast, 'nom'))         && 
      (validEmail(email))                   && 
      (ValidText(text))){
  
     
          alert("Le formulaire est envoyé !");
          let a = []
          a.push('Prénom : '+ inputFirst.value)
          a.push('Nom : '+ inputLast.value)
          a.push('Email : '+ email.value)
          a.push('Message : '+ text.value)
          console.log(a);
          /* contactMe.submit(); */
     
      }    
    
    
     });









// valider le nom et le prénom du modal 
const validUser = function(input , nom ){

    let small = input.nextElementSibling;
    if (!/[a-zA-Z]{3,15}/.test(input.value)){
    small.innerHTML = 'Le ' + nom + ' doit contenir plus de 2 caractères'
    return false ;
  } else if 
      (/[0-9]/.test(input.value)) {
        small.innerHTML = 'Le ' + nom + ' ne doit pas contenir de chiffre'
        return false;
    } else if 
    (/[a-zA-Z]{3,15}/.test(input.value)) {
       small.innerHTML = 'Le ' + nom + ' est valide'  

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
        small.innerHTML = "Adresse valide"
        return true;
      }  
        small.innerHTML = 'Adresse non valide'
        return false;
      
  
  }
const ValidText = function (inputText){
    let small = inputText.nextElementSibling;
    let a = ''
    if((inputText.value) === ''){
        small.innerHTML = 'Veuillez saisire le champ ci-dessus '
      return false
    } else{
      small.innerHTML = 'Champ valide '
        return true
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
text.addEventListener('change', function() {
    ValidText(this);
  });

