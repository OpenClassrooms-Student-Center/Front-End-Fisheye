// --------------- FICHIER REGROUPANT DES FONCTIONNALITES GENERIQUES UTILISEES AUTRE PART --------------- 

const genericUtils = {
    
    /* Encloisonne le focus dans le modal
        Paramètres :
            - Les éléments focusables du contenant
            - Le premier élément sur lequel doit porter le focus
            - Le dernier élément sur lequel doit porter le focus
        Renvoie :
            - Rien
    */
    
    trapFocusOnModal: function(focusableElements, firstElementToFocus, lastElementToFocus) {
        
        // Tous les éléments focusables
        
        const focusableElementsArray = Array.from(focusableElements),
            positionFirstElementToFocus = focusableElementsArray.indexOf(firstElementToFocus),
            positionLastElementToFocus = focusableElementsArray.indexOf(lastElementToFocus)
    
        const firstFocusableElement = focusableElementsArray[0],
            lastFocusableElement = focusableElementsArray[focusableElementsArray.length-1];
  
        document.addEventListener('keydown', function(e) {
    
            const keyName = e.keyCode ? e.keyCode : e.key

            /* L'ensemble du code ci-dessus permet de bloquer le focus dans le modal
            Pour cela il faut boucler autour des éléments, 
            c'est à dire lorsque le focus est sur le dernier focus et l'utilisateur navigue vers le prochain focus il est redirigé vers le premier focus
            Et inversement. On va donc ici chercher à capter les évènement où le curseur est sur l'une des extrémités. 
            Les premier (FP) et dernier focus (FD) que nous voulons peuvent ne pas suivre l'ordre de disposition des éléments. 
            Il faut prendre aussi ces scénarios en considération
            On considère que seuls le premier et le deuxième focus peuvent différer de l'ordre normal.
            Pour une approche plus complète, il faudrait donner un ordre de focus à chaque élément focusable
            */            
            if ( keyName === 'Tab' || keyName === 9 ) {
                const activeElement = document.activeElement,
                positionActiveElement = focusableElementsArray.indexOf(activeElement)
    
                let elementToFocus;
                if ( e.shiftKey ) {
    
                    if (activeElement === firstElementToFocus) {
                    // L'élement actif est FP
                    // La navigation inverse doit sélectionner l'élément arrivant juste après, donc FD
                        elementToFocus = lastElementToFocus
    
                    } else if (firstElementToFocus !== firstFocusableElement) {
                    // Le premier élément focusable est différent de FP
    
                        if (activeElement === firstFocusableElement) {
                        // L'élément actif est sur le premier élément focusable. Cet élément est désormais le 2ème focus car FP a été défini
                        // La navigation en arrière peut donc continuer jusqu'à FP 
                            elementToFocus = firstElementToFocus
        
                        } else if (positionActiveElement === positionFirstElementToFocus + 1) {
                        // L'élément actif est juste après FP dans l'ordre d'apparition du DOM
                        // Comme FP doit être le dernier à recevoir le focus (dans le sens d'une navigation en arrière), on saute FP en focusant l'élément juste avant lui
                            elementToFocus = focusableElementsArray[positionFirstElementToFocus-1]
                        }
    
                    } else if (lastElementToFocus !== lastFocusableElement) {
                    // FD est différent du dernier élément focusable
    
                        if (activeElement === lastElementToFocus) {
                        // L'élement actif est FD
                        // La navigation inverse doit sélectionner l'élément arrivant juste avant, il s'agit donc du dernier élément focusable
                        // Qui est désormais l'avant-dernier car FD désigné comme dernier focus
                            elementToFocus = lastFocusableElement
    
                        } else if (positionActiveElement === positionLastElementToFocus + 1) {
                        // L'élément actif est juste après FD dans l'ordre d'apparition du DOM
                        // Comme FD doit être le premier à recevoir le focus (dans le sens d'une navigation en arrière), on saute FD en focusant l'élément juste avant lui                        
                            elementToFocus = focusableElementsArray[positionLastElementToFocus-1]
                        }
    
                    } 
        
                } else {
                // Schéma de réfléxion similaire mais dans le sens opposé de la navigation

                    if (activeElement === lastElementToFocus) {
                    // L'élément actuel est le dernier élément focusable, on repart donc à partir du premier élément focusable
                        elementToFocus = firstElementToFocus   
    
                    } else if (lastElementToFocus !== lastFocusableElement) {
    
                        if (activeElement === lastFocusableElement) {
                            elementToFocus = lastElementToFocus
    
                        } else if (positionActiveElement === positionLastElementToFocus - 1) {
                            elementToFocus = focusableElementsArray[positionLastElementToFocus+1]
                        }
    
                    } else if (firstElementToFocus !== firstFocusableElement) {
    
                        if (activeElement === firstElementToFocus) {
                            elementToFocus = firstFocusableElement
    
                        } else if (positionActiveElement === positionFirstElementToFocus - 1) {
                            elementToFocus = focusableElementsArray[positionFirstElementToFocus+1]
                        }           
                    }
                }
    
                if (elementToFocus) {
                // Une des conditions ci-dessus a été réalisée
                    elementToFocus.focus()         
                    e.preventDefault()
                }
            }
    
        });
 
        firstElementToFocus.focus()
    }
}

export default genericUtils