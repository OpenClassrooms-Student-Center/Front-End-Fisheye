export default function linkFactory(data) {
  const { name, portrait, id } = data;
  const path = `./assets/Sample_Photos/PhotographersID/${portrait}`;
  const nameSplit = name.split(/ |-/).join('');

  const article = document.createElement('article');
  const articleInner = `<a class="photographer__link" href=../photographer.html?id=${id} id="link${nameSplit}" aria-label="aller à la page de ${name}" role="link">
                    <img class="portrait" src=${path} alt="portrait du photographe ${name}">
                    <h2 class="photographer__h2">${name}</h2>
                </a>
                <aside role="informations du photographe ${name}" aria-describedby="link${nameSplit}">
                    <span class="location">${data.city}, ${data.country}</span>
                    <span class="quote">${data.tagline}</span>
                    <span class="price">${data.price} /jour</span>
                </aside>`;
  article.innerHTML = articleInner;
  article.className = 'photographer__article';
  return document.querySelector('.photographer_section').appendChild(article);
}
