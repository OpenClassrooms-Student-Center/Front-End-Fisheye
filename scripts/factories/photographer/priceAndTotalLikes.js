"use_strict";

/**
 * displaying total number likes + price per day
 * 
 * @param {object} photographer 
 * @param {number} totalLikes 
 */
function photographerPriceAndTotalLikesFactory(photographer, totalLikes) {
    const [{ price }] = photographer;
    const totalLikesElt = document.querySelector(".total-likes");
    const priceAndLikesElt = document.querySelector(".price-and-likes");
    const totalElt = document.createElement("b");
    const heartElt = document.createElement("i");
    const priceElt = document.createElement("b");

    priceAndLikesElt.appendChild(totalLikesElt);
    totalElt.textContent = totalLikes;
    totalLikesElt.appendChild(totalElt);
    heartElt.className = "fa-solid fa-heart";
    totalLikesElt.appendChild(heartElt);
    priceElt.textContent = `${price}€ / jour`;
    priceAndLikesElt.appendChild(priceElt);
}