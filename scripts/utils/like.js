const cardInfo = document.querySelector(".card-info");
let totalLike = 0;

setTimeout(() => {
  const likes = document.querySelectorAll(".like");
  const totalLikes = document.querySelector(".likes");

  likes.forEach((el) => {
    // Nombre total de like
    let nbLike = parseInt(el.innerHTML);
    totalLike += nbLike;

    // Ajout de 1 like à chaque clique
    el.addEventListener("click", () => {
      nbLike++;
      el.innerHTML = nbLike;
      totalLike++;
      totalLikes.innerHTML = totalLike;
    });
  });
}, 1000);

// Ajout du nombre de like total dans le DOM
const likes = document.createElement("i");
likes.classList.add("fa-solid", "fa-heart", "likes");

setTimeout(() => {
  likes.innerHTML = totalLike;
}, 1500);

cardInfo.appendChild(likes);
