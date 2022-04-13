// Création de la box du prix et likes
export default class BoxLikes {
  boxLikesAndPrice(totalPhLike, photographers) {
    const ID = new URLSearchParams(window.location.search).get("id");

    photographers.forEach((photographer) => {
      if (ID == photographer.id) {
        let box = document.getElementById("box-like");
        let boxTemplate = `
            <span id="total-likes">${totalPhLike}</span>
            <i class="fas fa-heart" aria-label='likes'></i>
            <span>${photographer.price} €/ jour</span>
            `;
        box.innerHTML = boxTemplate;
      }
    });
  }
}
