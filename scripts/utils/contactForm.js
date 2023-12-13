export default class contactForm{

 displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
    modal.setAttribute('aria-hidden', 'false');
    const body=document.querySelector("body");
    body.setAttribute ('aria-hidden', 'true');
}

closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
    modal.setAttribute('aria-hidden', 'true');
    body.setAttribute ('aria-hidden', 'false');
}
validModal(){
   
    //preventing default submit
    const form=document.querySelector("form");
    form.addEventListener('submit',(e)=>{e.preventDefault();});
    //capting data
    const body=document.querySelector("body");
    const inputPrenom=document.getElementById("inputPrenom");
    const inputNom=document.getElementById("inputNom");
    const inputEmail=document.getElementById(`inputEmail`);
    const inputMessage=document.getElementById(`inputMessage`);

    console.log("Nom: "+inputNom.value+"\n"+"Prenom: "+inputPrenom.value+"\n"+"Email: "+inputEmail.value+"\n"+"Message: "+inputMessage.value);
    //hidding modal
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
    modal.setAttribute('aria-hidden', 'true');
    body.setAttribute ('aria-hidden', 'false');
}
}