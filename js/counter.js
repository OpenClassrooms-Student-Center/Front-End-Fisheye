function initTotalLikes(){
const numberTotalLikes = document.getElementById("number-total-likes");
//choosenGallery.forEach((item) =>
 //   gallery.appendChild(photographerGallery(photographers[index], item))
 // );
}



function counterFunction() {

const allHearts = document.querySelectorAll(".heart-button"); //sélectionne ts les buttons coeur
const numberTotalLikes = document.getElementById("number-total-likes");


allHearts.forEach((heart) => {
  let likes = heart.parentElement; //div .likes qui contient likes et coeur
  let likesCount = likes.innerText;
  let totallikes;


  const refreshCount = () => {
     likes.firstChild.innerText = likesCount;
     numberTotalLikes.innerText = totallikes;
     };

  heart.addEventListener("click", () => {
    if (heart.classList.contains("unliked")) {
      //console.log("il y a eu un click");
      totallikes = Number(numberTotalLikes.innerText); // pour initialiser 
      heart.classList.remove("unliked");
      heart.style.backgroundImage = "url(../assets/icons/light_red_heart.svg)";
      likesCount++;
      totallikes++;
      
    } else {
      //console.log("il y a eu un deuxième click");
      heart.classList.add("unliked");
      heart.style.backgroundImage = "url(../assets/icons/dark_red_heart.svg)";
      likesCount--;
      totallikes--;

    }
    refreshCount();
  
  });
});

return ;

}



//function

