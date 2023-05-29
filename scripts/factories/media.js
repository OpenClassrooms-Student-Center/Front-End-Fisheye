// produce a media factory
function mediaFactory(mediaItems) {
  const { id, photographerId, title, image, likes, date, price, video } =
    mediaItems;

  const photoUrl = `assets/media/gallery/${image}`;
  const videoUrl = `assets/media/gallery/${video}`;
  const icons = `assets/media/icons/heart-regular.svg`;
  const mediaDiv = document.querySelector(".media-div");

  // verify image or video
  function getUserArtDOM(media) {
    console.log("media", media);
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
    const info = document.createElement("div");
    artTitle.innerText = title;
    const likesCounter = document.createElement("section");
    const likesNo = document.createElement("span");
    likesNo.innerText = likes;
    const iconSvg = document.createElement("i");
    iconSvg.classList.add("fa-heart");

    // create svg icon - doesn't work
    // const iconSvg = document.createElement('svg');
    // const iconPath = document.createElement('path');
    // // iconSvg.setAttribute('fill', 'none');
    // // iconSvg.setAttribute('viewBox', '0 0 24 24');
    // // iconSvg.setAttribute('stroke', 'red');
    // iconSvg.classList.add('post-icon');
    // iconSvg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

    // iconPath.setAttribute(
    //   'd',
    //   'M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402m5.726-20.583c-2.203 0-4.446 1.042-5.726 3.238-1.285-2.206-3.522-3.248-5.719-3.248-3.183 0-6.281 2.187-6.281 6.191 0 4.661 5.571 9.429 12 15.809 6.43-6.38 12-11.148 12-15.809 0-4.011-3.095-6.181-6.274-6.181'
    // );
    // iconPath.setAttribute('height', '24');
    // iconPath.setAttribute('width', '24');
    // iconPath.setAttribute('clip-rule', 'evenodd');
    // iconPath.setAttribute('fill-rule', 'evenodd');
    // iconSvg.setAttribute('stroke', 'black');
    // iconSvg.appendChild(iconPath);

    // trial code svg : works
    // const iconSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    // const iconPath = document.createElementNS(
    //   'http://www.w3.org/2000/svg',
    //   'path'
    // );

    // iconSvg.setAttribute('fill', 'none');
    // iconSvg.setAttribute('viewBox', '0 0 24 24');
    // iconSvg.setAttribute('stroke', 'black');
    // iconSvg.classList.add('post-icon');

    // iconPath.setAttribute(
    //   'd',
    //   'M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1'
    // );
    // iconPath.setAttribute('stroke-linecap', 'round');
    // iconPath.setAttribute('stroke-linejoin', 'round');
    // iconPath.setAttribute('stroke-width', '2');
    // iconSvg.appendChild(iconPath);
    // const artMotion = document.createElement('video');
    // artTitle.textContent = title;
    // icon.setAttribute('src', icon);

    mediaDiv.appendChild(artCard);
    artCard.appendChild(artWork);
    info.appendChild(artTitle);
    likesCounter.appendChild(iconSvg);
    likesCounter.appendChild(likesNo);
    info.appendChild(likesCounter);
    artCard.appendChild(info);
    return artCard;
  }
  return { getUserArtDOM };
}
