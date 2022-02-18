class DetailsPhotographersView {
  constructor(photographer, medias) {
    this.photographer = photographer;
    this.medias = medias;
    this.initModalVerification();
    this.selectDropdown();
  }

  // function to show validate form

  initModalVerification() {
    this.formValidation = new FormValidator();
    const inputName = document.getElementById("first");
    const inputLastName = document.getElementById("last");
    const inputEmail = document.getElementById("email");
    const inputMessage = document.getElementById("message");
    const form = document.getElementById("form");

    //listeners
    inputName.addEventListener("focusout", (event) => {
      this.formValidation.testInputText(event.target);
    });
    inputLastName.addEventListener("focusout", (event) => {
      this.formValidation.testInputText(event.target);
    });
    inputEmail.addEventListener("focusout", (event) => {
      this.formValidation.testInputEmail(event.target);
    });
    inputMessage.addEventListener("focusout", (event) => {
      this.formValidation.testInputMessageText(event.target);
    });
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      this.formValidation.checkForm(event.target);
      this.closeModal();
    });
  }

  //function to show html elements of photographer's banner

  async showDetailsPhotographer() {
    const photographersSection = document.querySelector(".photograph_header");
    const picture = `assets/photographers/${this.photographer.portrait}`;

    let html = `
    
<div class="photograph-header">
  <div class="photograph-name">
    <h1>${this.photographer.name}</h1>
  </div>
  <div class="photograph-txt">
    <h2>${this.photographer.city}, ${this.photographer.country}</h2>
    <p>${this.photographer.tagline}</p>
  </div>
</div>

<button 
  id="contactme"
  type="button"
  class="contact_button" 
  aria-haspopup="dialog" 
  aria-controls="dialog">
  Contactez-moi
</button>

<div class="photograph-img">
  <img src="${picture}" class="cardpicture"></img>
</div>  
    `;

    photographersSection.innerHTML = html;
  }

  //function to create the select menu

  selectDropdown() {
    const dropdownMenu = document.querySelector(".dropdown");
    dropdownMenu.innerHTML = "";

    let sortBy = document.createElement("label");
    sortBy.setAttribute("class", "sort-by");
    sortBy.textContent = "Trier par";
    dropdownMenu.appendChild(sortBy);

    let select = document.createElement("select");
    select.setAttribute("class", "sort-byButton");

    let optionPop = document.createElement("option");
    optionPop.text = "Popularité";
    optionPop.value = "pop";

    let optionDate = document.createElement("option");
    optionDate.text = "Date";
    optionDate.value = "date";

    let optionTitle = document.createElement("option");
    optionTitle.text = "Titre";
    optionTitle.value = "title";

    select.add(optionPop);
    select.add(optionDate);
    select.add(optionTitle);

    select.addEventListener("change", (event) => {
      switch (event.target.value) {
        case "pop":
          this.medias.sort((a, b) => b.likes - a.likes);
          break; //trier le tableau par les likes >

        case "date":
          this.medias.sort((a, b) => new Date(b.date) - new Date(a.date));
          break;

        case "title":
          function compare(a, b) {
            if (a.title < b.title) {
              return -1;
            }

            if (a.title > b.title) {
              return 1;
            }
            return 0;
          }

          this.medias.sort(compare);

          break;
      }

      let galeryContainer = document.querySelector(".photograph_medias");

      if (galeryContainer) {
        galeryContainer.innerHTML = "";
      }

      this.showListMediasPhotographer();
    });

    dropdownMenu.appendChild(select);
  }

  //function to show the list medias of a photographer

  showListMediasPhotographer() {
    const mediasSection = document.querySelector(".photograph_medias");
    let lightbox = new Lightbox(this.medias, this.photographer.name);

    for (let index = 0; index < this.medias.length; index++) {
      const enregMedia = this.medias[index];
      const container = Factory.getMediasCards(
        enregMedia,
        this.photographer.name
      );

      //Listener d'event sur les likes pour les incrémenter (sur le loveContainer entier likes + <3)
      container.childNodes[0].childNodes[1].addEventListener(
        "click",
        (event) => {
          let likes = parseInt(
            event.target.closest(".likesHeart").querySelector(".picturesText")
              .textContent
          );
          likes += 1;
          event.target
            .closest(".likesHeart")
            .querySelector(".picturesText").textContent = likes;
          this.stickyBar();
        }
      );

      //accessiblity
      container.childNodes[0].childNodes[1].addEventListener(
        "keydown",
        (event) => {
          if (event.key === "Enter") {
            let likes = parseInt(
              event.target.closest(".likesHeart").querySelector(".picturesText")
                .textContent
            );
            likes += 1;
            event.target
              .closest(".likesHeart")
              .querySelector(".picturesText").textContent = likes;
            this.stickyBar();
          }
        }
      );
      //listener sur l'image pour  lancer lightbox
      container.childNodes[1].addEventListener("click", (event) => {
        lightbox.displayLightbox(enregMedia.id);
      });
      container.childNodes[1].addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          lightbox.displayLightbox(enregMedia.id);
        }
      });

      mediasSection.appendChild(container);
    }
    this.stickyBar(this.photographer, this.medias);
  }

  //function to create and update a stick bar with total likes & hearts

  stickyBar() {
    let stickBar = document.createElement("aside");
    stickBar.setAttribute("class", "stickyBar");
    document.body.appendChild(stickBar);

    let totalLikes = this.calculateTotalLikes();
    let stickyBarTextOne = document.createElement("p");
    stickyBarTextOne.innerHTML = `${totalLikes} <i class="fas fa-heart"></i>`;
    let stickyBarTextTwo = document.createElement("p");
    stickyBarTextTwo.textContent = `${this.photographer.price}€/jour`;

    stickBar.append(stickyBarTextOne, stickyBarTextTwo);
  }

  //function to calculate the total likes of a prohotgrapher
  calculateTotalLikes() {
    let totalLikes = 0;
    const allLikes = document.querySelectorAll(".picturesText");
    allLikes.forEach((element) => (totalLikes += Number(element.textContent)));
    return totalLikes;
  }
  //functions to open and close contact form modal

  showContactModal() {
    const contactBtn = document.getElementById("contactme");
    contactBtn.addEventListener("click", (event) => {
      this.displayModal(event);
    });
  }

  displayModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "block";
  }

  hideContactModal() {
    const closeCross = document.getElementById("close-button");
    closeCross.addEventListener("click", (event) => {
      this.closeModal(event);
    });
    //accessibility if Escape btn pressed = close form
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.closeModal(e);
      }
    });
  }

  closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
  }
}
