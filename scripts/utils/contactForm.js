const modal = document.getElementById("contact_modal");
const submit = document.querySelector('#submit');
const form = document.querySelector('form');
const inputPrenom = document.querySelector('#prenom');
const inputNom = document.querySelector('#nom');
const inputMessage = document.querySelector('#message');

function displayModal() {
	modal.style.display = "block";
}

function closeModal() {
    modal.style.display = "none";
}

submit.addEventListener('click', (e) => {
    document.getElementById("demo").innerHTML = '';

    if (!inputMessage.checkValidity()) {
        document.getElementById("demo").innerHTML = inputMessage.validationMessage + ' (message)';
        e.preventDefault();
    }

    if (!inputNom.checkValidity()) {
        document.getElementById("demo").innerHTML = inputNom.validationMessage + ' (nom)';
        e.preventDefault();
    }

    if (!inputPrenom.checkValidity()) {
        document.getElementById("demo").innerHTML = inputPrenom.validationMessage + ' (prénom)';
        e.preventDefault();
    }

    const formData = new FormData(form);
    const prenom = formData.get('prenom');
    const nom = formData.get('nom');
    const email = formData.get('email');
    const message = formData.get('message');

    console.log(prenom, nom, email, message);

    e.preventDefault();
});

// Regarder la maquette
// Utiliser Check validity pour le formulaire
// Utiliser new FormData (js)
// Ne pas oublier : aria label & required
// voir "aria-describedby" si utile dans un form: label/input