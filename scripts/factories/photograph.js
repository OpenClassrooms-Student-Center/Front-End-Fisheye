function photographFactory(media, photographer) {
    const { name, city, tagline, country, price} = photographer;

    const picture = `../assets/photographers/${photographer.portrait}`;
    const photographerHeader = document.querySelector(".photograph-header");
    const main = document.querySelector("#main");

    // Header Card
    const headerDetails = document.createElement( 'div' );
    headerDetails.setAttribute("class", "photograph-header-details")
    const elementName = document.createElement( 'h1' );
    elementName.textContent = name;
    const elementLocation = document.createElement( 'h2' );
    elementLocation.textContent = `${city}, ${country}`;
    const elementTagline = document.createElement( 'span' );
    elementTagline.textContent = tagline;
    const headerAvatar = document.createElement( 'div' );
    headerAvatar.setAttribute("class", "photograph-header-avatar")
    const img = document.createElement( 'img' );
    img.setAttribute("src", picture);
    photographerHeader.insertBefore(headerDetails, photographerHeader.children[0]);
    photographerHeader.appendChild(headerAvatar);
    headerDetails.appendChild(elementName);
    headerDetails.appendChild(elementLocation);
    headerDetails.appendChild(elementTagline);
    headerAvatar.appendChild(img);

    // Insert like & price
    let countLikes = 0;
    media.map((value) => {
        countLikes = countLikes + value.likes
    })
    
    const insertDiv = document.createElement('div')
    insertDiv.setAttribute("class", "insert-like-price")
    const elementLike = document.createElement("p");
    elementLike.textContent = `${countLikes} 🖤`;
    const elementPrice = document.createElement("p");
    elementPrice.textContent = `${price}€ / jour`;

    main.appendChild(insertDiv);
    insertDiv.appendChild(elementLike);
    insertDiv.appendChild(elementPrice);
}

function imgFactory(media){
    const containerImg = document.createElement( 'div' );
    containerImg.setAttribute("class", "card-img");
    const img = document.createElement( 'img' );
    img.setAttribute("src", `assets/images/${media.image}`);

    containerImg.appendChild(img)
    return containerImg
}