function displayModal() {
    // Open modal
    const contactModal = document.getElementById("contact_modal");
	contactModal.style.display = "block";

    // Add atribut on modal
    const main = document.querySelector("main");
    const modal = document.querySelector(".modal");
    main.setAttribute("aria-hidden", true);
    modal.setAttribute("aria-hidden", false);
    
    // Focus on first input
    const firstName = document.querySelector("#firstName");
    firstName.focus();

    // Close modal when press echap
    window.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
          closeModal();
        }
      })
}

function closeModal() {
    // Close modal
    const contactModal = document.getElementById("contact_modal");
    contactModal.style.display = "none";

    // Add atribut on modal
    const main = document.querySelector("main");
    const modal = document.querySelector(".modal");
    main.setAttribute("aria-hidden", false);
    modal.setAttribute("aria-hidden", true);
}

let modal = name => {
    // Add atribut on modal
    const modal = document.querySelector(".modal");
    modal.setAttribute("aria-hidden", true);
    modal.setAttribute("aria-describedby", "Modal de contact");
    modal.setAttribute("role", "dialog");

    // Add the photopgrapher name
    const modalName = document.querySelector("#photograph-name");
    modalName.textContent = name;

    
    const form = document.getElementById("form");
    const formData = [...document.querySelectorAll("div.formData > input, textarea")];

    // On submit form
    let submitForm = (e) => {
        e.preventDefault();
        
        let data = [];
        const getValue = name => e.target[name].value;
        formData.map((input) => {
            const value = getValue(input.name)
            if (value.length > 3) {
                data.push({
                    name: input.name,
                    value
                })
            }
        })
        
        if (data.length === formData.length) {
            console.log(data);
            setTimeout(() => {
                resetForm();
                closeModal();
            }, 2000)
        }
    }

    let resetForm = () => {
        formData.map((input) => {
            input.value = '';
        })
    }
    form.addEventListener('submit', submitForm);
}


