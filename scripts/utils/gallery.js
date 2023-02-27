document.getElementById("gallery-close").onclick = function(){
    const modal = document.getElementById("medias_modal");
    modal.style.display = "none";
    const mediasSection = document.getElementById('medias');
    mediasSection.style.display = "grid";
    const photographSection = document.getElementById('photograph_header')
    photographSection.style.display = "block";
};

document.getElementById("gallery-next").onclick = function(){
    console.log("1 en plus")
    var total = document.getElementsByClassName("gallery-item-img").length-1;
    var current = parseInt(this.getAttribute('src-current'));
    var next = current+1;
    if(current === total) {
        next = 0;
    }
    changeImage(next);

};

document.getElementById("gallery-previous").onclick = function(){
    console.log("1 en moins")
    var total = document.getElementsByClassName("gallery-item-img").length-1;
    var current = parseInt(this.getAttribute('src-current'));
    var next = current-1;
    if(current === 0) {
        next = total;
    }
    changeImage(next);
};

function changeImage(next){
    console.log("rentre dans changeImage")
    var imgs = document.getElementsByClassName("gallery-item-img");


    if(imgs[next].getAttribute('data-type') == "img"){
        console.log("data-type == ", imgs[next]);
        document.getElementById("medias_modal_video").classList.add('none');
        document.getElementById("medias_modal_img").classList.remove('none');
        document.getElementById("gallery-img").src = imgs[next].getAttribute('src');
        console.log(imgs[next].getAttribute('src'), "Insertion de l'image")

    } else {
        console.log("data-type == ", imgs[next]);
        document.getElementById("medias_modal_img").classList.add('none');
        document.getElementById("medias_modal_video").classList.remove('none');
        document.getElementById("gallery-video").src = imgs[next].getAttribute('src');
    }

    document.getElementById("gallery-title").innerHTML = imgs[next].getAttribute('data-title');
    document.getElementById("gallery-previous").setAttribute('src-current', next);
    document.getElementById("gallery-next").setAttribute('src-current', next);

}