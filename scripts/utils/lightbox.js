var index = 0;


async function displayLightbox(id){
    const lightbox_modal = document.getElementById("lightbox_modal");
    console.log(id);

    creationListe(id);
    const photo = document.querySelector(".lightbox_modal_media");
    const photographerModel = photoCardFactory(data[1][index], data[0]);
    const userCardDOM = photographerModel.getPhotoLightboxDOM();
    photo.appendChild(userCardDOM);


    lightbox_modal.style.display = "flex";
    document.documentElement.style.overflow = 'hidden';
    console.log("TEST: " + index);

    document.addEventListener('keydown', (event) => {
        const nomTouche = event.key;
      
        if (nomTouche === 'ArrowLeft') {
            former()
          return;
        }
        
        else if ((nomTouche === 'ArrowRight') ){
            next();
        }
    
        console.log(index);
      }, false);
}

async function closeLightbox() {
    const lightbox_modal = document.getElementById("lightbox_modal");

    const photo = document.querySelector(".lightbox_modal_media");
    if (photo != "") {
        photo.innerHTML = "";
    }

    lightbox_modal.style.display = "none";
    document.documentElement.style.overflow = 'visible';
}

async function creationListe(id){
    index = -1; // Car dans la boucle on fait +1 au début cela evite le beug pour la premiere incrémentation
    let flag = true;
    while (flag){
        index++;
        if (id ==  data[1][index].id){
            flag = false;
        }
        
    }
    console.log("a: " + index);

}

async function former(){
    if(index > 0){
        index--;
        replaceContain();
    }
    
}

async function next(){
    if(index < data[1].length){
        index++;
        replaceContain();
    }
    
}

function replaceContain(){
    const photo = document.querySelector(".lightbox_modal_media");
    if(data[1][index]){
        if (photo != "") {
        photo.innerHTML = "";
    }
    const photographerModel = photoCardFactory(data[1][index], data[0]);
    const userCardDOM = photographerModel.getPhotoLightboxDOM();
    photo.appendChild(userCardDOM);
    }
    
}

