let slideIndex = 1;

function plusSlides(n) {
  showSlides((slideIndex += n));
}

function currentSlide(n) {
  showSlides((slideIndex = n));
}

function closeModal() {
  document.getElementById("myModal").style.display = "none";
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("grid-item");
  let captionText = document.getElementById("caption");

  if (n > slides.length) {
    // previous slide

    slideIndex = 1;
  }
  if (n < 1) {
    // next slide
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }

  let currentIndex = slideIndex - 1;

  if (currentIndex + 1 === slides.length) {
    currentIndex = 0;
  }
  slides[currentIndex].style.display = "block";
  slides[currentIndex].style.width = 400;
  slides[currentIndex].style.height = 400;
  dots[currentIndex].className += " active";
  captionText.innerHTML = dots[currentIndex].alt;
}

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
  ContactUsbtn.setAttribute("aria-haspopup", "listbox");
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
    const photographerName = (document.getElementById("photographer-name").innerText = photographer.name);
  });
  // close modal onclick
  const closingModal = document.getElementById("closeX");
  closingModal.addEventListener("click", function() {
    closeModal();
  });

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

async function displayMedia(photographerMedia, render) {
  const mediaDiv = document.querySelector(".media-div");

  mediaDiv.innerHTML = "";

  photographerMedia.forEach((media, index) => {
    const mediaSection = mediaFactory(media);
    const mediaArts = mediaSection.getUserArtDOM(media, slideIndex, showSlides, photographerMedia, currentSlide, plusSlides, index);
    mediaDiv.appendChild(mediaArts);
  });

  displayImgSlides(photographerMedia, render);
}

function prevBtnClick(event) {
  plusSlides(-1);
}

function nextBtnClick(event) {
  plusSlides(1);
}

function displayImgSlides(array) {
  const myImages = document.getElementById("myImages");
  myImages.innerHTML = "";

  array.map((iterator, index) => {
    const isImage = iterator?.video ? false : true;

    const slides = document.createElement("div");
    slides.classList.add("mySlides");
    // slides.setAttribute("value", JSON.stringify(iterator));

    let img;
    if (isImage) {
      img = document.createElement("img");
      const { image } = iterator;
      const src = `assets/media/gallery/${image}`;
      img.style.display = "block";
      img.style.width = "100%";
      img.style.height = "1100px";
      img.style.objectFit = "cover";
      img.setAttribute("src", src);
      img.setAttribute("role", "img");
      img.setAttribute("aria-label", "viewing individual images");
      img.setAttribute("alt", title);
      img.setAttribute("tabindex", 0);
    } else {
      img = document.createElement("video");
      const { video } = iterator;
      let source = document.createElement("source");
      const src = `assets/media/gallery/${video}`;
      source.setAttribute("src", src);
      source.setAttribute("type", "video/mp4");
      img.style.width = "100%";
      img.style.height = "1100px";
      img.controls = true;
      img.loop = true;
      img.autoplay = true;
      img.appendChild(source);
      img.setAttribute("tabindex", 0);
    }

    // slides.appendChild(text);
    slides.appendChild(img);
    myImages.appendChild(slides);

    const closeElement = document.getElementById("myModalClose");
    closeElement.addEventListener("click", function onClick(event) {
      // console.log("close button", iterator);

      let modal = document.getElementById("myModal");
      modal.style.display = "none";
    });
    const nextBtn = document.getElementById("nextBtn");
    const prevBtn = document.getElementById("prevBtn");
    prevBtn.addEventListener("click", prevBtnClick);
    nextBtn.addEventListener("click", nextBtnClick);
  });
}

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
  totalLikes.setAttribute("role", "selecton menu name");
  totalLikes.innerHTML = totalCount;
  totalLikes.setAttribute("tabindex", 0);
  const likeCounterSpanIcon = document.createElement("i");
  likeCounterSpanIcon.classList.add("fa-heart", "fas");
  likeCounterSpanIcon.style.color = "black";
  const likesDiv = document.createElement("div");
  likesDiv.classList.add("likesDiv");
  const dayPrice = document.getElementById("price");
  dayPrice.setAttribute("tabindex", 0);
  // append children to the span
  likesDiv.appendChild(totalLikes);
  likesDiv.appendChild(likeCounterSpanIcon);
  likesCounterSpan.appendChild(likesDiv);
  likesCounterSpan.appendChild(dayPrice);

  // create dropown menu -> get all drop downs 
  const dropdowns = document.querySelectorAll(".dropdown");

  // loop though all dropdown elements 
  dropdowns.forEach(dropdown => {
    // get inner elements from each dropdown
    const select = dropdown.querySelector(".select");
    const caret = dropdown.querySelector(".caret");
    const menu = dropdown.querySelector(".menu");
    const options = dropdown.querySelectorAll(".menu li");
    const selected = dropdown.querySelector(".selected");

    // focus on elements
        select.setAttribute("tabindex", 0);

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
    let modified = [...photographerMedia];
    let sortedArray;

    if (selected.innerText == "Popularité") {
      popElement.classList.add("sr-only");
      dateElement.classList.remove("sr-only");
      titleElement.classList.remove("sr-only");
      hr1.style.display = "none";
      hr2.style.display = "block";
      hr3.style.display = "none";
      sortedArray = modified.sort(
        (a, b) => parseFloat(b.likes) - parseFloat(a.likes)
      );
      const myImages = document.getElementById("myImages");
      myImages.innerHTML = "";
    } else if (selected.innerText == "Date") {
      popElement.classList.remove("sr-only");
      dateElement.classList.add("sr-only");
      titleElement.classList.remove("sr-only");
      hr1.style.display = "block";
      hr2.style.display = "none";
      hr3.style.display = "none";
      sortedArray = modified.sort((a, b) => new Date(b.date) - new Date(a.date));
      const myImages = document.getElementById("myImages");
      myImages.innerHTML = "";
    } else if (selected.innerText == "Titre") {
      popElement.classList.remove("sr-only");
      dateElement.classList.remove("sr-only");
      titleElement.classList.add("sr-only");
      hr1.style.display = "block";
      hr2.style.display = "none";
      hr3.style.display = "none";
      sortedArray = modified.sort((a, b) => (a.title < b.title ? -1 : 1));
      const myImages = document.getElementById("myImages");
      myImages.innerHTML = "";
    }
    displayMedia(sortedArray);
  });

  displayMedia(photographerMedia);
}

function removeListeners() {
  const parentElement = document.getElementById("myImages");

  const listElements = parentElement.getElementsByClassName("mySlides");

  while (listElements.length > 0) {
    const element = listElements[0];

    const nextBtn = element.getElementById("nextBtn");
    const prevBtn = element.getElementById("prevBtn");

    nextBtn.removeEventListener("click", prevBtnClick);
    prevBtn.removeEventListener("click", nextBtnClick);

    element.remove();
  }
}
photographersMedia();
