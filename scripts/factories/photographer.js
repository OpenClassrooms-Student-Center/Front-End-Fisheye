function photographerFactory(data) {
    const { name, city, country, id, price, tagline ,portrait } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        //Création de la sturcture
        const article = document.createElement('div'); // Créer la carte photographe
        const info = document.createElement('div'); // Création de la div info
        const cilckable = document.createElement('a'); // Création de la div clickable
        article.classList.add("profil"); // On donne la classe  
        info.classList.add("profil-info"); // On donne la classe a la div info
        cilckable.classList.add("profil-principal"); // On donne la classe a la div principal
        cilckable.href = "photographer.html?id="+id; //Lien de la carte photo
        //Création des éléments se trouvant dans la div clickable
        const img = document.createElement('img'); // Création de l'image
        img.setAttribute("src", picture);
        img.setAttribute("alt",name);
        const h2 = document.createElement('h2');

        //Création des éléments se trouvant dans la div info
        const h3 = document.createElement('h3');
        const p1 = document.createElement('p');
        const p2 = document.createElement('p');

        //Set les infos
        h2.textContent = name;
        h3.textContent = city + ", " + country;
        p1.textContent = tagline;
        p2.textContent = price + "€/jour";
        p2.classList.add("profil-info-price");

        //Ajout les infos a cilckable
        cilckable.appendChild(img);
        cilckable.appendChild(h2);

        //Ajout les infos a info
        info.appendChild(h3);
        info.appendChild(p1);
        info.appendChild(p2);

        //Ajout les div a article
        article.appendChild(cilckable);
        article.appendChild(info);
        

        return (article);
    }

    function infoUserDom(){
        //Pour le layout
        const section = document.createElement('div');
        section.classList.add("photograph-info");

        const text = document.createElement('div');
        text.classList.add("photograph-info-text");

        //Les elements
        const titre = document.createElement('h1');
        const location = document.createElement('h2');
        const phrasing = document.createElement('p');

        const button = document.createElement('button');
        button.classList.add("contact_button");
        button.setAttribute("onclick","displayModal()");

        const img = document.createElement('img');

        //set les elements
        img.setAttribute("src", picture)
        img.setAttribute("alt",name);
        titre.textContent = name;
        location.textContent = city + ", " + country;
        phrasing.textContent = tagline;
        button.textContent = "Contactez-Moi";

        //Insertion dans le dom
        text.appendChild(titre);
        text.appendChild(location);
        text.appendChild(phrasing);
        section.appendChild(text);
        section.appendChild(button);
        section.appendChild(img);

        return (section);
    }



    return { name, picture, getUserCardDOM, infoUserDom}
}

