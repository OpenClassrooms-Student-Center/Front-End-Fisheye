function sortList(currentMedias, currentPhotographer) {
    const selectElement = document.querySelector('.selected');
    const opt = document.querySelector('.options');
    const optDate = document.querySelector('.optDate');
    const optTitle = document.querySelector('.optTitle');
    const optPopular = document.querySelector('.optPopular');
    

    selectElement.addEventListener('click', () => {
        console.log('click');
        opt.classList.toggle('hidden');
    });

    if (optDate) {
        optDate.addEventListener('click', () => {
            currentMedias = currentMedias.sort((a, b) => (b.date.localeCompare(a.date)));
            MediaFactory.manageSortList('date');
            document.querySelector("#medias_section").innerHTML = " ";
        MediaFactory.createMediaCard(currentMedias, currentPhotographer);
        MediaFactory.createLikesCountCard();
        sortList(currentMedias, currentPhotographer);
        likesClick();
        Lightbox.init()
        });
    }
    if (optTitle) {
        optTitle.addEventListener('click', () => {
            MediaFactory.manageSortList('title');
            currentMedias = currentMedias.sort((a, b) => (a.title.localeCompare(b.title)));
            document.querySelector("#medias_section").innerHTML = " ";
        MediaFactory.createMediaCard(currentMedias, currentPhotographer);
        MediaFactory.createLikesCountCard();
        sortList(currentMedias, currentPhotographer);
        likesClick();
        Lightbox.init()
        });
    }
    if (optPopular) {
        optPopular.addEventListener('click', () => {
            MediaFactory.manageSortList('popular');
            currentMedias = currentMedias.sort((a, b) => (b.likes - a.likes));
            document.querySelector("#medias_section").innerHTML = " ";
        MediaFactory.createMediaCard(currentMedias, currentPhotographer);
        MediaFactory.createLikesCountCard();
        sortList(currentMedias, currentPhotographer);
        likesClick();
        Lightbox.init()
        });
        // document.querySelector("#medias_section").innerHTML = " ";
        // MediaFactory.createMediaCard(currentMedias, currentPhotographer);
        // MediaFactory.createLikesCountCard();
        // sortList(currentMedias, currentPhotographer);
        // likesClick();
        // Lightbox.init()
    }
}
        function manageSortList(opt){
            this.divSortList.innerHTML = " ";
            if (opt == 'popular') {
                this.divSortList.innerHTML = 
               `<p class="selected">Populaire<i class="fas fa-chevron-down"></i></p>
               <div class="options hidden">  
                   <p class="optDate">Date</p>
                   <p class="optTitle">Titre</p>
               </div>`;
           } else if (opt == 'date') {
               this.divSortList.innerHTML = 
               `<p class="selected">Date<i class="fas fa-chevron-down"></i></p>
               <div class="options hidden">  
                   <p class="optPopular">Populaire</p>
                   <p class="optTitle">Titre</p>
               </div>`;
           } else if (opt == 'title') {
               this.divSortList.innerHTML = 
               `<p class="selected">Titre<i class="fas fa-chevron-down"></i></p>
               <div class="options hidden">  
                   <p class="optPopular">Populaire</p>
                   <p class="optDate">Date</p>
               </div>`;
           }
        }
