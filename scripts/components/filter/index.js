export class Filter {
  constructor() {}
  createDropListFilter() {
    const contentFilter = `
     <div class="portfolio-filter">
        <p>Trier par</p>
        <div class="dropdown">
          <div class="toggle-listbox" role="button" tabindex="0" aria-label="liste de tri, trié par popularité"
            aria-haspopup=”listbox” aria-expanded>
            <p class="active-option">Popularité</p>
             <i class="fa-solid fa-angle-down"></i>
             <i class="fa-solid fa-angle-up"></i>
          </div>
          <div class="hidden">
            <button class="sort-option" value="popularity" role=”listbox” tabindex="0" aria-label="trié par popularité"
              aria-activedescendant="false" aria-selected="false">Popularité</button>
          </div>
          <button class="sort-option" value="date" role=”listbox” tabindex="0" aria-label="trié par date"
            aria-activedescendant="false" aria-selected="false">Date</button>
          <button class="sort-option" value="title" role=”listbox” tabindex="0" aria-label="trié par titre"
            aria-activedescendant="false" aria-selected="false">Titre</button>
        </div>
      </div>`;

    return contentFilter;
  }
}
