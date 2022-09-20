var nblikes = 0;

/**
 * Sum all the photos
 * @param {*} photos 
 */
function sumLike(photos){
    let sumlike = 0;
    photos.forEach(function(photo){
        sumlike += photo.likes; 
    });
    nblikes = sumlike;
}

/**
 * Display likes
 */
async function displayLikes(){
    let p = document.querySelector(".section-stat-like-nombre");
    p.textContent = nblikes;
}


/**
 * Takes care of adding or decreasing the likes of a photo.
 */
async function like(){
    let element = this.firstChild;
    if (!(element.className == 'liked')){
        element.innerText = Number(element.innerText) + 1;
        element.setAttribute('class', 'liked');
        nblikes++;
        displayLikes();
    } else {
        element.innerText = Number(element.innerText) - 1;
        element.setAttribute('class', '');
        nblikes--;
        displayLikes(nblikes);
    }
}

export {
    like,
    sumLike,
    displayLikes,
    nblikes
}