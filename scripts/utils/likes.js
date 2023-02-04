/**************************** LIKES  *****************************/
const totalLikesDisplay = document.querySelector(".info-block-likes");

/** fonction des LIKES **/
function likeMedia(e, media, liked, mediaCard) {
  e.stopPropagation();
  let likesCount;
  if (liked === true) {
    likesCount = media.likes + 1;
    totalLikes += 1;
  } else {
    likesCount = media.likes;
    totalLikes -= 1;
  }
  const likesCounter = mediaCard.querySelector(".likes-counter");
  likesCounter.textContent = likesCount;
  totalLikesDisplay.innerHTML = `${totalLikes} <i aria-label="likes" class="fa-solid fa-heart"></i>`;
}
