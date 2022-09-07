import {displayLightbox, displayModal} from '../../scripts/utils/forms.js';

export function photographerFactory(data, template, path, index, updateLightboxData, updateLikesModalData) {
    const {name, portrait, city, country, tagline, price, id, title, image, video, likes} = data;
    const pictures = `../assets/photos/Photographers ID Photos/${portrait}`;
    const photographer = `./photographer/photographer.html?id=${id}`;

    function getUsersCardDOM() {
        const article = document.createElement('article');
        article.setAttribute('aria-label', name)
        const a = document.createElement('a');
        a.setAttribute('href', photographer);
        a.setAttribute('aria-label', 'to ' + name + ' page')
        const img = document.createElement('img');
        img.setAttribute('src', pictures);
        img.setAttribute('alt', name)
        const h2 = document.createElement('h2');
        h2.textContent = name;
        const location = document.createElement('p');
        location.textContent = city + ', ' + country;
        location.className = ' location';
        location.setAttribute('aria-label', 'location')
        const quote = document.createElement('p');
        quote.textContent = tagline;
        quote.className = ' quote'
        quote.setAttribute('aria-label', 'quote')
        const rate = document.createElement('p');
        rate.textContent = price + '€ par jour';
        rate.className = ' price';
        rate.setAttribute('aria-label', 'rate')
        article.appendChild(a);
        a.appendChild(img);
        a.appendChild(h2);
        article.appendChild(location);
        article.appendChild(quote);
        article.appendChild(rate);
        return (article);
    }

    const picture = `../../assets/photos/Photographers ID Photos/${portrait}`;

    function getUserCardDOM() {
        const article = document.querySelector('.photographer-content');
        const button = document.createElement('button');
        button.className = 'contact_button';
        button.innerText = 'Contactez-moi';
        button.onclick = displayModal;
        const img = document.createElement('img');
        img.setAttribute('src', picture);
        const div = document.createElement('div')
        const h1 = document.createElement('h1');
        h1.innerText = name;
        const location = document.createElement('p');
        location.textContent = city + ', ' + country;
        location.className = ' location';
        const quote = document.createElement('p');
        quote.textContent = tagline;
        quote.className = ' quote';
        article.appendChild(div);
        article.appendChild(button);
        article.appendChild(img);
        div.appendChild(h1);
        div.appendChild(location);
        div.appendChild(quote);
        return (article);
    }

    function getUserName() {
        const photographerName = document.createElement('p');
        photographerName.innerHTML = name;
        return (photographerName);
    }

    const media = `../../assets/photos/${path}/${image}`;
    const mp4Path = `../../assets/photos/${path}/${video}`;

    function getMediaByUser() {
        const button = document.createElement('button');
        button.onclick = () => {
            displayLightbox();
            updateLightboxData(index);
        };
        const article = document.createElement('article');
        if (image) {
            const img = document.createElement('img');
            img.setAttribute('src', media);
            button.appendChild(img);
        }
        if (video) {
            const mp4 = document.createElement('video');
            mp4.setAttribute('src', mp4Path);
            button.appendChild(mp4);
        }
        const content = document.createElement('div');
        const compter = document.createElement('div');
        const div = document.createElement('div');
        div.className = ' heart';
        const description = document.createElement('p');
        description.innerHTML = title;
        description.className = ' description';
        const like = document.createElement('p');
        like.innerText = likes;
        like.className = ' like';
        const icon = document.createElement('i');
        icon.className = ' fa-regular fa-heart';
        icon.onclick = () => {
            updateLikesModalData(data, index);
        };
        const ico = document.createElement('i')
        ico.className = ' fa-solid fa-heart'
        ico.onclick = () => {
            updateLikesModalData(data, index);
        };
        article.appendChild(button);
        article.appendChild(content);
        content.appendChild(description);
        content.appendChild(compter);
        compter.appendChild(like);
        compter.appendChild(div);
        div.appendChild(ico);
        div.appendChild(icon);
        return (article);
    }

    if (template === 'detail') {
        return getUserCardDOM();
    }
    if (template === 'modal') {
        return getUserName();
    }
    if (template === 'media') {
        return getMediaByUser();
    }
    if (template === 'index') {
        return getUsersCardDOM();
    } else {
        console.error('Template suivant incorrect :', template);
    }
}
