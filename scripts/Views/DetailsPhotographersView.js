class DetailsPhotographersView {
  constructor(photographer, medias) {
    this.photographer = photographer;
    this.medias = medias;
    this.initModalVerification();
  }

  initModalVerification() {
    this.formValidation = new FormValidation();
    const inputName = document.getElementById("first");
    inputName.addEventListener("focusout", (event) => {
      console.log(event.target.value);
      this.formValidation.testInputText(event.target);
    });
  }
  //function to create the html elements of photographer's banner
  async showDetailsPhotographer() {
    const photographersSection = document.querySelector(".photograph_header");
    console.log(this.photographer);
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
      console.log(event.target.value);

      switch (event.target.value) {
        case "pop":
          this.medias.sort((a, b) => b.likes - a.likes);
          break; //trier le tableau par les likes >

        case "date":
          this.medias.sort((a, b) => new Date(b.date) - new Date(a.date));
          break;
        // console.log(medias);

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

  //function to create and show the list medias of a photographer

  showListMediasPhotographer() {
    const mediasSection = document.querySelector(".photograph_medias");
    let lightbox = new Lightbox(this.medias, this.photographer.name);

    // boucle sur le tableau this.medias

    for (let index = 0; index < this.medias.length; index++) {
      console.log(index);
      const enregMedia = this.medias[index];
      const container = Factory.getMediasCards(
        enregMedia,
        this.photographer.name
      );

      //Premier on doit poser un écouteur d'event sur les likes pour les incréementer (sur le loveContainer entier)
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
      //Deux on doitpoiser un ecouteru sur l'image pour  lancer lightbox (Why not sur le titre aussi )
      container.childNodes[1].addEventListener("click", (event) => {
        //On doit lancer la lightbox
        lightbox.displayLightbox(enregMedia.id);
      });

      mediasSection.appendChild(container);

      // container.addEventListener("click", () => {
      //   lightbox.displayLightbox(enregMedia.id);
      // });
    }
    this.stickyBar(this.photographer, this.medias);
    this.selectDropdown();
  }
  //function to create and update a stick bar with total likes &
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
    // this.medias.map((element) => {
    //   totalLikes += element.likes;
    //   //console.log("totalLikes");
    // });
    const allLikes = document.querySelectorAll(".picturesText");
    allLikes.forEach((element) => (totalLikes += Number(element.textContent)));
    // for (element of allLikes) {
    //   console.log(element);
    // }
    console.log(totalLikes);
    return totalLikes;
  }
  //functions to open and close contact form modal

  showContactModal() {
    const contactBtn = document.getElementById("contactme");
    contactBtn.addEventListener("click", (event) => {
      this.displayModal(event);
    });
    contactBtn.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        displayModal(e);
      }
    });
  }

  displayModal() {
    const modal = document.getElementById("contact_modal");
    const main = document.getElementById("main");

    console.log("open");
    modal.style.display = "block";
    main.style.display = "none";
  }

  hideContactModal() {
    const closeCross = document.getElementById("close-button");
    closeCross.addEventListener("click", (event) => {
      this.closeModal(event);
    });
    /*closeCross.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeModal(e);
      }
    });*/
  }

  closeModal() {
    const modal = document.getElementById("contact_modal");
    const main = document.getElementById("main");

    console.log("close");
    modal.style.display = "none";
    main.style.display = "block";
  }

  //function to check each form entries

  // function called at form submit event

  checkform(event) {
    event.preventDefault();

    /*let isError = false;

    if (!testInputText(inputName)) {
      isError = true;
    }
    if (!testInputText(inputLastName)) {
      isError = true;
    }
    if (!testInputEmail(inputEmail)) {
      isError = true;
    }
    if (!testInputMessageText(inputMessage)) {
      isError = true;
    }
    if (isError == true) {
      console.log("no");
    } else if (isError == false) {
      console.log(inputName);
      console.log(
        "ok",
        "Prenom: " + inputName.value,
        "Nom: " + inputLastName,
        "Mail: " + inputEmail,
        "Message: " + inputMessage
      );
    }*/
  }
}
