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

        const modalTitleName = document.querySelector(".modal-title_name");
        modalTitleName.append(this.name);
    }

}