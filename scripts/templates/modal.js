export default function modalTemplate(data) {
  return `<div class="modal" role="dialog" aria-label="Contactez moi ${data.name}" aria-labelledby="headingModal">
                    <header>
                        <h1 id="headingModal">Contactez-moi <br>
                        ${data.name}</h1>
                        <img src="assets/icons/close.svg" role="Buttons" aria-label="ferme le formulaire de contact"/>
                    </header>
                    <form>
                        <div>
                            <label for="name">Prénom</label>
                            <input type="text" id="name name="name" class="text" role="text field" aria-label="entrer votre prénon" required minlength="2"/>
                        </div>
                        <div>
                            <label for="lastName">Nom</label>
                            <input type="text" id="lastName" name="lastName" class="text" role="text field" aria-label="entrer votre nom de famille" required minlength="2"/>
                        </div>
                        <div>
                            <label for="email">Email</label>
                            <input type="email" id="email" name="email" class="text" role="text field" aria-label="entrer votre adresse email" required/>
                        </div>
                        <div>
                            <label for="message">Votre message</label>
                            <textarea type="text" id="message" name="message" class="text" rows="5" role="text field" aria-label="entrer votre message pour ${data.name}"></textarea>
                        </div>
                        <button class="contact_button role="Buttons" aria-label="Envoyer le formulaire de contact à ${data.name}">Envoyer</button>
                    </form>
                <div>`;
}
