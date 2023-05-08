const qStr = window.location.search;
const urlParams = new URLSearchParams(qStr);
const id = urlParams.get('id');

async function getPhotographDetails() {
    const response = await fetch('data/photographers.json');
    const photographersData = await response.json();
    const photographDetails = photographersData.photographers.find(item => item.id === parseInt(id))
    console.log(photographDetails)
    return photographDetails;
}

async function displayPhotographDetails() {
    const photograph = await getPhotographDetails();
    const photographHeader = document.querySelector(".photograph-header");
    
    const photographModel = photographHeaderFactory(photograph);
    const userHeaderDOM = photographModel.getUserHeaderDOM();
    
    photographHeader.appendChild(userHeaderDOM);
};

async function init() {
    const { photograph } = await getPhotographDetails();
    displayPhotographDetails(photograph);
};

init();



