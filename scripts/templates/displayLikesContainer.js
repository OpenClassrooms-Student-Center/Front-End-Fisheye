function displayLikesContainer(totalLikes, price) {
    const likeContainer = document.querySelector(".total-likes");
  
    likeContainer.innerHTML = `
          <span>${totalLikes} <i class="fa-solid fa-heart"></i></span>
          <span>${price}€ / jour</span>
      `;
  }
  
  export { displayLikesContainer };