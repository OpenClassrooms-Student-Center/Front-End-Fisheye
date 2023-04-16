function photographerFactory(data) {
    const { name, portrait } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = 
        `<article>
            <img src="${picture}" alt="${name}" />
            <h2>${name}</h2>
        </article>`
        const section = document.createElement('section');
        section.innerHTML = article;
        return section.firstElementChild;
    }
    return { name, picture, getUserCardDOM }
}