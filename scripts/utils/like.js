var nblikes = 0;

function sumLike(photos){
    let sumlike = 0;
    photos.forEach(function(photo){
        sumlike += photo.likes; 
    });
    nblikes = sumlike;
}

async function displayLikes(){
    let p = document.querySelector(".section-stat-like-nombre");
    p.textContent = nblikes;
}


// eslint-disable-next-line no-unused-vars
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