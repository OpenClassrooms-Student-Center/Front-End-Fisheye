


/* Fonction assurant le bon comportement et l'accessibilité du tri  
    Paramètres :
        - Aucun
    Renvoie :
        - Une fonction d'initialisation des écouteurs d'évènements 
        - Une fonction de tri
*/
function sorter() {

    // Le select natif ne sera pas montré car difficile de le designer tel que désiré
    // Il va juste servir pour pouvoir écouter les évènements de changement de valeur
    const selectElement = document.querySelector('.sort-portfolio__options'),
        selectOptionsLength = selectElement.length;

    // Crée l'élément qui sera visible et fera comprendre à l'utilisateur qu'il s'agit d'un select drowdown
    // Cet élément a pour contenu la valeur du choix de tri retenu par l'utilisateur
    const customSelectedOptionElement = createSelectedOptionElement(selectElement)

    // Crée la liste d'options de tri possible
    // Cette liste est une copie de la liste du select natif
    const customOptionsElement = createCustomOptions()

    // Custom select qui englobe le select native et la liste d'options customisée
    const customSelectElement = createCustomSelect(customSelectedOptionElement)
    
    const dividerLine = document.createElement('div')
    dividerLine.classList.add('divider')
    

    /* Création du custom select et des écouteurs d'évènements régissant son comportement 
        Paramètres :
            - Aucun
        Renvoie :
            - Rien
    */
    function init() {

        const keysToListenTo = ['Enter', 13, 'ArrowDown', 40, 'ArrowUp', 38, 'Escape', 27]

        /* Le custom select étant basé sur le select natif,
            on parcourt le select natif pour répliquer chaque option
        */
        for(let i=0; i < selectOptionsLength; i++) {
            
            const customOptionElement = createCustomOption(i)
        
            if (i===0) {
            /* La première option est celle sélectionnée par défaut
                Pour suivre le design exigé, cette option ne doit pas être répétée une fois la liste ouverte
            */
                customOptionElement.classList.add('invisible')
                customOptionElement.setAttribute('aria-selected', 'true')

                customSelectedOptionElement.setAttribute('aria-activedescendant', 'option-0')
            }
        
            // Le custom select a une option qui est identique à l'option du select natif 
            customOptionElement.innerHTML = selectElement.options[i].innerHTML
        
            // L'utilisateur clique sur une option de tri
            customOptionElement.addEventListener('click', function() {
                updateSelectAndClose.apply(this)
            })

            customOptionElement.addEventListener('keydown', function(e) {

                const keyName = e.key || e.keyCode
    
                if (!keysToListenTo.includes(keyName)) return;

                e.stopPropagation()
                e.preventDefault()

                // L'utilisateur a choisi un critère de tri
                if(keyName === 'Enter' || keyName === 13) updateSelectAndClose.apply(this)
                else if (keyName === 'Escape' || keyName === 27) toggleFilterVisibility() 
                // L'utilisateur se déplace dans la liste d'options
                else moveUpDownFromOption() 
            })
        
            customOptionsElement.appendChild(customOptionElement)
        
        }
        
        // Toutes les options ayant été créées, on peut maintenant les ajouter au custom select, qui devient une réplique identique du select natif
        customSelectElement.appendChild(customOptionsElement)

        // Le bouton, qui est aussi le choix de tri selectionné par l'utilisateur, est cliqué
        customSelectedOptionElement.addEventListener('click', function(e) {
            e.stopPropagation()
            e.preventDefault()
            toggleFilterVisibility()
        })

        customSelectedOptionElement.addEventListener('keydown', function(e) {

            const keyName = e.key || e.keyCode

            if (!keysToListenTo.includes(keyName)) return;
                e.stopPropagation()
            e.preventDefault()

            const enterPressed = keyName === 'Enter' || keyName === 13,
                escapePressed =  keyName === 'Escape' || keyName === 27,
                optionsAreVisible =  !customOptionsElement.className.includes('custom-select__options--hidden');
            
            // Dès qu'on clique sur entrer, la liste doit soit s'afficher soit se fermer
            // Quand on clique sur échap, la liste se ferme uniquement si elle était ouverte
            if (enterPressed || (escapePressed && optionsAreVisible)) toggleFilterVisibility(optionsAreVisible) 

            else if (optionsAreVisible) moveDownUpFromSelectedOption(keyName)

        })


        /* Change la valeur de tri et ferme la liste de choix
            Paramètres :
                - Aucun
                - le bouton 
            Renvoie :
                - L'élément, correspondant à une liste d'options
        */        
        function updateSelectAndClose() {
            toggleFilterVisibility()
            updateSelectValue.apply(this)
        }


        /* Toggle la liste d'options
            Paramètres :
                - Aucun
            Renvoie :
                - Rien
        */        
        function toggleFilterVisibility(optionsAreVisible=undefined) {
            
            const closeFilter = optionsAreVisible ? true : !customOptionsElement.className.includes('custom-select__options--hidden');
            if (closeFilter) {
                customSelectedOptionElement.focus()       
                customSelectedOptionElement.setAttribute('aria-expanded', 'false')
                customOptionsElement.setAttribute('aria-expanded', 'false')
            } else {
                customSelectedOptionElement.setAttribute('aria-activedescendant', 'option-0')
                customSelectedOptionElement.setAttribute('aria-expanded', 'true')
                customOptionsElement.setAttribute('aria-expanded', 'true')
            } 
            
            customSelectedOptionElement.classList.toggle("custom-select__option--open");
            customOptionsElement.classList.toggle("custom-select__options--hidden");
        }


        /* Update le choix du critère de tri 
            Paramètres :
                - Aucun
            Renvoie :
                - Rien
        */        
        function updateSelectValue() {

            // Boucle pour trouver à quelle option du select natif le choix correspond
            // Le but étant d'update le select natif pour activer une action une fois l'event reçu
            for(let j=0; j < selectOptionsLength ; j++) {
                    
                if (this.innerHTML == selectElement.options[j].innerHTML) {

                    selectElement.selectedIndex = j;
                    selectElement.dispatchEvent(new Event('change'))
                    
                    // L'ordre des options de sorte à garder à un ordre constant
                    const customOptions = getNewOptionsOrder.apply(this)
                    customOptionsElement.append(...customOptions)

                    // L'élément servant de bouton d'ouverture doit indiquer la valeur de tri 
                    customSelectedOptionElement.textContent = this.textContent                    

                    // Attributs pour l'acccessibilité 
                    setClassesAndAttributes.apply(this)

                    break;
                } 
            }
        }


        /* Déplace vers une option précédente ou suivante selon la position du curseur, le curseur étant déjà sur une option de tri
            Paramètres :
                - Le code associé à la touche pressée
            Renvoie :
                - Rien
        */  
        function moveUpDownFromOption(keyName) {

            const activeElement = document.activeElement,
                positionActiveElement = Array.from(customOptionsElement.children).indexOf(activeElement)                

            const positionElement = getOptionPosition(keyName, positionActiveElement)

            moveFromOption(positionElement)
        }


        /* Récupère la position de l'option sur laquelle le curseur doit se déplacer
            Paramètres :
                - Le code associé à la touche pressée
                - la position de l'élément actif, c'est à dire l'option actuelle avant déplacement
            Renvoie :
                - La position où se rendre
        */         
        function getOptionPosition(keyName, positionActiveElement) {

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

            return positionElement
        }


        /* Déplace le focus sur une option avec comme point de départ une autre option
            Paramètres :
                - La position de l'option sur laquelle déplacer le focus
            Renvoie :
                - Rien
        */         
        function moveFromOption(position) {

            const elementToFocusOn = customOptionsElement.children[position]
            elementToFocusOn.focus()
            customSelectedOptionElement.setAttribute('aria-activedescendant', `option-${position}`)

        }

        /* Déplace le focus sur une option avec comme point de départ le bouton d'ouverture de la liste
            Paramètres :
                - Le code associé à la touche pressée
            Renvoie :
                - Rien
        */        
        function moveDownUpFromSelectedOption(keyName) {
            
            let position = 1, elementToFocus;
            if (keyName === 'ArrowDown' || keyName === 40) {
                elementToFocus = customOptionsElement.children[position]
            } else {
            // Si touche du haut pressée alors que pas encore rentré dans la liste, on part alors du bas de la liste
                position = customOptionsElement.children.length - 1
                elementToFocus = customOptionsElement.children[position]
            }
            
            elementToFocus.focus()
            customSelectedOptionElement.setAttribute('aria-activedescendant', `option-${position}`)

        }
    }


    /* Récupère l'ordre dans lequel les options doivent être présentées à l'utilisateur
        Paramètres :
            - Aucun
        Renvoie :
            - Rien
    */
    function getNewOptionsOrder() {
        
        let customOptions = Array.from(customOptionsElement.children)
        const positionSelectedOption = customOptions.indexOf(this)
        
        // On déplace dans la liste les options de sorte à ce que l'élément choisi arrive à la première position de la liste
        // Sur une liste de 3 éléments, si le 2ème élément est choisi alors, il faut un step de 2 pour que ce 2ème élément soit le premier de la liste
        const lastOptions = customOptions.slice(-(selectOptionsLength-positionSelectedOption))
        const firstOptions = customOptions.slice(0, -(selectOptionsLength-positionSelectedOption))
        customOptions = lastOptions.concat(firstOptions)
        
        return customOptions

    }


    /* Associe les classes et attributs suite à un choix de tri
        Paramètres :
            - Aucun
        Renvoie :
            - Rien
    */    
    function setClassesAndAttributes() {

        // Le choix ayant changé, l'ancien choix peut de nouveau être visible dans les options affichées à l'utilisateur
        const hiddenOption = this.parentNode.querySelector('.invisible')
        hiddenOption.classList.remove('invisible')   
        hiddenOption.setAttribute('aria-selected', 'false')

        this.setAttribute('aria-selected', 'true')
        this.classList.add('invisible')

        // customSelectedOptionElement.setAttribute('aria-label', `Trier par ${selectElement.options[selectElement.selectedIndex].textContent}`)
        
    }


    /* Tri les créations en fonction du critère de tri
        Paramètres :
            - les créations
            - Un critère de tri
        Renvoie :
            - la liste des créations triée
    */     
    async function getMediasorted(medias, sortType) {
    
        const mediaSortField = sortType === 'popularity' ? 'likes' : sortType,
            returnValue = sortType === 'title' ? -1 : 1
        
        const mediasSorted = await medias.sort((a, b) =>  a[mediaSortField] < b[mediaSortField] ? returnValue : -returnValue)
    
        return mediasSorted
    
    }

    return { init, getMediasorted }
}


/* Crée l'élément qui servira de bouton pour ouvrir la liste de choix et qui présente le choix retenu 
    Paramètres :
        - L'élément Select native sur lequel les choix de tri sont basés
    Renvoie :
        - L'élément, correspondant à un bouton
*/
function createSelectedOptionElement(selectElement) {

    const element = document.createElement('div')
    // L'élément est une copie de l'option sélectionnée dans l'élément select
    element.innerHTML = selectElement.options[selectElement.selectedIndex].innerHTML

    element.classList.add('custom-select__option', 'custom-select__option--selected')
    // Tabindex car on veut que les SR atterrissent sur le bouton pour être informé qu'ils ont une liste de choix
    element.setAttribute("tabindex", "0")
    element.setAttribute("role", "listbox")
    element.setAttribute("aria-owns", "custom-options")
    element.setAttribute("aria-haspopup", "listbox")
    element.setAttribute("aria-expanded", "false")
    element.setAttribute("aria-labelledby", "sort-label")
    
    return element 
}


/* Crée l'élément qui regroupe les choix de tri possibles. 
    Paramètres :
        - Aucun
    Renvoie :
        - L'élément, correspondant à une liste d'options
*/
function createCustomOptions() {
    const element = document.createElement('div')
    element.classList.add('custom-select__options', 'custom-select__options--hidden')
    element.setAttribute('id', "custom-options")    
    element.setAttribute('role', "listbox")    
    element.setAttribute('aria-expanded', "false")    
    element.setAttribute('aria-labelledby', "sort-label")    
    element.setAttribute('tabindex', "-1")    

    return element 
}


/* Crée le custom select.
    Paramètres :
        - Le Select natif
        - le bouton 
    Renvoie :
        - L'élément, correspondant à une liste d'options
*/
function createCustomSelect(customSelectedOptionElement) {
    const element = document.querySelector('.custom-select')
    element.appendChild(customSelectedOptionElement)

    return element 
}


/* Crée un élément contenant une valeur de tri 
    Paramètres :
        - La position de la valeur dans la liste de valeurs possibles
    Renvoie :
        - L'élément, correspondant à une option du custom select
*/
function createCustomOption(index) {
    const element = document.createElement('div')
    element.classList.add('custom-select__option', 'custom-select__option--hidden')
    // Tabindex nécessaire pour activer l'élément si l'utilisateur utilise les flèches directionnelles
    element.setAttribute("tabindex", "-1")
    element.setAttribute('role', 'option')
    element.setAttribute('aria-selected', 'false')
    element.setAttribute('id', `option-${index}`) 
    
    return element
}


export default sorter