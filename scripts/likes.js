// Ajout ou retrait d'un like au clic
export default class likeEvent {
  constructor() {
    let galerie = document.getElementById("photographer-gallery");

    galerie.addEventListener("click", (e) => {
      let likeBtn = -1 != e.target.classList.value.indexOf("heart-btn");
      console.log(e);
      if (likeBtn) {
        let counterLike =
          e.target.parentNode.firstElementChild.firstElementChild;
        let totalPhLikes = document.getElementById("total-likes");
        let isLiked = -1 != e.target.classList.value.indexOf("isLiked");
        if (isLiked) {
          e.target.classList.remove("isLiked");
          e.target.classList.replace("fas", "far");
          totalPhLikes.innerHTML = parseInt(totalPhLikes.innerHTML) - 1;
          counterLike.innerHTML = parseInt(counterLike.innerHTML) - 1;
        } else {
          e.target.classList.add("isLiked");
          e.target.classList.replace("far", "fas");
          totalPhLikes.innerHTML = parseInt(totalPhLikes.innerHTML) + 1;
          counterLike.innerHTML = parseInt(counterLike.innerHTML) + 1;
        }
      }
    });
  }
}
