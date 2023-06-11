// fetching information from json file and transforming json objects into JSobjects using json()
async function photographerPage() {
  const photographerResponse = await fetch("./data/photographers.json");
  const photographerResults = await photographerResponse.json();
  return photographerResults;
}

// displaying the information in photographer page
async function displayPhotographer(photographers) {
  // creating elements in the main section for each photographer
  const photographerHeaderZone = document.querySelector(".photograph-header");
  // getting the search params
  let params = new URL(document.location).searchParams;
  // getting the id from the search params
  let id = params.get("id");
  // getting the corosponding object (photographer) related to the id from the search params
  let photographer = photographers.find(myId => myId.id == id);

  // displaying the photographer information
  const photographerSection = photographerFactory(photographer);
  const infoPhotographer = photographerSection.getUserCardDOM();
  photographerHeaderZone.appendChild(infoPhotographer);

  // creating a contact us  button
  const btnNewPosition = document.querySelector(".mainArticle");
  const ContactUsbtn = document.createElement("button");
  ContactUsbtn.setAttribute("tabindex", "0 ");
  ContactUsbtn.setAttribute("role", "button");
  ContactUsbtn.setAttribute("class", "contact_button");
  ContactUsbtn.setAttribute("id", "open-modal-btn");
  ContactUsbtn.setAttribute("aria-label", "contact me");
  ContactUsbtn.textContent = "Contactez-moi";
  btnNewPosition.appendChild(ContactUsbtn);

  // accessibility items for the modal
  const dialog = document.getElementById("contact_modal");
  // dialog.setAttribute

  // display modal onclick
  ContactUsbtn.addEventListener("click", function() {
    displayModal();
    const photographerName = (document.getElementById(
      "photographer-name"
    ).innerText =
      photographer.name);
  });
  // close modal onclick
  const closingModal = document.getElementById("closeX");
  closingModal.addEventListener("click", closeModal);

  // adjusting the elements as required in the maquette
  const flexOrdering = document.querySelector(".frame");
  flexOrdering.style.order = 1;
  flexOrdering.setAttribute("tabIndex", "0");
}

async function initPhotographerPage() {
  // get the photographer data in the photographer page
  const { photographers } = await photographerPage();
  displayPhotographer(photographers);
}
// calling the function to create the elements in photographer page
initPhotographerPage();

async function displayMedia(photographerMedia) {
  const mediaDiv = document.querySelector(".media-div");

  mediaDiv.innerHTML = "";
  photographerMedia.forEach(media => {
    const mediaSection = mediaFactory(media);
    const mediaArts = mediaSection.getUserArtDOM(media);
    mediaDiv.appendChild(mediaArts);
  });
  // displayImgSlides(photographerMedia);
}

// function displayImgSlides(array) {
//   const modalDiv = document.querySelector(".modal-img");
//   // const slideBtn = document.createElement("button");
//   // const modalDiv = document.createElement("div");
//   const modalCloseIcon = document.createElement("span");
//   const modalContent = document.createElement("div");
//   const slides = document.createElement("div");
//   const text = document.createElement("p");
//   const nextBtn = document.createElement("a");
//   const prevBtn = document.createElement("a");

//   // slideBtn.setAttribute("id", "modal-btn");
//   // modalDiv.setAttribute("id", "modal-img");
//   modalCloseIcon.classList.add("modal-content");
//   modalContent.classList.add("mySlides");
//   nextBtn.classList.add("next");
//   prevBtn.classList.add("prev");

//   // const modalDiv = document.getElementById("modal-img");
//   // modalDiv.appendChild(modalDiv);
//   modalDiv.appendChild(modalCloseIcon);
//   modalDiv.appendChild(nextBtn);
//   modalDiv.appendChild(prevBtn);
//   modalContent.appendChild(slides);
//   for (const iterator of object) {
//     const slides = document.createElement("div");
//     const img = document.createElement("img");
//     const { image } = iterator;
//     const src = `assets/media/gallery/${image}`;
//     img.setAttribute("src", src);
//     slides.appendChild(text);
//     slides.appendChild(img);
//   }
// }

async function photographersMedia() {
  const { media } = await photographerPage();
  // creating the artwork for each photographer
  let params = new URL(document.location).searchParams;
  // getting the id from the search params
  let id = params.get("id");
  console.log(id);
  // getting the corosponding object (photographer) related to the id from the search params
  let photographerMedia = media.filter(m => m.photographerId == id);
  // maping and adding the sum of likes for each photographer
  const photographerLikes = photographerMedia.map(k => k.likes);
  let likesCounter = 0;
  for (i = 0; i < photographerLikes.length; i++) {
    totalCount += photographerLikes[i] + addingALike;
  }

  // creating a general span for the photographer
  const likesCounterSpan = document.getElementById("generalCounter");
  const totalLikes = document.createElement("p");
  totalLikes.setAttribute("id", "totalLikes");
  totalLikes.innerHTML = totalCount;
  const likeCounterSpanIcon = document.createElement("i");
  likeCounterSpanIcon.classList.add("fa-heart", "fas");
  likeCounterSpanIcon.style.color = "black";
  const likesDiv = document.createElement("div");
  likesDiv.classList.add("likesDiv");
  const dayPrice = document.getElementById("price");
  // append children to the span
  likesDiv.appendChild(totalLikes);
  likesDiv.appendChild(likeCounterSpanIcon);
  likesCounterSpan.appendChild(likesDiv);
  likesCounterSpan.appendChild(dayPrice);

  displayMedia(photographerMedia);

  // create dropown menu
  // get all drop downs 
  const dropdowns = document.querySelectorAll(".dropdown");

  // loop though all dropdown elements 
  dropdowns.forEach(dropdown => {
    // get inner elements from each dropdown
    const select = dropdown.querySelector(".select");
    const caret = dropdown.querySelector(".caret");
    const menu = dropdown.querySelector(".menu");
    const options = dropdown.querySelectorAll(".menu li");
    const selected = dropdown.querySelector(".selected");
  
    // a click event to select element
    select.addEventListener("click", () => {
      // add the clicked selected style to the element
      select.classList.toggle("select-clicked");
      // add the rotate caret to the element
      caret.classList.toggle("caret-rotate");
      // add the open styles to the menu elements
      menu.classList.toggle("menu-open");
      });
      // remove active class from all option elements
      options.forEach(option => {
      // add a click event to the option element
      option.addEventListener("click", () => {
      // change select inner text to clicked element
      selected.innerText = option.innerText;
      // add the clicked select style to the select element
      select.classList.remove("select-clicked");
      // add the rotate styles to the caret element
      caret.classList.remove("caret-rotate");
      // add the open styles to the menu element
      menu.classList.remove("menu-open");
      // remove active class from all option elements
      options.forEach(option => {
        option.classList.remove("active");
      });
      // add active class to clicked option element
      option.classList.add("active");
      });
    });
  });

  // addEventListener of selector
  const selector = document.querySelector(".dropdown");
  let selected = document.querySelector(".selected");
  console.log("selected", selected.innerText);
  const popElement = document.getElementById("popularity");
  const dateElement = document.getElementById("date");
  const titleElement = document.getElementById("title");
  const hr0 = document.getElementById("hr0");
  const hr1 = document.getElementById("hr1");
  const hr2 = document.getElementById("hr2");
  const hr3 = document.getElementById("hr3");


  selector.addEventListener("click", function() {
    if (selected.innerText == "Popularité") {
      popElement.classList.add("sr-only");
      dateElement.classList.remove("sr-only");
      titleElement.classList.remove("sr-only");
      hr1.style.display = "none";
      // hr2.style.display = "block";
      hr3.style.display = "none";
      photographerMedia.sort(
        (a, b) => parseFloat(b.likes) - parseFloat(a.likes)
      );
    } else if (selected.innerText == "Date") {
      popElement.classList.remove("sr-only");
      dateElement.classList.add("sr-only");
      titleElement.classList.remove("sr-only");
      hr1.style.display = "block";
      hr2.style.display = "none";
      hr3.style.display = "none";
      photographerMedia.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (selected.innerText == "Titre") {
      popElement.classList.remove("sr-only");
      dateElement.classList.remove("sr-only");
      titleElement.classList.add("sr-only");
      hr1.style.display = "block";
      hr2.style.display = "none";
      hr3.style.display = "none";
      photographerMedia.sort((a, b) => (a.title < b.title ? -1 : 1));
    }
    displayMedia(photographerMedia);
  });
}
photographersMedia();