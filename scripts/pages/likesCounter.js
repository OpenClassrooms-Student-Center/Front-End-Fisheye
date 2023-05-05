let likesSum = document.querySelector(".likesSum");

// click the heart and increment the number of likes total
function countLikes(jsonData) {
  let count = 0;
  jsonData.forEach((mediaObject) => {
    count += mediaObject.likes;
  });
  likesSum.innerHTML = count;
}

// click the heart and increment the number of likes of the image
function incrementMediaLikes() {
  document.querySelectorAll(".heart-icon").forEach((heart) => {
    heart.addEventListener("click", (event) => {
      let mediaLikes = event.target.previousSibling;
      mediaLikes.innerHTML = parseInt(mediaLikes.innerHTML) + 1;
      incrementTotalLikes();
    });
  });
}

// update the number of likes total
function incrementTotalLikes() {
  likesSum.innerHTML = parseInt(likesSum.innerHTML) + 1;
}
