function sortList(currentMedias, currentPhotographer) {
    const selectElement = document.querySelector('.selected');
    selectElement.setAttribute("aria-expanded", false);
    const options = document.querySelector('.options');
    const optDate = document.querySelector('.optDate');
    const optTitle = document.querySelector('.optTitle');
    const optPopular = document.querySelector('.optPopular');  
    
    selectElement.addEventListener('click', () => {
        document.querySelector('.fa-chevron-down').classList.toggle('chevron-up');
        let ariaExpanded = selectElement.getAttribute("aria-expanded");
        ariaExpanded == "true" ? ariaExpanded = "false" : ariaExpanded = "true";
        selectElement.setAttribute("aria-expanded", ariaExpanded);
        options.classList.toggle('hidden');
    });
    if (optDate) {
        optDate.addEventListener('click', () => {
            currentMedias = currentMedias.sort((a, b) => (b.date.localeCompare(a.date)));
            refreshSortList(currentMedias, currentPhotographer, "date");
        });
    }
    if (optTitle) {
        optTitle.addEventListener('click', () => {
            currentMedias = currentMedias.sort((a, b) => (a.title.localeCompare(b.title)));
            refreshSortList(currentMedias, currentPhotographer, "title");
        });
    }
    if (optPopular) {
        optPopular.addEventListener('click', () => {
            currentMedias = currentMedias.sort((a, b) => (b.likes - a.likes));
            refreshSortList(currentMedias, currentPhotographer, "popular");
        });
    }
}

function manageSortList(opt){
    const divSortList = document.querySelector('.sort_list');
    divSortList.setAttribute("role", "listbox");
    divSortList.innerHTML = " ";
    if (opt == 'popular') {
        divSortList.innerHTML = 
       `<button class="selected" id="selected" aria_labelledby="listboxlabel" aria-haspopup="listbox">Populaire<i class="fas fa-chevron-down"></i></button>
       <div class="options hidden">  
           <button class="optDate" role="option" aria-label="Date">Date</button>
           <button class="optTitle" role="option" aria-label="Titre">Titre</button>
       </div>`;
   } else if (opt == 'date') {
       divSortList.innerHTML = 
       `<button class="selected" id="selected" aria_labelledby="listboxlabel" aria-haspopup="listbox">Date<i class="fas fa-chevron-down"></i></button>
       <div class="options hidden">  
           <button class="optPopular" role="option" aria-label="Populaire">Populaire</button>
           <button class="optTitle" role="option" aria-label="Titre">Titre</button>
       </div>`;
   } else if (opt == 'title') {
       divSortList.innerHTML = 
       `<button class="selected" id="selected" aria_labelledby="listboxlabel" aria-haspopup="listbox">Titre<i class="fas fa-chevron-down"></i></button>
       <div class="options hidden">  
           <button class="optPopular" role="option" aria-label="Polulaire">Populaire</button>
           <button class="optDate" role="option" aria-label="Date">Date</button>
       </div>`;
   }
}

function refreshSortList(currentMedias, currentPhotographer, opt) {
    manageSortList(opt);
    document.querySelector("#medias_section").innerHTML = " ";
    MediaFactory.createMediaCard(currentMedias, currentPhotographer);
    MediaFactory.createLikesCountCard();
    likesClick();
    Lightbox.init();
    sortList(currentMedias, currentPhotographer);
}