/*--------- DOM ELEMENTS ---------*/
let thePhotographers;
let theMedia;

let tagArray = [];
let tagFilterArray = [];

const photographerTag = document.querySelector(".photographerTag");
/*--------- EVENTS ---------*/

/*--------- FUNCTIONS ---------*/

const fetchPhotographers = async () => {
    await fetch('./data/photographers.json')
    .then( function  (resp) {
        return resp.json();
    })
    .then( function (data) {
        thePhotographers = data.photographers;
    });
};

const photographersDisplay = async () => {
    await fetchPhotographers();

    const photographersSection = document.querySelector(".photographer_section");

    thePhotographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
    // Remove duplicates from tagArray
    let uniqueTagArray = [...new Set(tagArray)];
    //Create tag selector
    uniqueTagArray.forEach(tag =>{
        const tagFilters = document.querySelector(".tagFilter");

        const photographerTag = document.createElement( 'div' );
        photographerTag.classList.add("photographerTagFilter");
        const p = document.createElement( 'p' );
        p.textContent = '#'+tag;
        photographerTag.appendChild(p);
        tagFilters.appendChild(photographerTag);

        //Event when a filter is selected
        photographerTag.addEventListener("click",() => {
            photographerTag.classList.toggle("active")
            photographersSection.innerHTML = "";
            if (photographerTag.classList.contains("active")) {
                //Clear
                photographersSection.innerHTML = "";

                tagFilterArray.push(tag);
                console.log(tagFilterArray);
                for (var i = 0; i < thePhotographers.length; i++) {
                    //Check if the photographers tag and tagFilterArray is =
                    if (thePhotographers[i].tags.some(r=> tagFilterArray.indexOf(r) >= 0)) {
                        const photographerModel = photographerFactory(thePhotographers[i]);
                        const userCardDOM = photographerModel.getUserCardDOM();
                        photographersSection.appendChild(userCardDOM);
                    }
                }
            } else {
                tagFilterArray.pop(tag);
                console.log(tagFilterArray);
                for (var i = 0; i < thePhotographers.length; i++) {
                    //Check if the photographers tag and tagFilterArray is =
                    if (thePhotographers[i].tags.some(r=> tagFilterArray.indexOf(r) >= 0)) {
                        const photographerModel = photographerFactory(thePhotographers[i]);
                        const userCardDOM = photographerModel.getUserCardDOM();
                        photographersSection.appendChild(userCardDOM);
                    }
                }
            }
            if (tagFilterArray.length === 0) {
                for (var i = 0; i < thePhotographers.length; i++) {
                    //Check if the photographers tag and tagFilterArray is =
                    const photographerModel = photographerFactory(thePhotographers[i]);
                    const userCardDOM = photographerModel.getUserCardDOM();
                    photographersSection.appendChild(userCardDOM);
                }
            }
        });
    });
}


photographersDisplay();


    