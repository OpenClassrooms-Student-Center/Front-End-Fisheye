function photographFooterFactory(photographPrice, mediaNbLikes) {
    function getPhotographFooterDOM() {
        const footerHTML = 
        `<div 
            class="footer-container"
            tabindex="0" 
            aria-label="Nombre de likes total: ${mediaNbLikes}, tarif : ${photographPrice} euros par jour"
        >
            <p>
                <span id="total-likes">${mediaNbLikes}</span>
                <i class="fa-solid fa-heart"></i>
            </p>
            <p>
                ${photographPrice}€ / jour
            </p>
        </div>`

        const paragraph = document.createElement('div');
        paragraph.innerHTML = footerHTML;
        return paragraph.firstElementChild;
    }

    return { getPhotographFooterDOM }
}