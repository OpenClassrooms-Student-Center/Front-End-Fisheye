//Mettre le code JavaScript lié à la page photographer.html

function photographerFactory(data) {
  const { id, country, city, tagline, price, name, portrait } = data;
  const picture = `./assets/photos/Photographers ID Photos/${portrait}`;

  function getUserCardDOM(page) {
    // if (page === 'index.html') {}

    // manipulate the DOM
    const article = document.createElement("article");
    const img = document.createElement("img");
    const h2 = document.createElement("h2");
    const h3 = document.createElement("h3");
    const p = document.createElement("p");
    const h4 = document.createElement("h4");
    const a = document.createElement("a");

    // modify elements

    img.setAttribute("src", picture);
    a.setAttribute("href", `photographer.html?id=${id}`);
    a.setAttribute("aria-label", `Lien vers le portfolio de ${name}`);
    img.classList.add("photo-img");
    a.classList.add("photographer-link");
    h2.textContent = name;
    h2.classList.add("item-name");
    h3.textContent = `${city} , ${country}`;
    p.textContent = tagline;
    h4.innerText = `${price} € / jour`;

    // apend child
    article.appendChild(img);
    article.appendChild(h2);
    article.appendChild(h3);
    article.appendChild(p);
    article.appendChild(h4);
    a.appendChild(article);

    return a;
  }

  return { id, name, picture, city, price, country, getUserCardDOM };
}

function renderBookSection(array) {
  // Create a new div element to hold the media cards
  const bookSection = document.createElement("div");
  bookSection.className = "book-section";

  // Append the media section to the main element
  const mainEl = document.querySelector("main");
  mainEl.append(bookSection);

  // Iterate through each media item in the array
  array.forEach((book) => {
    // Create a media card model object from the media array
    const bookCard = bookFactory(media);
    // Get the DOM element for the media card
    const bookCardDOM = bookCard.getBookCardDOM();
    // Add the card to the media section
    bookSection.append(bookCardDOM);
  });
}

// function getPhotographerCardDOM(data) {
//   const { id, country, city, tagline, price, name, portrait } = data;

//   // manipulate the DOM
//   const section = document.createElement("section");
//   const div = document.createElement("div");
//   const h1 = document.createElement("h1");
//   const p = document.createElement("p");
//   const button = document.createElement("button");
//   const img = document.createElement("img");

//   img.setAttribute("src", picture);
//   div.appendChild("img");
//   div.classList.add("photograph-info");
//   section.classList.add("photograph-header");
//   h1.textContent = name;
//   div.appendChild(h1);

//   return section;
// }

// return { id, name, picture, city, price, country, getPhotographerCardDOM };

// const photographHeader = `
//         <section class="photograph-header">
//           <div class="photograph-info">
//             <h1 class="photograph-name">${name}</h1>
//             <p class="photograph-location">${city}, ${country}</p>
//             <p class="photograph-tagline">${tagline}</p>
//           </div>
//           <button class="contact_button" onclick="displayModal()">Contactez-moi</button>
//           <div>
//           <img class="photograph-img" src="./assets/photos/Photographers ID Photos/${portrait}" alt="Photo de ${name}">
//         </section>
//       `;
// // Add the footer HTML to the main element
// const mainEl = document.querySelector("main");
// mainEl.innerHTML += photographHeader;

// function renderPhotographHeader(object) {
//   // Destructuring the photographer info object to extract to extract its properties
//   const { name, city, country, tagline, portrait } = object;
//   // Create the HTML for the header section
//   const photographHeader = `
//         <section class="photograph-header">
//           <div class="photograph-info">
//             <h1 class="photograph-name">${name}</h1>
//             <p class="photograph-location">${city}, ${country}</p>
//             <p class="photograph-tagline">${tagline}</p>
//           </div>
//           <button class="contact_button" onclick="displayModal()">Contactez-moi</button>
//           <div>
//           <img class="photograph-img" src="./assets/photos/Photographers ID Photos/${portrait}" alt="Photo de ${name}">
//         </section>
//       `;
//   // Add the footer HTML to the main element
//   const mainEl = document.querySelector("main");
//   mainEl.innerHTML += photographHeader;
// }
