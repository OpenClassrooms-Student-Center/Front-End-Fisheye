export default class PhotographerFilter {
    constructor(medias, lightbox) {
        this.medias = medias;
        this.lightbox = lightbox;
    }

    applySort(sortBy) {
        switch (sortBy) {
            case 'likes':
                this.medias.sort((a, b) => b.likes - a.likes);
                break;
            case 'date':
                this.medias.sort((a, b) => new Date(b.date) - new Date(a.date));
                break;
            case 'title':
                this.medias.sort((a, b) => a.title.localeCompare(b.title));
                break;
        }
        
        const photographerMedias = document.querySelector('.photograph-medias');
        photographerMedias.innerHTML = '';

        this.medias.forEach((media) => media.render());
        
        // Mise à jour des médias dans la lightbox  
        this.lightbox.updateMedias(this.medias); 
    }
    /*
    initSortListener() {
        document.getElementById('sortMedia').addEventListener('change', (event) => {
            this.applySort(event.target.value);
        });
    */
        initSortListener() {
          this.applyActiveSort();

          const chevron = document.querySelector('.chevron');
          const sortButton = document.querySelector('.sort_button');
          const sortDropdown = document.querySelector('.sort_dropdown');
      
          // Fonction pour basculer l'affichage du menu déroulant
          const toggleDropdown = () => {
            sortDropdown.classList.toggle('show');         
            sortButton.classList.toggle('radius_bottom_none');

            // Vérifier si sortDropdown a la classe 'show' et ajuster la classe du chevron en conséquence
            if (sortDropdown.classList.contains('show')) {
                chevron.classList.add('rotate_bottom');
            } else {
                chevron.classList.remove('rotate_bottom');
            }
        };
      
          sortButton.addEventListener('click', toggleDropdown);
      
          // Fonction pour mettre à jour le texte du bouton et gérer le tri
          const updateSort = (sortDropdownLink) => {
              // Appliquer le tri sélectionné
              const sortBy = sortDropdownLink.getAttribute('data-sort');
              this.applySort(sortBy);
      
              // Mise à jour du texte du bouton et de la classe active
              const sortButtonText = document.querySelector('.sort_button_text');
              sortButtonText.textContent = sortDropdownLink.textContent;
              document.querySelector('.sort_dropdown li.active').classList.remove('active');
              sortDropdownLink.classList.add('active');
      
              toggleDropdown(); // Fermer le menu déroulant après sélection
          };
      
          // Attacher les gestionnaires d'événements aux liens de tri
          document.querySelectorAll('.sort_dropdown li').forEach(link => {
              link.addEventListener('click', (event) => {
                  event.preventDefault();
                  updateSort(event.currentTarget);
              });
          });
      
          // Fermer le dropdown si l'utilisateur clique en dehors
          window.addEventListener('click', (event) => {
              if (!sortButton.contains(event.target) && sortDropdown.classList.contains('show')) {
                  toggleDropdown();
              }
          });
      }
      
      // Appliquer le tri actif dès l'initialisation
      applyActiveSort() {
          const activeSortLink = document.querySelector('.sort_dropdown li.active');
          if (activeSortLink) {
              this.applySort(activeSortLink.getAttribute('data-sort'));
              const sortButtonText = document.querySelector('.sort_button_text');
              sortButtonText.textContent = activeSortLink.textContent;
          }
      }
      }