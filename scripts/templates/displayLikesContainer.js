function displayLikesContainer(totalLikes, price) {
    const likeContainer = document.querySelector(".total-likes");
  
    likeContainer.innerHTML = `
          <span>${totalLikes} <em class="fa-solid fa-heart"></em></span>
          <span>${price}€ / jour</span>
      `;
  }
  
  export { displayLikesContainer };