export default function modalTemplate(data){
        return `<div class="modal" role="dialog">
                    <header>
                        <h2>Contactez-moi <br>
                        ${data.name}</h2>
                        <img src="assets/icons/close.svg"/>
                    </header>
                    <form>
                        <div>
                            <label for="name">Prénom</label>
                            <input type="text" id="name name="name" class="text" required minlength="2"/>
                        </div>
                        <div>
                            <label for="lastName">Nom</label>
                            <input type="text" id="lastName" name="lastName" class="text" required minlength="2"/>
                        </div>
                        <div>
                            <label for="email">Email</label>
                            <input type="email" id="email" name="email" class="text" required/>
                        </div>
                        <div>
                            <label for="message">Votre message</label>
                            <textarea type="text" id="message" name="message" class="text" rows="5"></textarea>
                        </div>
                        <button class="contact_button">Envoyer</button>
                    </form>
                <div>`
}