export default class Photographer {
    constructor(data) {
        this.name = data.name;
        this.id = data.id;
        this.city = data.city;
        this.country = data.country;
        this.tagline = data.tagline;
        this.price = data.price;
        this.portrait = data.portrait;
    }

    createPhotograperCard() {
        const photographersSection = document.querySelector(".photographer_section");       
        const article = document.createElement( 'article' );
        const card =`
                    <a href="photographer.html?id=${this.id}" title="${this.name}">
                        <img class="portrait" src="assets/photographers/portrait/${this.portrait}" alt="${this.name}">
                        <h2 class="name">${this.name}</h2>
                    </a>
                    <p class="location">${this.city}, ${this.country}</p>
                    <p class="tagline">${this.tagline}</p>
                    <p class="price">${this.price}€/jour</p>
                    `;

        article.innerHTML = card;
        photographersSection.append(article);
    }

    render() {       
        const photographerHeader = document.querySelector(".photograph-header");

        photographerHeader.innerHTML = ` 
                                      <div class="photograph-text">
                                        <h1 class="name">${this.name}</h1>
                                        <p class="location">${this.city}, ${this.country}</p>
                                        <p class="tagline">${this.tagline}</p>
                                      </div>
                                      <button class="contact_button">Contactez-moi</button>  
                                      <img class="portrait" src="assets/photographers/portrait/${this.portrait}" alt="${this.name}">
                                      `;

        this.setupContactModal();
    }

    setupContactModal() {
        const body = document.querySelector('body');
        const modal = document.getElementById("contact_modal");
        const contactButton = document.querySelector(".contact_button");
        const closeForm = document.querySelector(".close-modal");

        function trapFocus(element) {
            const focusableElements = element.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
            const firstFocusableElement = focusableElements[0];
            const lastFocusableElement = focusableElements[focusableElements.length - 1];
        
            element.addEventListener('keydown', function(e) {
                const isTabPressed = e.key === 'Tab' || e.keyCode === 9;
        
                if (!isTabPressed) {
                    return;
                }
        
                if (e.shiftKey) /* shift + tab */ {
                    if (document.activeElement === firstFocusableElement) {
                        lastFocusableElement.focus();
                        e.preventDefault();
                    }
                } else /* tab */ {
                    if (document.activeElement === lastFocusableElement) {
                        firstFocusableElement.focus();
                        e.preventDefault();
                    }
                }
            });
        }
        function openModal () {
            body.setAttribute('aria-hidden', 'true');
            modal.setAttribute('aria-hidden', 'false');
            modal.style.display = "block";
            closeForm.focus();
            trapFocus(modal); // Appliquer la capture du focus
        };

        function closeModal () {
            body.setAttribute('aria-hidden', 'false');
            modal.setAttribute('aria-hidden', 'true');
            modal.style.display = "none";
        };

        function handleEscapeKey(e) {
            const key = e.key;

            if (modal.getAttribute('aria-hidden') === 'false' && key === 'Escape') {
                closeModal();
            }
        };

        contactButton.addEventListener("click", openModal);
        closeForm.addEventListener("click", closeModal);
        document.addEventListener('keydown', handleEscapeKey);
    }
}