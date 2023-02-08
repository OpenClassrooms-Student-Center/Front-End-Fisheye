



function sorter() {

    const customSelectElement = document.querySelector('.custom-select'),
    selectElement = document.querySelector('.sort-portfolio__options'),
    selectOptionsLength = selectElement.length;
    
    const customSelectedOptionElement = document.createElement('div')
    customSelectedOptionElement.classList.add('custom-select__option', 'custom-select__option--selected')
    customSelectedOptionElement.innerHTML = selectElement.options[selectElement.selectedIndex].innerHTML
    customSelectedOptionElement.setAttribute("tabindex", "0")
    customSelectedOptionElement.setAttribute("role", "button")
    customSelectedOptionElement.setAttribute("aria-haspopup", "listbox")
    customSelectedOptionElement.setAttribute("aria-expanded", "false")

    customSelectElement.setAttribute('aria-label', `Trier par ${selectElement.value}`)
    customSelectElement.appendChild(customSelectedOptionElement)
    
    const dividerLine = document.createElement('div')
    dividerLine.classList.add('divider')
    
    const customOptionsElement = document.createElement('div')
    customOptionsElement.classList.add('custom-select__options', 'custom-select__options--hidden')
    customOptionsElement.setAttribute('aria-expanded', "false")

    function init() {

        const keysToListenTo = ['Enter', 13, 'ArrowDown', 40, 'ArrowUp', 38, 'Escape', 27]

        for(let i=0; i < selectOptionsLength; i++) {
        
            const customOptionElement = document.createElement('div')
            customOptionElement.classList.add('custom-select__option', 'custom-select__option--hidden')
            customOptionElement.setAttribute("tabindex", "-1")
            customOptionElement.setAttribute('aria-selected', 'false')
            customOptionElement.setAttribute('id', `option-${i}`)
        
            if (i===0) {
                customOptionElement.classList.add('invisible')
                customOptionElement.setAttribute('aria-selected', 'true')
            }
        
            customOptionElement.innerHTML = selectElement.options[i].innerHTML
        
            customOptionElement.addEventListener('click', function(e) {
                e.stopPropagation()
                e.preventDefault()
                updateSelectAndClose.apply(this)
            })

            customOptionElement.addEventListener('keydown', function(e) {

                const keyName = e.key || e.keyCode
    
                if (!keysToListenTo.includes(keyName)) return;

                if(keyName === 'Enter' || keyName === 13) {
                    e.stopPropagation()
                    updateSelectAndClose.apply(this)

                } else {

                    const activeElement = document.activeElement,
                    positionActiveElement = Array.from(customOptionsElement.children).indexOf(activeElement)                

                    let positionElement;

                    if (keyName === 'ArrowDown' || keyName === 40) {
                        
                        if (positionActiveElement === selectOptionsLength - 1) {
                            positionElement = 1
                        } else {
                            positionElement = positionActiveElement + 1
                        }

                    } else {

                        if (positionActiveElement === 1) {
                            positionElement = customOptionsElement.children.length - 1
                        } else {
                            positionElement = positionActiveElement - 1
                        }
                    }

                    e.stopPropagation()
                    e.preventDefault()
                    const elementToFocusOn = customOptionsElement.children[positionElement]
                    elementToFocusOn.focus()
                    customOptionsElement.setAttribute('aria-expanded', 'true')
                    // customSelectedOptionElement.setAttribute('aria-activedescendant', `option-${positionElement}`)
                }
            })
        
            customOptionsElement.appendChild(customOptionElement)
        
        }
        
        customSelectElement.appendChild(customOptionsElement)
        
        customSelectElement.addEventListener('click', function(e) {
            e.stopPropagation()
            console.log('test')
            customSelectedOptionElement.toggleAttribute('aria-expanded', 'true')
            toggleSortFilterVisibility()
        })

        customSelectedOptionElement.addEventListener('keydown', function(e) {

            const keyName = e.key || e.keyCode

            if (!keysToListenTo.includes(keyName)) return;
                
            const enterPressed = keyName === 'Enter' || keyName === 13,
                escapePressed =  keyName === 'Escape' || keyName === 27,
                optionsAreVisible =  !customOptionsElement.className.includes('custom-select__options--hidden');

            if (enterPressed || (escapePressed && optionsAreVisible)) toggleSortFilterVisibility() 

            else if (optionsAreVisible) {
                
                if (keyName === 'ArrowDown' || keyName === 40) {
                    e.preventDefault()
                    customOptionsElement.children[1].focus()
                    this.setAttribute('aria-activedescendant', `option-1`)
                } else {
                    e.preventDefault()
                    customOptionsElement.children[customOptionsElement.children.length - 1].focus()
                    this.setAttribute('aria-activedescendant', `option-${customOptionsElement.children.length - 1}`)
                }
            }

        })


        function updateSelectAndClose() {
            toggleSortFilterVisibility()
            updateSelectValue.apply(this)
        }


        function toggleSortFilterVisibility() {
            
            customOptionsElement.classList.toggle("custom-select__options--hidden");
            customSelectedOptionElement.classList.toggle("custom-select__option--open");
        }


        function updateSelectValue() {

            for(let j=0; j < selectOptionsLength ; j++) {
                    
                if (this.innerHTML == selectElement.options[j].innerHTML) {

                    selectElement.selectedIndex = j;
                    selectElement.dispatchEvent(new Event('change'))
                    
                    const customOptions = getNewOptionsOrder.apply(this)
                    customOptionsElement.append(...customOptions)

                    customSelectedOptionElement.textContent = this.textContent                    
                    customSelectedOptionElement.click()

                    setClassesAndAttributes.apply(this)

                    customSelectedOptionElement.focus()

                    break;
                } 
    
            }
        }
    }


    function getNewOptionsOrder() {
        
        let customOptions = Array.from(customOptionsElement.children)
        const positionSelectedOption = customOptions.indexOf(this)
        
        const lastOptions = customOptions.slice(-(selectOptionsLength-positionSelectedOption))
        const firstOptions = customOptions.slice(0, -(selectOptionsLength-positionSelectedOption))
        customOptions = lastOptions.concat(firstOptions)
        
        return customOptions

    }


    function setClassesAndAttributes() {

        const hiddenOption = this.parentNode.querySelector('.invisible')
        hiddenOption.classList.remove('invisible')   
        hiddenOption.setAttribute('aria-selected', 'false')

        this.setAttribute('aria-selected', 'true')
        this.classList.add('invisible')

        customSelectElement.setAttribute('aria-label', `Trier par ${selectElement.value}`)
        customSelectedOptionElement.toggleAttribute('aria-expanded', 'true')
        customOptionsElement.toggleAttribute('aria-expanded', 'true')
        
    }


    async function getMediasorted(medias, sortType) {
    
        const mediaSortField = sortType === 'popularity' ? 'likes' : sortType,
            returnValue = sortType === 'title' ? -1 : 1
        
        const mediasSorted = await medias.sort((a, b) =>  a[mediaSortField] < b[mediaSortField] ? returnValue : -returnValue)
    
        return mediasSorted
    
    }

    return { init, getMediasorted }
}


export default sorter