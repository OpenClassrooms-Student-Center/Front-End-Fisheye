function photographerTemplate(data) {
    const { name, portrait, city, country, tagline, price, id } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const div = document.createElement("div");
    div.classList.add("photographer__container");
    const link = document.createElement("a");
    link.classList.add("photographer__link");
    link.href = `photographer.html?id=${id}`;
    const article = document.createElement("article");
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.classList.add("photographer_card_profilepicture");
    const h2 = document.createElement("h2");
    const h4 = document.createElement("h4");
    const h5 = document.createElement("h5");
    const h6 = document.createElement("h6");
    h2.textContent = name;
    h4.textContent = city + ", " + country;
    h5.textContent = tagline;
    h5.classList.add("photographer_tagline");
    h6.textContent = price + " € / jour";
    article.appendChild(img);
    // article.appendChild(h2);
    article.appendChild(h4);
    article.appendChild(h5);
    article.appendChild(h6);
    link.appendChild(img);
    link.appendChild(h2);
    div.appendChild(link);
    div.appendChild(article);
    return div;
    }

    function getUserProfilDOM() {
        const section = document.createElement("section");
        const article = document.createElement("article");
        const header = document.createElement("header");
        const h1 = document.createElement("h1");
        const p = document.createElement("p");
        const small = document.createElement("small");
        const linebreak = document.createElement("br");
    
        section.setAttribute("class", `photograph-header`);
        article.setAttribute("class", `photographer_profile`);
        h1.setAttribute("id", `photographer_h1`);
        p.setAttribute("id", `photographer_location`);
        small.setAttribute("id", `photographer_small`);
    
        h1.textContent = name;
        p.textContent = `${city}, ${country}`;
        small.textContent = tagline;
    
        const button = document.createElement("button");
        const img = document.createElement("img");
    
        button.setAttribute("onclick", `displayModal()`);
        button.setAttribute("class", `contact_button`);
        button.setAttribute("alt", `Contact Me`);
        img.setAttribute("class", `circle_img`);
        img.setAttribute("src", `${picture}`);
        img.setAttribute("alt", `photo de profil de ${name}">`);
    
        button.textContent = `Contactez-moi`;
    
        section.appendChild(article),
          article.appendChild(h1),
          article.appendChild(p),
          article.appendChild(small),
          section.appendChild(button),
          section.appendChild(img);
    
        const modal = document.createElement("div");
        const modalAppC = document.getElementById("contact_modal");
    
        const h2Modal = document.createElement("h2");
        const imgCloseModalUrl = `assets/images/icons/close.svg`;
        const imgCloseModal = document.createElement("img");
    
        imgCloseModal.setAttribute("src", `${imgCloseModalUrl}`);
        imgCloseModal.setAttribute("alt", `Fermer la fenêtre`);
        imgCloseModal.setAttribute("onclick", `closeModal()`);
        modal.setAttribute("class", `modal`);
    
        header.appendChild(imgCloseModal);
    
        modalAppC.appendChild(modal), modal.appendChild(header);
    
        //Formulaire
    
        header.setAttribute("class", `modal-header`);
    
        const form = document.createElement("form");
        const divForm = document.createElement("div");
        form.setAttribute("action", ``);
        form.setAttribute("method", `post`);
        form.setAttribute("name", `myForm`);
    
        const prenom = document.createElement("label");
        const inputPrenom = document.createElement("input");
        inputPrenom.type = "text";
        inputPrenom.setAttribute("name", `prenom`);
        inputPrenom.setAttribute("id", `prenom`);
    
        const nom = document.createElement("label");
        const inputNom = document.createElement("input");
        inputNom.type = "text";
        inputNom.setAttribute("name", `nom`);
        inputNom.setAttribute("id", `nom`);
    
        const email = document.createElement("label");
        const inputEmail = document.createElement("input");
        inputEmail.type = "email";
        inputEmail.setAttribute("name", `Email`);
        inputEmail.setAttribute("id", `email`);
    
        const message = document.createElement("label");
        message.setAttribute("for", "message");
        const texareaMessage = document.createElement("textarea");
        texareaMessage.setAttribute("name", `message`);
        texareaMessage.setAttribute("id", `message`);
    
        const buttonValider = document.createElement("button");
    
        buttonValider.setAttribute("class", `contact_button`);
        buttonValider.setAttribute("id", `result`);
        buttonValider.setAttribute("onclick", `recupForm()`);
    
        prenom.textContent = `Prénom`;
        nom.textContent = `Nom`;
        email.textContent = `Email`;
        message.textContent = `Message`;
        buttonValider.textContent = `Envoyer`;
    
        header.insertAdjacentHTML(
          "beforeend",
          `<h2>Contactez moi<br> ${name}</h2>`
        );
        header.appendChild(form), form.appendChild(divForm);
        divForm.appendChild(prenom), divForm.appendChild(inputPrenom);
        divForm.appendChild(nom), divForm.appendChild(inputNom);
        divForm.appendChild(email), divForm.appendChild(inputEmail);
        divForm.appendChild(message);
        divForm.appendChild(texareaMessage);
        form.appendChild(buttonValider);
        return section;
    }

     // header constructor
     function getPhotographerDataDOM() {

      const header = document.createElement('div');

      const container = document.createElement('div');
      const h1 = document.createElement('h1');
      h1.textContent = name;
      const h2 = document.createElement('h2');
      h2.textContent = city + ", " + country;
      h2.className = "red";
      const p2 = document.createElement('p');
      p2.textContent = tagline;

      const btn = document.createElement('button');
      btn.setAttribute("class", "contact_button");
      btn.setAttribute("type", "button");
      btn.setAttribute("onclick", "displayModal()");
      btn.textContent = "Contactez-moi";

      const img = document.createElement('img');
      img.setAttribute("src", picture);
      img.setAttribute('alt', name);

      container.appendChild(h1);
      container.appendChild(h2);
      container.appendChild(p2);
      header.appendChild(container);
      header.appendChild(btn);
      header.appendChild(img);

      return (header);
  }


    return { name, picture, getUserCardDOM, getPhotographerDataDOM }
}

