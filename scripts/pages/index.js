async function getPhotographers() {

    const request = './data/photographers.json';
    const photographers = await fetch(request)
                                .then(response => {
                                    if(response.ok) {
                                        return response.json();
                                    }
                                })
                                // .then(json => {
                                //     this.photographers = json.photographers;
                                //     console.log(this.photographers);
                                // })
                                .catch(error => {
                                    // 
                                });    
    return ( photographers );
}

async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        // console.log(userCardDOM.firstChild);
        photographersSection.appendChild(userCardDOM);
    });
                                
    const list = document.getElementsByClassName("test");
    for (const el of list) {
        el.addEventListener('click', () => {
            console.log(photographers.filter(obj => { return obj.id == el.parentElement.id }));
        });
    }
};

async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    displayData(photographers);
};

init();

// document.getElementsByClassName('test').forEach(element => console.log(element.className));
// console.log(document.getElementsByClassName('test'));

// Array.from(document.getElementsByClassName("test")).forEach(function(item) {
//     console.log(item.id);
//  });
//     element.addEventListener('click', () => {
//     console.log(element.className);
// }));