export default class SortDropDownSelector {
  constructor () {
    /* ENG: Set a default dropdown button value */
    /* FRA: Définir une valeur par defaut pour le bouton dropdown */
    this.defaultBtnValue = 'Popularité'
  }

  static value = 'popularity'

  getView = () => {
    const sortView = document.createElement('div')
    sortView.setAttribute('class', 'sort')

    const sortLabel = document.createElement('span')
    sortLabel.setAttribute('id', 'sort-label')
    sortLabel.setAttribute('class', 'sort__label')
    sortLabel.innerHTML = 'Trier par'

    const sortWrapper = document.createElement('div')
    sortWrapper.setAttribute('id', 'sort-wrapper')
    sortWrapper.setAttribute('class', 'sort__wrapper')
    this.wrapper = sortWrapper

    const sortBtn = document.createElement('button')
    sortBtn.setAttribute('id', 'sort-btn')
    sortBtn.setAttribute('class', 'btn sort-btn')
    sortBtn.innerHTML = this.defaultBtnValue
    this.btn = sortBtn
    sortBtn.addEventListener('click', this.toggleDropDown)

    sortWrapper.appendChild(sortBtn)
    sortView.appendChild(sortLabel)
    sortView.appendChild(sortWrapper)

    return sortView
  }
}
