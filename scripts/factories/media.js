
// global variable counting likes
let totalCount = 0;


// produce a media factory
function mediaFactory(mediaItems) {
  const { id, photographerId, title, image, likes, date, price, video } =
    mediaItems;

  const photoUrl = `assets/media/gallery/${image}`;
  const videoUrl = `assets/media/gallery/${video}`;
  const mediaDiv = document.querySelector(".media-div");
  
  // verify image or video
  function getUserArtDOM(media, totalCount) {
    console.log("media", media);
    // totalCount += media.likes;
    console.log(totalCount);
    let isImage = true;
    // ?. returns undefined instead of throwing an error
    if (media?.video) {
      isImage = false;
    }

    // construct DOM elements
    const artCard = document.createElement("section");
    const artWork = document.createElement(isImage ? "img" : "video");
    artWork.setAttribute("src", isImage ? photoUrl : videoUrl);
    if (!isImage) {
      artWork.setAttribute("type", "video/mp4");
    }
    artWork.classList.add("grid-item");
    const artTitle = document.createElement("h3");
    const info = document.createElement("section");
    info.classList.add('infoSection');
    artTitle.innerText = title;
    const likesCounter = document.createElement("section");
    likesCounter.classList.add('likesCounter');
    const likesNo = document.createElement("span");
    likesNo.classList.add('likesNo');
    likesNo.innerText = likes;
    likesNo.style.color = "#901C1C";
    likesNo.style.fontSize = "1.2em";
    const iconSvg = document.createElement("i");
    iconSvg.classList.add("fa-heart","fas");
    // Attach the click event listener here
    iconSvg.addEventListener('click', function(event) {
      console.log('Clicked!', event.target);
      console.log(media);
      // media likes updated for every element 
      console.log(totalCount);
      media.likes += 1;
      likesNo.textContent = media.likes;
      // medial likes total count
      totalCount += 1;
      let totalLikeDiv = document.getElementById('totalLikes');
      totalLikeDiv.innerHTML = totalCount;
    });
    

    // attach the media elements to parents
    mediaDiv.appendChild(artCard);
    artCard.appendChild(artWork);
    likesCounter.appendChild(iconSvg);
    likesCounter.appendChild(likesNo);
    info.appendChild(artTitle);
    info.appendChild(likesCounter);
    artCard.appendChild(info);    
    return artCard;
  }
  return { getUserArtDOM };
}
