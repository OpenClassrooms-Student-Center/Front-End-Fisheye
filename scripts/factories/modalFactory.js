function contactForm(data) {
    const wrapper = document.createElement('div');
    wrapper.classList.add("contact_modal")
    wrapper.setAttribute('aria-hidden', 'true')
    wrapper.setAttribute('tabindex', '-1')
    const {name} = data

    function getContactFormDOM() {
        const form = `
          <div class="modal" role="document">
          <br>
          <header>
            <h2 class="modal_title" tabindex="0">Contactez-moi <br> ${name}
            </h2>
            <img src="assets/icons/close.svg" class="modal_close_btn" alt="Fermture du formulaire" onmouseover="" onclick="closeModal()"/>
          </header>
          <br>
          <br>
          <form class="form" method="post">
            <div class="formData" data-error="Veuillez saisir au moins deux caractères">
              <label for="form-firstname" tabindex="0">Prénom</label>
              <input type="text" name="firstname" id="form-firstname" pattern="^[A-Za-z-]+$" aria-labelledby="form-firstname" required minlength="2"/>
            </div>
            <div class="formData" data-error="Veuillez saisir au moins deux caractères">
              <label for="form-lastname" tabindex="0">Nom</label>
              <input type="text" name="lastname" id="form-lastname" pattern="^[A-Za-z-]+$" aria-labelledby="form-lastname" required minlength="2"/>
            </div>
            <div class="formData" data-error="Veuillez saisir une adresse mail valide">
              <label for="form-email" tabindex="0">Email</label>
              <input type="email" name="email" id="form-email" aria-labelledby="form-email" required/>
            </div>
            <div class="formData" data-error="Veuillez saisir au moins deux caractères">
              <label for="form-message" tabindex="0">Votre message</label>
              <input type="text" name="message" id="form-message" aria-labelledby="form-message" minlength="2" required/>
            </div>
            <br>
            <button class="contact_button" type="submit" aria-label="Envoyer le formulaire">Envoyer</button>
          </form>
        </div>
      `
      wrapper.innerHTML=form
      return wrapper;
    }

    return { getContactFormDOM }
}