class PhotographerWork {
  constructor(photographer, media) {
    this._photographer = photographer;
    this._media = media;
  }

  createPhotographerWork(photographer, media) {
    console.log(photographer);
    console.log(media);
    media.forEach((media) => {
      const mediasWrapper = document.querySelector("#medias-wrapper");

      // Create a container for each media item
      const mediaContainer = document.createElement("div");
      mediaContainer.classList.add("media-info");

      // Create a container for media details
      const mediaImg = document.createElement("div");
      mediaImg.classList.add("media-img");

      const mediaDetails = document.createElement("div");
      mediaDetails.classList.add("media-details");

      // Create a <p> element for the media ID
      const mediaIdElement = document.createElement("p");
      mediaIdElement.innerHTML = `ID: ${media.id}`;

      // Create a <p> element for the media title
      const mediaTitleElement = document.createElement("p");
      mediaTitleElement.innerHTML = media.title;

      // Create a <p> element for the media title
      const mediaLikeContainer = document.createElement("div");
      mediaLikeContainer.classList.add("media-like");

      // Create a <p> element for the media title
      const mediaLikeElement = document.createElement("p");
      mediaLikeElement.innerHTML = media.likes;

      // Create a <p> element for the media title
      const mediaLikeHeartElement = document.createElement("i");
      mediaLikeHeartElement.classList.add("fa-solid", "fa-heart");

      //   Construct the path to the image using the correct folder structure

      const mediaTypeElement = document.createElement("p");

      if (media.image) {
        mediaTypeElement.innerHTML = "Type: Image";
        const mediaTitle = media.title;

        console.log("media", media);

        // Construct the path to the image using the correct folder structure
        const imagePath = `assets/images/${photographer.name}/${media.image}`;
        const titlePath = media.title;
        console.log("titlePath", titlePath);

        // Create an <img> element for displaying the image
        const imageElement = document.createElement("img");
        imageElement.src = imagePath;
        // imageElement.titlePath = imageTitle;
        imageElement.alt = media.image;
        // imageElement.onclick = onOpenPic;

        // Append the image element to the mediaImg container
        mediaImg.appendChild(imageElement);
      } else if (media.video) {
        mediaTypeElement.innerHTML = "Type: Video";
        // Construct the path to the video using the correct folder structure
        const videoPath = `assets/images/${photographer.name}/${media.video}`;

        // Create a <video> element for displaying the video
        const videoElement = document.createElement("video");
        videoElement.src = videoPath;
        videoElement.controls = true;

        // Append the video element to the mediaImg container
        mediaImg.appendChild(videoElement);
      }

      // mediaDetails.appendChild(mediaIdElement);
      mediaDetails.appendChild(mediaTitleElement);
      mediaLikeContainer.appendChild(mediaLikeElement);
      mediaLikeContainer.appendChild(mediaLikeHeartElement);

      // Add the media details container to the media container
      mediaContainer.appendChild(mediaImg);
      mediaContainer.appendChild(mediaDetails);
      mediaContainer.appendChild(mediaDetails);
      mediaDetails.appendChild(mediaLikeContainer);

      // Add the media container to the medias wrapper
      mediasWrapper.appendChild(mediaContainer);
    });
  }
}

export { PhotographerWork };

//template for media section for photographer page
// photographerPage.js;
// export function photographerMediaTemplate(filteredMedias, photographer) {
//   filteredMedias.forEach((media) => {
//     const mediasWrapper = document.querySelector(".medias-wrapper");

//     // Create a container for each media item
//     const mediaContainer = document.createElement("div");
//     mediaContainer.classList.add("media-info");

//     // Create a container for media details
//     const mediaImg = document.createElement("div");
//     mediaImg.classList.add("media-img");

//     const mediaDetails = document.createElement("div");
//     mediaDetails.classList.add("media-details");

//     // Create a <p> element for the media ID
//     const mediaIdElement = document.createElement("p");
//     mediaIdElement.innerHTML = `ID: ${media.id}`;

//     // Create a <p> element for the media title
//     const mediaTitleElement = document.createElement("p");
//     mediaTitleElement.innerHTML = media.title;

//     // Create a <p> element for the media title
//     const mediaLikeContainer = document.createElement("div");
//     mediaLikeContainer.classList.add("media-like");

//     // Create a <p> element for the media title
//     const mediaLikeElement = document.createElement("p");
//     mediaLikeElement.innerHTML = media.likes;

//     // Create a <p> element for the media title
//     const mediaLikeHeartElement = document.createElement("i");
//     mediaLikeHeartElement.classList.add("fa-solid", "fa-heart");

//     //   Construct the path to the image using the correct folder structure

//     const mediaTypeElement = document.createElement("p");

//     if (media.image) {
//       mediaTypeElement.innerHTML = "Type: Image";
//       const mediaTitle = media.title;

//       console.log("media", media);

//       // Construct the path to the image using the correct folder structure
//       const imagePath = `assets/images/${photographer.name}/${media.image}`;
//       const titlePath = media.title;
//       console.log("titlePath", titlePath);

//       // Create an <img> element for displaying the image
//       const imageElement = document.createElement("img");
//       imageElement.src = imagePath;
//       // imageElement.titlePath = imageTitle;
//       imageElement.alt = media.image;
//       imageElement.onclick = onOpenPic;

//       // Append the image element to the mediaImg container
//       mediaImg.appendChild(imageElement);
//     } else if (media.video) {
//       mediaTypeElement.innerHTML = "Type: Video";
//       // Construct the path to the video using the correct folder structure
//       const videoPath = `assets/images/${photographer.name}/${media.video}`;

//       // Create a <video> element for displaying the video
//       const videoElement = document.createElement("video");
//       videoElement.src = videoPath;
//       videoElement.controls = true;

//       // Append the video element to the mediaImg container
//       mediaImg.appendChild(videoElement);
//     }

//     // mediaDetails.appendChild(mediaIdElement);
//     mediaDetails.appendChild(mediaTitleElement);
//     mediaLikeContainer.appendChild(mediaLikeElement);
//     mediaLikeContainer.appendChild(mediaLikeHeartElement);

//     // Add the media details container to the media container
//     mediaContainer.appendChild(mediaImg);
//     mediaContainer.appendChild(mediaDetails);
//     mediaContainer.appendChild(mediaDetails);
//     mediaDetails.appendChild(mediaLikeContainer);

//     // Add the media container to the medias wrapper
//     mediasWrapper.appendChild(mediaContainer);
//   });
// }
