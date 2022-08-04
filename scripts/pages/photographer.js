async function getPhotographer() {
    const response = await fetch("../data/photographers.json");
    const data = await response.json();
    return data
}

async function displayImg(mediaData) {

    const listImg = document.querySelector(".list-img");
    mediaData.map((img) => {
        const imgModel = imgFactory(img);
        listImg.appendChild(imgModel)
    })
};

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
        photographFactory(mediaData, photographerData)
        displayImg(mediaData)
    }
};
init();