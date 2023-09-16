export function photographerFactory({
    name, portrait, city, country, tagline, price, id
}){
    const picture = `../assets/photographers/${portrait}`;
    const getUserCardDOM = ()=>{
        const card = document.createElement("article")
        card.innerHTML = `
        <a href="./photographer.html?id=${id}" aria-label="${name}">
          <img src="${picture}" alt="${name}" aria-label="${name}" lazy="loading">
          <h1 aria-label="${name}">${name}</h1>
          <span aria-label="${city}, ${country}">${city}, ${country}</span>
          <p aria-label="${tagline}">${tagline}</p>
          <span aria-label="${price}€/jour">${price}€/jour</span>
        </a>
      `;
      return card 
    }
    return {name, picture, getUserCardDOM}
}