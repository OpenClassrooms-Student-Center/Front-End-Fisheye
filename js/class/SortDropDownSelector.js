export default class SortDropDownSelector {
    constructor() {
        this.defaultBtnValue = "Popularité"
    }

    static value = "popularity"

    getView = () => {
        let sortView = document.createElement('div');
        sortView.setAttribute('class', 'sort');

        let sortLabel = document.createElement('span');
        sortLabel.setAttribute('id', 'sort-label');
        sortLabel.setAttribute('class', 'sort__label');
        sortLabel.innerHTML = "Trier par";

        let sortWrapper = document.createElement('div');
        sortWrapper.setAttribute('id', 'sort-wrapper');
        sortWrapper.setAttribute('class', 'sort__wrapper');
        this.wrapper = sortWrapper;

        let sortBtn = document.createElement('button');
        sortBtn.setAttribute('id', 'sort-btn');
        sortBtn.setAttribute('class', 'btn sort-btn');
        sortBtn.setAttribute('aria-expanded', 'false');
        sortBtn.setAttribute('aria-haspopup', 'listbox');
        sortBtn.setAttribute('labelledby', 'sort-label');
        sortBtn.innerHTML = this.defaultBtnValue;
        this.btn = sortBtn;
        sortBtn.addEventListener('click', this.toggleDropDown);

        sortWrapper.appendChild(sortBtn);
        sortView.appendChild(sortLabel);
        sortView.appendChild(sortWrapper);

        return sortView
    }
}