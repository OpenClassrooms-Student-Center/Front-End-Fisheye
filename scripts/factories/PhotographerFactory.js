class PhotographerFactory {
    constructor(photographer, type, photos) {
        if (type === 'cardDOM') {
            return this.getPhotographerCardDOM(photographer)
        } else if (type === 'info') {
            return this.getPhotographersInfo(photographer, photos)
        } else {
            console.error('type de PhotographerFactory non trouvé');
        }
    }

    getPhotographersInfo(photographer, photos) {
        const img = document.getElementById("profile-pic")
        img.setAttribute("alt", photographer.name)
        img.src = `assets/photographers/${photographer.portrait}`

        const nameElement = document.getElementById("name")
        nameElement.innerHTML = photographer.name
        const location = document.getElementById("location")
        location.innerHTML = photographer.city + ', ' + photographer.country
        const description = document.getElementById("desc")
        description.innerHTML = photographer.tagline

        const closeContactForm = document.getElementById("closeContactForm")
        closeContactForm.innerHTML = photographer.name

        const totalLikesElement = document.getElementById("total_likes")
        const priceElement = document.getElementById("price")
        let totalLikes = 0;

        photos.forEach(p => {
            totalLikes += p.likes;
        });

        priceElement.innerHTML = photographer.price + "€ / jour";
        totalLikesElement.innerHTML = totalLikes + " <img src='assets/icons/heart-black.png' alt='like' class='heart-black'>";

    }

    getPhotographerCardDOM(photographer) {
        const picture = `assets/photographers/${photographer.portrait}`;
        const article = document.createElement('article');
        const link = document.createElement('a');
        link.setAttribute("href", "#")
        link.setAttribute("title", photographer.name)

        const img = document.createElement('img');
        link.addEventListener("click", function () {
            window.location.href = "photographer.html?id=" + photographer.id;

        }, true);
        img.setAttribute("src", picture)
        img.setAttribute("alt", photographer.name)
        const h2 = document.createElement('h2');
        h2.addEventListener("click", function () {
            window.location.href = "photographer.html?id=" + photographer.id;

        }, true);
        h2.textContent = photographer.name;
        link.appendChild(img)

        article.appendChild(link);

        article.appendChild(h2);
        const h3 = document.createElement('h3');
        h3.textContent = photographer.city + ', ' + photographer.country;
        article.appendChild(h3);
        const h4 = document.createElement('h4');
        h4.textContent = photographer.tagline;
        article.appendChild(h4);
        const h5 = document.createElement('h5');
        h5.textContent = photographer.price + '€/jour';
        article.appendChild(h5);
        return (article);
    }
}
