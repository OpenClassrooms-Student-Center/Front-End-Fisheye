// eslint-disable-next-line no-unused-vars
function mediaFactory(media) {
  const {
    id, photographerId, title, image, video, likes,
  } = media;

  // Create media card
  function getMediaCard() {
    const article = document.createElement('article');
    const mediaInfos = document.createElement('div');
    let mediaTag = document.createElement('img');
    const h2 = document.createElement('h2');
    const likesTag = document.createElement('span');

    article.setAttribute('class', 'media');
    mediaInfos.setAttribute('class', 'media-infos');
    h2.textContent = title;
    likesTag.textContent = `${likes} ♡`;
    likesTag.setAttribute('class', 'likes');
    likesTag.setAttribute('aria-label', 'likes');
    likesTag.setAttribute('tabindex', '0');
    likesTag.style.cursor = 'pointer';

    // Add an "isLiked" property to media object to handle likes feature
    function handleLikes() {
      const totalLikesTag = document.querySelector('.total-likes__likes');
      const totalLikes = parseInt(totalLikesTag.textContent, 10);
      if (!media.isLiked) {
        /* eslint-disable no-param-reassign */
        media.isLiked = true;
        media.likes += 1;
        likesTag.textContent = `${media.likes} ♥`;
        totalLikesTag.textContent = `${totalLikes + 1} ♥`;
      } else {
        media.isLiked = false;
        media.likes -= 1;
        /* eslint-disable no-param-reassign */
        likesTag.textContent = `${media.likes} ♡`;
        totalLikesTag.textContent = `${totalLikes - 1} ♥`;
      }
    }

    likesTag.addEventListener('click', () => {
      handleLikes();
    });
    likesTag.addEventListener('keyup', (event) => {
      if (event.key === 'Enter') {
        handleLikes();
      }
    });

    // Check if media is an image or a video and create the right tag
    if (image) {
      mediaTag.setAttribute(
        'src',
        `assets/images/medias/${photographerId}/${image}`,
      );
      article.appendChild(mediaTag);
    } else {
      mediaTag = document.createElement('video');
      const source = document.createElement('source');
      source.setAttribute(
        'src',
        `assets/images/medias/${photographerId}/${video}`,
      );
      mediaTag.appendChild(source);
    }

    mediaTag.setAttribute('class', 'media-tag');
    mediaTag.setAttribute('id', id);
    mediaTag.setAttribute('alt', title);
    mediaTag.setAttribute('tabindex', '0');
    mediaTag.style.cursor = 'pointer';
    mediaTag.addEventListener('click', (event) => {
      // eslint-disable-next-line no-undef
      displayLightBox(event.target.id);
    });
    mediaTag.addEventListener('keyup', (event) => {
      if (event.key === 'Enter') {
        // eslint-disable-next-line no-undef
        displayLightBox(event.target.id);
      }
    });

    mediaInfos.appendChild(h2);
    mediaInfos.appendChild(likesTag);
    article.appendChild(mediaTag);
    article.appendChild(mediaInfos);

    return article;
  }

  return { getMediaCard };
}
