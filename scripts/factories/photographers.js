function photographerFactory(data, template) {
    const {name, portrait, city, country, tagline, price, id} = data;

    const pictures = `../assets/photos/Photographers ID Photos/${portrait}`;
    const picture = `../../assets/photos/Photographers ID Photos/${portrait}`;
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
        rate.textContent = price + '€/jour';
        rate.className = ' price';
        rate.setAttribute('aria-label', 'rate')
        article.appendChild(a)
        a.appendChild(img);
        a.appendChild(h2);
        article.appendChild(location);
        article.appendChild(quote);
        article.appendChild(rate);
        return (article);
    }

    function getUserCardDOM() {
        const article = document.createElement('article');
        const img = document.createElement('img');
        img.setAttribute('src', picture);
        const button = document.createElement('button');
        button.className = ' contact_button';
        button.innerText = 'Contactez-moi';
        button.setAttribute('onClick', 'displayModal()');
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
        div.appendChild(h1);
        div.appendChild(location);
        div.appendChild(quote);
        article.appendChild(button);
        article.appendChild(img);
        return (article);
    }

    if (template === 'detail') {
        return getUserCardDOM()
    } else
        return getUsersCardDOM()
}
