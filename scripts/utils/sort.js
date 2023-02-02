async function sortPortfolio(medias, sortType) {

    const mediaSortField = sortType === 'popularity' ? 'likes' : sortType,
        returnValue = sortType === 'title' ? -1 : 1
    
    const mediasSorted = await medias.sort((a, b) =>  a[mediaSortField] < b[mediaSortField] ? returnValue : -returnValue)

    return mediasSorted

}


const customSelectElement = document.querySelector('.custom-select'),
    selectElement = customSelectElement.querySelector('select'),
    selectOptionsLength = selectElement.length

const customSelectedOptionElement = document.createElement('div')
customSelectedOptionElement.classList.add('custom-select__option', 'custom-select__option--selected')
customSelectedOptionElement.innerHTML = selectElement.options[selectElement.selectedIndex].innerHTML


customSelectElement.appendChild(customSelectedOptionElement)

const dividerLine = document.createElement('div')
dividerLine.classList.add('divider')

const customOptionsElement = document.createElement('div')
customOptionsElement.classList.add('custom-select__options', 'custom-select__options--hidden')

for(let i=1; i < selectOptionsLength; i++) {

    const customOptionElement = document.createElement('div')
    customOptionElement.classList.add('custom-select__option', 'custom-select__option--hidden')

    customOptionElement.innerHTML = selectElement.options[i].innerHTML

    customOptionElement.addEventListener('click', function(e) {
        
        let selectedOption = this.parentNode.previousSibling
        const previousContent = selectedOption.textContent
        
        for(let j=0; j < selectOptionsLength ; j++) {

            if (this.innerHTML == selectElement.options[j].innerHTML) {
                selectElement.selectedIndex = j;
                selectElement.dispatchEvent(new Event('change'))
                selectedOption.textContent = this.textContent
                this.textContent = previousContent
                break;
            }
        }

        selectedOption.click()
    })

    customOptionsElement.appendChild(customOptionElement)

}

customSelectElement.appendChild(customOptionsElement)

customSelectedOptionElement.addEventListener('click', function(e) {
    e.stopPropagation()

    this.nextSibling.classList.toggle("custom-select__options--hidden");
    this.classList.toggle("select-arrow-active");
})

export { sortPortfolio }