export function mediaTemplate(media, name) {
  const { title, likes, image, video } = media;

  let photographerFirstName = name.split(' ')[0];
  // console.log('prénom:', photographerFirstName);

  if (photographerFirstName.includes('-')) {
    // Si le prénom contient un tiret, supprimez-le
    photographerFirstName = photographerFirstName.replace('-', '');
  }

  // Utilisez le prénom modifié
  // console.log('prénom après modification:', photographerFirstName);

  // console.log('titre:', title, 'nombre likes:', likes, 'image:', image);

  // console.log(mediaPath);

  function createMedia() {
    if (video) {
      const mediaPath = `./FishEye_Photos/Sample_Photos/${photographerFirstName}/${video}`;
      const mediaVideo = document.createElement('video');
      mediaVideo.setAttribute('src', mediaPath);
      mediaVideo.setAttribute('alt', title);
      mediaVideo.setAttribute('controls', 'controls');
      const mediaName = document.createElement('p');
      mediaName.textContent = title ?? 'titre inconnu';
      mediaName.classList.add('media-title');
      const mediaContainer = document.createElement('div');
      mediaContainer.classList.add('media-container');
      mediaContainer.appendChild(mediaVideo);
      mediaContainer.appendChild(mediaName);
      return mediaContainer;
    } else {
      const mediaPath = `./FishEye_Photos/Sample_Photos/${photographerFirstName}/${image}`;
      const mediaImage = document.createElement('img');
      mediaImage.setAttribute('src', mediaPath);
      mediaImage.setAttribute('alt', title);
      const mediaName = document.createElement('p');
      mediaName.classList.add('media-title');
      mediaName.textContent = title ?? 'titre inconnu';
      const mediaContainer = document.createElement('div');
      mediaContainer.classList.add('media-container');
      mediaContainer.appendChild(mediaImage);
      mediaContainer.appendChild(mediaName);
      return mediaContainer;
    }
  }
  return {
    title,
    likes,
    image,
    video,
    createMedia,
  };
}
