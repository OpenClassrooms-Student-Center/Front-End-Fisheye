function initTotalLikes(choosenGallery) {
  let totallikes = 0;
  choosenGallery.forEach((item) => totallikes += item.likes);

  console.log("total", totallikes);
  const numberTotalLikes = document.getElementById("number-total-likes");
  numberTotalLikes.innerText = totallikes;
}



function counterFunction() {

  const allHearts = document.querySelectorAll(".heart-button"); 
  const numberTotalLikes = document.getElementById("number-total-likes");

  allHearts.forEach((heart) => {
    let likes = heart.parentElement;
    let likesCount = likes.innerText;
    let totallikes;

    const refreshCount = () => {
      likes.firstElementChild.innerText = likesCount; 
      console.log("likes.firstChild",likes.firstChild);
      console.log("likes.firstChild.innerText",likes.firstChild.innerText);
      numberTotalLikes.innerText = totallikes;
    };

    heart.addEventListener("click", () => {
      if (heart.classList.contains("unliked")) {
        console.log("il y a eu un click");
        totallikes = Number(numberTotalLikes.innerText); // pour initialiser 
        heart.classList.remove("unliked");
        heart.style.backgroundImage = "url(assets/icons/light_red_heart.svg)";
        likesCount++;
        console.log(likesCount);
        totallikes++;

      } else {
        console.log("il y a eu un deuxième click");
        heart.classList.add("unliked");
        heart.style.backgroundImage = "url(assets/icons/dark_red_heart.svg)";
        likesCount--;
        console.log(likesCount);
        totallikes--;

      }
      refreshCount();

    });
  });

  return;

}





