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
  // addEventListener of selector
  let selector = document.getElementById("selecting-div");
  selector.addEventListener("change", function() {
    if (selector.value == "0") {
      photographerMedia.sort(
        (a, b) => parseFloat(b.likes) - parseFloat(a.likes)
      );
    } else if (selector.value == "1") {
      photographerMedia.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (selector.value == "2") {
      photographerMedia.sort((a, b) => (a.title < b.title ? -1 : 1));

      // photographerMedia.sort();
    }

    displayMedia(photographerMedia);
  });
}
photographersMedia();
