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
                                      <button class="contact_button" onclick="displayModal()">Contactez-moi</button>  
                                      <img class="portrait" src="assets/photographers/portrait/${this.portrait}" alt="${this.name}">
                                      `;

        const modalTitleNameSpan = document.querySelector(".modal-title_name span");
        modalTitleNameSpan.append(this.name);
    }

}