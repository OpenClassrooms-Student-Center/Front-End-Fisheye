function photographFactory(media, photographer) {
    const { name, city, tagline, country, price} = photographer;

    const picture = `../assets/photographers/${photographer.portrait}`;
    const photographerHeader = document.querySelector(".photograph-header");
    const main = document.querySelector("#main");

    // Header Card Photographer
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

    // display Header Card Photographer element
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
    elementLike.textContent = `${countLikes}`;
    elementLike.setAttribute('class', 'total-likes');
    const iconLike = document.createElement( 'i' );
    iconLike.setAttribute('class', 'fa-solid fa-heart');
    const elementPrice = document.createElement("p");
    elementPrice.textContent = `${price}€ / jour`;

    // display Insert like & price element
    main.appendChild(insertDiv);
    insertDiv.appendChild(elementLike);
    insertDiv.appendChild(iconLike);
    insertDiv.appendChild(elementPrice);

    // Modal contactForm.js
    modal(name);
}

function imgFactory(media){
    
    const containerImg = document.createElement( 'div' );
    containerImg.setAttribute("class", "card-img");

    // check if image or video
    if (media.image) {
        const img = document.createElement( 'img' );
        img.setAttribute("src", `assets/images/${media.image}`);
        img.setAttribute("alt", media.image);
        containerImg.appendChild(img);
    } else if (media.video) {
        var video = document.createElement( 'video' );
        video.setAttribute("src", `assets/videos/${media.video}`);
        video.setAttribute("controls", true);
        video.setAttribute("alt", media.video);
        containerImg.appendChild(video);
    }
    
    const containerDetails = document.createElement( 'div' );
    containerDetails.setAttribute("class", "card-img-details");
    const imgtitle = document.createElement( 'h2' );
    imgtitle.textContent = media.title;
    const containerLike = document.createElement('div');
    containerLike.setAttribute("class", "card-img-details-likes");
    const nbLike = document.createElement( 'h2' );
    nbLike.textContent = `${media.likes}`
    nbLike.setAttribute('class', 'nb-likes');
    const iconLike = document.createElement( 'i' );
    iconLike.setAttribute('class', 'fa-regular fa-heart');

    let clickLike = false;

    iconLike.onclick = function like() {
        clickLike = !clickLike;
        clickLike ? count = media.likes + 1 : count = media.likes;
        nbLike.textContent = `${count}`;
        clickLike ? iconLike.setAttribute('class', 'fa-solid fa-heart') : iconLike.setAttribute('class', 'fa-regular fa-heart')

        const selectorLikes = [...document.querySelectorAll(".nb-likes")];

        let totalCountLikes = 0;
        selectorLikes.map((value) => {
            totalCountLikes = totalCountLikes + Number(value.textContent);
        })
        
        const selectorTotalLikes = document.querySelector(".total-likes");
        selectorTotalLikes.textContent = totalCountLikes
    }

    containerImg.appendChild(containerDetails);
    containerDetails.appendChild(imgtitle);
    containerDetails.appendChild(containerLike);
    containerLike.appendChild(nbLike);
    containerLike.appendChild(iconLike);

    return containerImg
}