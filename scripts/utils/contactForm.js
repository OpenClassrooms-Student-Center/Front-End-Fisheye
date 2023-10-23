function contactSend() {
    // Afficher les résultats du formulaire Contact
    const prenom = document.querySelector("#contact-prenom");
    const nom = document.querySelector("#contact-nom");
    const mail = document.querySelector("#contact-email");
    const msg = document.querySelector("#contact-text");
    console.log(prenom.value);
    console.log(nom.value);
    console.log(mail.value);
    console.log(msg.value);
}
