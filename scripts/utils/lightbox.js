var index = 0;


function displayLightbox(id){
    const lightbox_modal = document.getElementById("lightbox_modal");
    console.log(id);
    creationListe(id);

    const photo = document.querySelector(".lightbox_modal_media");
    const photographerModel = photoCardFactory( data[1][index], data[0]);
    const userCardDOM = photographerModel.getPhotoLightboxDOM();
    photo.appendChild(userCardDOM);


    lightbox_modal.style.display = "flex";
    document.documentElement.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox_modal = document.getElementById("lightbox_modal");

    const photo = document.querySelector(".lightbox_modal_media");
    if (photo != "") {
        photo.innerHTML = "";
    }

    lightbox_modal.style.display = "none";
    document.documentElement.style.overflow = 'visible';
}

async function creationListe(id){
    while (id !=  data[1][index].id){
        index++;
    }

}


