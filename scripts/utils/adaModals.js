//navigation au clavier dans les modales
function adaCompliant(modal){
    if (modal.style.display=="none"){return};
    //blocage du tab dans la modale
    document.addEventListener('keydown',(e)=>{
        if(e.keyCode==27){
            closeModal()
            closeCarousel()
        }
    })
    const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const focusableContent=modal.querySelectorAll(focusableElements);
    const firstFocusableElement=focusableContent[0];
    const lastFocusableElement=focusableContent[focusableContent.length-1];
    document.addEventListener('keydown',(e)=>{
        if (e.keyCode!==9){
            return;
        }else if (e.shiftKey){//pour un shift+tab
            if(document.activeElement==firstFocusableElement){
                lastFocusableElement.focus();
                e.preventDefault();
            }
        }else { //pour un tab
            if(document.activeElement==lastFocusableElement){
                firstFocusableElement.focus();
                e.preventDefault();
            }
        }
    })
    firstFocusableElement.focus();
}

