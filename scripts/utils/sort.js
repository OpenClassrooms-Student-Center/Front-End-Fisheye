async function getMediasorted(medias, sortType) {

    const mediaSortField = sortType === 'popularity' ? 'likes' : sortType,
        returnValue = sortType === 'title' ? -1 : 1
    
    const mediasSorted = await medias.sort((a, b) =>  a[mediaSortField] < b[mediaSortField] ? returnValue : -returnValue)

    return mediasSorted

}


const customSelectElement = document.querySelector('.custom-select'),
    selectElement = document.querySelector('.sort-portfolio__options'),
    selectOptionsLength = selectElement.length
    // selectOptions = Array.from(selectElement.children).map(child => child.textContent)

    
    const customSelectedOptionElement = document.createElement('div')
    customSelectedOptionElement.classList.add('custom-select__option', 'custom-select__option--selected')
    customSelectedOptionElement.innerHTML = selectElement.options[selectElement.selectedIndex].innerHTML
    
customSelectElement.setAttribute('aria-label', `Trier par ${selectElement.value}`)
customSelectElement.appendChild(customSelectedOptionElement)

const dividerLine = document.createElement('div')
dividerLine.classList.add('divider')

const customOptionsElement = document.createElement('div')
customOptionsElement.classList.add('custom-select__options', 'custom-select__options--hidden')

for(let i=0; i < selectOptionsLength; i++) {

    const customOptionElement = document.createElement('div')
    customOptionElement.classList.add('custom-select__option', 'custom-select__option--hidden')

    if (i===0) {
        customOptionElement.classList.add('invisible')
    }

    customOptionElement.innerHTML = selectElement.options[i].innerHTML

    customOptionElement.addEventListener('click', function(e) {
        
        let selectedOption = this.parentNode.previousSibling
        const previousContent = selectedOption.textContent
        selectedOption.textContent = this.textContent
        
        let customOptions = Array.from(customOptionsElement.children)
        const positionSelectedOption = customOptions.indexOf(this)
        
        const lastOptions = customOptions.slice(-(selectOptionsLength-positionSelectedOption))
        const firstOptions = customOptions.slice(0, -(selectOptionsLength-positionSelectedOption))
        customOptions = lastOptions.concat(firstOptions)
        // const selectedOptionToMove = customOptions.shift()
        // customOptions.push(selectedOptionToMove)
        customOptionsElement.append(...customOptions)
        
        for(let j=0; j < selectOptionsLength ; j++) {
            
            if (this.innerHTML == selectElement.options[j].innerHTML) {
                selectElement.selectedIndex = j;
                selectElement.dispatchEvent(new Event('change'))
                customSelectElement.setAttribute('aria-label', `Trier par ${selectElement.value}`)
                
                // this.textContent = previousContent
                // customOptions[j].style.display = 'none'
                // const newPositionSelectedOption = customOptions.indexOf(this)
                // customOptions[newPositionSelectedOption].textContent = previousContent
                break;
            } 

        }

        selectedOption.click()
        const hiddenOption = this.parentNode.querySelector('.invisible')
        hiddenOption.classList.remove('invisible')   
        this.classList.add('invisible')     
    })

    customOptionsElement.appendChild(customOptionElement)

}

customSelectElement.appendChild(customOptionsElement)

customSelectedOptionElement.addEventListener('click', function(e) {
    e.stopPropagation()

    this.nextSibling.classList.toggle("custom-select__options--hidden");
    this.classList.toggle("custom-select__option--open");
})

export { getMediasorted }