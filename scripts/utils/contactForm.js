function displayModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "block";
    const html = document.querySelector("html");
    html.style.overflowY = "hidden";
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
    const html = document.querySelector("html");
    html.style.overflowY = "visible";
}

function envoi(){
    closeModal();
    console.log(contact);
    document.form.reset();
}

const contact={
    firstName : "",
    lastName : "",
    email : "",
    message : "",
  };
  //firstName
  form[0].addEventListener("input",function(e){
    contact.firstName=e.target.value;
  });
  
  //lastName
  form[1].addEventListener("input",function(e){
    contact.lastName=e.target.value;
    });
    
  //Email
  form[2].addEventListener("input",function(e){
    contact.email=e.target.value;
  });
  
  //Number of tournament
  form[3].addEventListener("input",function(e){
    contact.message=e.target.value;
  });
  

  window.addEventListener("keydown", function (event) {
    const modal = document.getElementById("contact_modal");
	  if(modal.style.display == "block"){
        if (event.key == "Escape"){
          closeModal();
        }  
      }
  });