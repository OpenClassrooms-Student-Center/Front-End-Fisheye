function mediaFactory(data) {
    const { id, photographerId, title, image, likes, date, price } = data;

    // Template media

    const wrapper = document.createElement('div');
    wrapper.classList.add("photographes")

    const picture = `assets/images/${data.photographerId}/${image}`;

    function getUserMediaDOM() {
        const media = `
            <a href="}" aria-label="lien vers l'image">
                <article class="picture_block">
                    <div class="picture">
                        <img src="${picture}" alt="${title}">
                    </div>
                    <div class="picture_title">
                        <h6>${title}</h6>
                        <i class="fa-2x fa-heart far"></i>
                    </div>
                </article>
            </a>
        `
        wrapper.innerHTML=media
        return wrapper;
    }
    return { id, photographerId, title, picture, likes, date, price, getUserMediaDOM}
}
