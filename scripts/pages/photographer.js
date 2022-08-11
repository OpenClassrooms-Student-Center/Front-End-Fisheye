async function getPhotographer() {
    const response = await fetch("../data/photographers.json");
    const data = await response.json();
    return data
}

async function displayImg(mediaData) {
    // Create list of media
    const listImg = document.querySelector(".list-img");
    mediaData.map((img) => {
        const imgModel = imgFactory(img);
        listImg.appendChild(imgModel)
    })
};

async function init() {
    // Recovery data
    const photographer = await getPhotographer();

    // Recovery id of photographer on url
    const url = (new URL(document.location)).searchParams;
    const id = url.get('id')
    
    // Search photographer & media related to the good id
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
        photographFactory(mediaData, photographerData)
        displayImg(mediaData)
    }
};
init();