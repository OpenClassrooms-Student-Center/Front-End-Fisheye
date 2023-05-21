function photographerFactory(data) {
    const { name, portrait, city, country, tagline, price, description, target, id } = data;    
    const picture = `assets/photographers/${portrait}`;
        
    // card creation
    function getUserCardDOM() {
        // create different elements in the DOM
        const card = document.createElement('article');
        const personalSection = document.createElement('section');
        personalSection.setAttribute('tabindex', '0');
        personalSection.setAttribute('role' , 'region');
        personalSection.setAttribute("aria-label" , name);
        personalSection.setAttribute("id" , id);
        const link = document.createElement ('a');
        link.setAttribute("href", target);
        const image = document.createElement('img');
        image.setAttribute("src", picture);
        image.setAttribute("alt", description);
        const h2 = document.createElement('h2');
        h2.textContent = name;
        const h4 = document.createElement('h4');
        h4.textContent = `${city}, ${country}`
        const p1 = document.createElement('p');
        const personalInfo = document.createElement('section');
        personalInfo.setAttribute('tabindex' , '0');
        personalInfo.setAttribute('role' , 'region');
        personalInfo.setAttribute("aria-labelledby" , 'photographer information');
        p1.textContent = tagline;
        const p2 = document.createElement('p');
        p2.textContent = `${price}€/jour`;
        // attach elements to their parents after craetion in the DOM
        card.appendChild(personalSection);
        personalSection.appendChild(link);
        link.appendChild(image);
        link.appendChild(h2);
        card.appendChild(personalInfo);
        personalInfo.appendChild(h4);
        personalInfo.appendChild(p1);
        personalInfo.appendChild(p2);
        return (card);
    }
    return {getUserCardDOM}
}

function handleClick(event) {
    let elementId = event.target.id;
    console.log("Clicked element ID: ", elementId);
    // You can perform any additional actions with the element ID here
    let currentUrl = window.location.href;
    console.log(currentUrl);
    let updatedUrl = currentUrl + "#" + elementId;
    window.location.href = updatedUrl;
    console.log("updated url:", updatedUrl);
  }
  document.addEventListener("click", handleClick);

