// Création des cartes médias pour la pages des photographes.
function mediaFactory(data) {
  const { id, photographerId, title, image, likes, video } = data;
  const picture = `assets/photos/${photographerId}/${image}`;

  function createMediaCards() {
    const card = document.createElement('article');
    card.classList.add('media-card')
    const img = document.createElement('img');
    img.setAttribute('src', picture);
    img.setAttribute('alt', `${title}`);
    const textbox = document.createElement('p');
    textbox.classList.add('flex-red');
    const tag = document.createElement('p');
    tag.textContent = title;
    const heart = document.createElement('span');
    heart.innerHTML = `${likes} <i class="fas fa-heart counter"></i>`;
    card.appendChild(img);
    card.appendChild(textbox);
    textbox.appendChild(tag);
    textbox.appendChild(heart);
    return (card)
  }
  return { id, photographerId, title, image, likes, video, createMediaCards };
}

const mediaData = [
  {
    id: 342550,
    photographerId: 82,
    title: 'Fashion Yellow Beach',
    image: 'Fashion_Yellow_Beach.jpg',
    likes: 62,
    date: '2011-12-08',
    price: 55,
  },
  {
    id: 8520927,
    photographerId: 82,
    title: 'Fashion Urban Jungle',
    image: 'Fashion_Urban_Jungle.jpg',
    likes: 11,
    date: '2011-11-06',
    price: 55,
  }
];

const exemple = mediaData[0];
// console.log(mediaFactory(exemple));

// Ne fonctionne pas...
// const ex = exemple.createMediaCards();
// console.log(mediaFactory(ex));