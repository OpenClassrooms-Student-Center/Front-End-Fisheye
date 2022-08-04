async function getPhotographer() {
    const response = await fetch("../data/photographers.json");
    const data = await response.json();
    return data
}

async function init() {
    const photographer = await getPhotographer();
    const url = (new URL(document.location)).searchParams;
    const id = url.get('id')
    
    if (id) {
        const mediaData = photographer.media.filter((value) => {
            return value.photographerId === Number(id);
        })
        let photographerData;
        photographer.photographers.map((value) => {
            if (value.id === Number(id)) {
                photographerData = value;
            }
        })
        
        displayData(mediaData, photographerData)

    }
};
init();

function displayData(media, photographer) {
    console.log(media, photographer);
    const { name, city, tagline, country} = photographer;

    const picture = `../assets/photographers/${photographer.portrait}`;

    const photographerHeader = document.querySelector(".photograph-header");
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
}