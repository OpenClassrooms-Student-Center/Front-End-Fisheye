function selectedOption(photographerMedia,mediaDirectory){ //écoute le clic sur une option et définit la propriété (l'option) sélectionnée
    const options=document.querySelectorAll(".option");
    var selectedProperty="";
    options.forEach(option=>{
        option.addEventListener("click",(e)=>{
            selectedProperty=option.textContent;
            if(!Array.from(option.classList).find(c=>c=='selected')){
                const temp=document.querySelector(".selected").textContent;
                document.querySelector(".selected").innerHTML=selectedProperty;
                option.innerHTML=temp;
            }
        sortPhotographerMedia(selectedProperty,photographerMedia,mediaDirectory)
        });
        //au clavier :
        document.addEventListener("keyup",(e)=>{
            if (e.keyCode === 13 && document.activeElement==option) {
                e.preventDefault();
                option.click();
            }
        });
    });
}
    

function sortPhotographerMedia(selectedProperty,photographerMedia,mediaDirectory){ //affiche les media triés
    var sortedMedia=[];
    var media=[];
    const l=photographerMedia.length;
        for (let i=0;i<l;i++){
            media.push(photographerMedia[i]);
        }
    ///tri par ordre décroissant des likes : ///
    if (selectedProperty=="Popularité"){
        var allLikes=[];
        for (let i=0; i<l; i++ ){
            allLikes.push(media[i].likes)
        }
        allLikes.sort(function(a,b){return b-a});
        for (let i=0; i<l; i++ ){
            for (let j=0; j<l ; j++){
                if (media[j].likes==allLikes[i]){
                    sortedMedia.push(media[j]);
                    media[j]="";
                }
            }
        }
        displayMedia(sortedMedia,mediaDirectory);
    ///tri par ordre croissant des dates : ///
    }else if (selectedProperty=="Date"){
        var allDates=[];
        for (let i=0; i<l; i++ ){
            allDates.push(media[i].date)
        }
        allDates.sort();
        for (let i=0; i<l; i++ ){
            for (let j=0; j<l ; j++){
                if (media[j].date==allDates[i]){
                    sortedMedia.push(media[j]);
                    media[j]="";
                }
            }
        }
        displayMedia(sortedMedia,mediaDirectory);
    ///tri par ordre alphabetique des noms : ///
    }else if (selectedProperty=="Nom"){
        var allTitles=[];
        for (let i=0; i<l; i++ ){
            allTitles.push(media[i].title)
        }
        allTitles.sort();
        for (let i=0; i<l; i++ ){
            for (let j=0; j<l ; j++){
                if (media[j].title==allTitles[i]){
                    sortedMedia.push(media[j]);
                    media[j]="";
                }
            }
        }
        displayMedia(sortedMedia,mediaDirectory);
    }else{
        console.log("erreur dans le menu de selection");
    }
}

function openCloseMenu(){
    const openMenuButton=document.getElementById("openMenuButton");
    openMenuButton.addEventListener('click',(e)=>{
        const opened=document.getElementById("option1").tabIndex;
        switch (opened){
            case -1:
                openMenu();
                break;
            case 0:
                closeMenu();
                break;
        }
    })
}

function openMenu(){
    const option1=document.getElementById("option1");
    const option2=document.getElementById("option2");
    const option3=document.getElementById("option3");
    option1.tabIndex=0;
    option2.tabIndex=0;
    option3.tabIndex=0;
    option1.classList.add("menuOpened");
    option2.classList.add("menuOpened");
    option3.classList.add("menuOpened");
    openMenuButton.classList.add("reverse");
}

function closeMenu(){
    const option1=document.getElementById("option1");
    const option2=document.getElementById("option2");
    const option3=document.getElementById("option3");
    option1.tabIndex=-1;
    option2.tabIndex=-1;
    option3.tabIndex=-1;
    option1.classList.remove("menuOpened");
    option2.classList.remove("menuOpened");
    option3.classList.remove("menuOpened");
    openMenuButton.classList.remove("reverse");
}

