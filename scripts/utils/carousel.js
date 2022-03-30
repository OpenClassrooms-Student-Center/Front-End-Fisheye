const carousel=document.getElementById("carousel_modal");

function displayCarousel(e,typeOfMedia,mediaAdress,photographerMedia,mediaDirectory,title){
    carousel.setAttribute('aria-hidden','false');
    main.setAttribute('aria-hidden','true');
    carousel.style.display = "block";
    if (typeOfMedia=="image"){
        document.querySelector(".carousel_media").innerHTML="<img src="+mediaAdress+" alt="+title+" tabindex='0'>";
    }else if(typeOfMedia=="video"){
        document.querySelector(".carousel_media").innerHTML="<video src="+mediaAdress+" autoplay title="+title+" tabindex='0'></video>";
    }else{
        console.log("error in display carousel");
    }
    const media=mediaAdress.split('/')[mediaAdress.split('/').length-1];//récupère le nom du fichier
    const place=placeInCarousel(photographerMedia,media);//récupère l'index du media dans le tableau de media trié
    //chevron de gauche
    const left=document.getElementById("left-arrow");
    left.innerHTML='<i class="fas fa-chevron-left" aria-label="image précédente" tabindex="0"></i>';
    left.addEventListener("click",(e)=>changeMedia(e,photographerMedia,place-1,mediaDirectory));
    //chevron de droite
    const right=document.getElementById("right-arrow");
    right.innerHTML='<i class="fas fa-chevron-right" aria-label="image suivante" tabindex="0"></i>';
    right.addEventListener("click",(e)=>changeMedia(e,photographerMedia,place+1,mediaDirectory));
    //croix de fermeture
    const close=document.getElementById("close");
    close.innerHTML='<i class="fas fa-times" id="close" aria-label="fermer le carousel" tabindex="0"></i>';
    close.addEventListener("click",(e)=>closeCarousel());
    //navigation clavier
    adaCompliant(carousel);
    document.addEventListener('keydown',(e)=>{
        if(e.keyCode==27 && carousel.getAttribute('aria-hidden')=='false'){
            closeCarousel()
        }else if (e.keyCode==37 && carousel.getAttribute('aria-hidden')=='false'){
            changeMedia(e,photographerMedia,place-1,mediaDirectory)
        }else if (e.keyCode==39 && carousel.getAttribute('aria-hidden')=='false'){
            changeMedia(e,photographerMedia,place+1,mediaDirectory)
        }
    })
}

function closeCarousel(){
    carousel.setAttribute('aria-hidden','true');
    main.setAttribute('aria-hidden','false');
    carousel.style.display = "none";
    document.querySelector(".carousel_media").innerHTML="";
}

function placeInCarousel(photographerMedia,media){
    return photographerMedia.findIndex(object=>object.image==media||object.video==media);
}

function changeMedia(e,photographerMedia,place,mediaDirectory){ 
    //faire un carousel infini
    if (place<0){place=photographerMedia.length-1}
    else if (place>photographerMedia.length-1){place=0};
    //déclaration des variables 
    var typeOfMedia="";
    var mediaAdress="";
    var title="";
    //determine typeOfMedia et mediaAdress du media à afficher
    if(Object.keys(photographerMedia[place]).find(key=>key=="image")){
        typeOfMedia="image";
        const image=photographerMedia[place].image;
        mediaAdress="./assets/photographers/"+mediaDirectory+"/"+image;
        title=photographerMedia[place].title;
    }else if(Object.keys(photographerMedia[place]).find(key=>key=="video")){
        typeOfMedia="video";
        const video=photographerMedia[place].video;
        mediaAdress="./assets/photographers/"+mediaDirectory+"/"+video;
        title=photographerMedia[place].video.replaceAll('_',' ');
        title=title.replace('.mp4','');
    }else{
        console.log("problem in changeMedia()");
    }
    displayCarousel(e,typeOfMedia,mediaAdress,photographerMedia,mediaDirectory,title);
}
