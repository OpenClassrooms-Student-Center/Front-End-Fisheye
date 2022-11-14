'use strict';
/////////////////////////////////////////

// FUNCTION FILTER TAGS
export default class Filter {
    // FILTER TAGS
    filterTags() {
        let filtres = document.querySelector('ul');
        let articles = document.querySelectorAll('.articlePh');

        // EVENT LISTENER ON CLICK LI
        filtres.addEventListener('click', event => {
            let classValue = event.target.classList.value;

            if (-1 === classValue.indexOf('actived')) {
                event.target.classList.add('actived')
            } else {
                event.target.classList.remove('actived')
            }

            this.sortDomArticle(articles);
        });
    }

    // retrieve the filters with the 'actived' class and place them in the 'filterSelected' array    
    getActiveFilters() {
        let currentFilters = document.querySelectorAll('ul li.actived');
        let filterSelected = [];

        currentFilters.forEach(function (currentFilter) {
            filterSelected.push(currentFilter.getAttribute("data-filter"));
        });

        return filterSelected;
    }

    // compare/check if 'filters' has the same value as the 'article' class    
    ownAllFilters(article) {
        let filters = this.getActiveFilters();
        let classValue = article.classList.value;
        let classes = classValue.split(' ');
        let intersection = filters.filter(
            x => classes.includes(x)
        );

        return filters.length == intersection.length;
    }

    // SHOW OR HIDE ARTICLES
    sortDomArticle(articles) {
        articles.forEach((article) => {
            if (this.ownAllFilters(article)) {
                article.style.display = 'block';
            } else {
                article.style.display = 'none';
            }
        });
    }
}