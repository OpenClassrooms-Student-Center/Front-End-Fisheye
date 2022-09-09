function photographerFactory(data, nbid) {
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
        img.setAttribute("src", picture)
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

    function getUserId() {

    }
    return { name, picture, getUserCardDOM, getUserId}
}