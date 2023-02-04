/** Gestion des LIKES **/
function likeMedia(e, media, liked, mediaCard) {
  e.stopPropagation();
  let likesCount;
  if (liked === true) {
    likesCount = media.likes + 1;
    totalLikes += 1;
  } else {
    likesCount = media.likes;
  }
  const likesCounter = mediaCard.querySelector(".likes-counter");
  likesCounter.textContent = likesCount;
}
