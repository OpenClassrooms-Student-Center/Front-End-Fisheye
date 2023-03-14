//Mettre le code JavaScript lié à la page photographer.html

function photographerFactory(data) {
  const { id, country, city, tagline, price, name, portrait, medias } = data;
  const picture = `./assets/photos/Photographers ID Photos/${portrait}`;

  function getUserCardDOM() {
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

  function renderBookSection() {
    // Create a new div element to hold the media cards
    const bookSection = document.createElement("div");
    bookSection.className = "book-section";

    // Append the media section to the main element
    const mainEl = document.querySelector("main");
    mainEl.append(bookSection);

    //Iterate through each media item in the array
    medias.forEach((media) => {
      media.name = name;
      // Create a media card model object from the media array
      const bookCard = photographerBookFactory(media);
      // Get the DOM element for the media card
      const bookCardDOM = bookCard.getBookCardDOM();
      // Add the card to the media section
      bookSection.append(bookCardDOM);
    });
  }

  // Defining a function that will return a DOM element for the media card
  function getBookCardDOM() {
    // Create an article element to contain the media card
    const article = document.createElement("article");
    article.className += "book-card";
    return article;
  }
  function renderPhotographHeader() {
    // Destructuring the photographer info object to extract to extract its properties
    // Create the HTML for the header section
    const photographHeader = `
        <section class="photograph-header">
          <div class="photograph-info">
            <h1 class="photograph-name">${name}</h1>
            <p class="photograph-location">${city}, ${country}</p>
            <p class="photograph-tagline">${tagline}</p>
          </div>
          <button class="contact_button" onclick="displayModal()">Contactez-moi</button>
          <div>
          <img class="photograph-img" src="./assets/photos/Photographers ID Photos/${portrait}" alt="Photo de ${name}">
        </section>
      `;
    // Add the footer HTML to the main element
    const headerElt = document.querySelector("header");
    headerElt.innerHTML += photographHeader;
  }
  return {
    id,
    name,
    picture,
    city,
    price,
    country,
    medias,
    getUserCardDOM,
    getBookCardDOM,
    renderBookSection,
    renderPhotographHeader,
  };
}
