document.getElementById("gallery-close").onclick = function(){
    const modal = document.getElementById("medias_modal");
    modal.style.display = "none";
    const mediasSection = document.getElementById('medias');
    mediasSection.style.display = "grid";
    const photographSection = document.getElementById('photograph_header')
    photographSection.style.display = "block";
    window.location.reload()
};

document.getElementById("gallery-next").onclick = function(){

    var total = document.getElementsByClassName("gallery-item-img").length-1;
    var current = parseInt(this.getAttribute('src-current'));
    var next = current+1;
    if(current === total) {
        next = 0;
    }
    navButton(next);

};

document.getElementById("gallery-previous").onclick = function(){

    var total = document.getElementsByClassName("gallery-item-img").length-1;
    var current = parseInt(this.getAttribute('src-current'));
    var next = current-1;
    if(current === 0) {
        next = total;
    }
    navButton(next);

};

function navButton(next){

    var imgs = document.getElementsByClassName("gallery-item-img");


    if(imgs[next].getAttribute('data-type') == 'img'){
        document.getElementById("medias_modal_video").classList.add('none');
        document.getElementById("medias_modal_img").classList.remove('none');
        document.getElementById("medias_modal_img").src = imgs[next].getAttribute('src');
    } else {
        document.getElementById("medias_modal_img").classList.add('none');
        document.getElementById("medias_modal_video").classList.remove('none');
        document.getElementById("medias_modal_video").src = imgs[next].getAttribute('src');
    }

    document.getElementById("gallery-title").innerHTML = imgs[next].getAttribute('data-title');
    document.getElementById("gallery-previous").setAttribute('src-current', next);
    document.getElementById("gallery-next").setAttribute('src-current', next);

}