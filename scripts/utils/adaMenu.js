//navigation clavier du menu de selection de tri des media
function adaMenu(){
    const sortingMenu=document.getElementById("sortingMenu");       
    const option1=document.getElementById("option1");
    const option2=document.getElementById("option2");
    const option3=document.getElementById("option3");
    const openMenuButton=document.getElementById("openMenuButton");
    var focusedOption="";
    document.addEventListener('keydown',(e)=>{
        const active=document.activeElement;
        //si on est dans le menu, on écoute les fleches
        if(active==sortingMenu||active==option1||active==option2||active==option3){
            if(e.keyCode==38){//up
                e.preventDefault();
                if (focusedOption=="" || focusedOption==option2){
                    option1.focus();
                    focusedOption=option1;
                }else if(focusedOption==option1){
                    option3.focus();
                    focusedOption=option3;
                }else if(focusedOption==option3){
                    option2.focus();
                    focusedOption=option2;
                }else{ 
                    null
                }
            }else if (e.keyCode==40 ){//down
                e.preventDefault();
                if (focusedOption=="" || focusedOption==option3){
                    option1.focus();
                    focusedOption=option1;
                }else if(focusedOption==option1){
                    option2.focus();
                    focusedOption=option2;
                }else if(focusedOption==option2){
                    option3.focus();
                    focusedOption=option3;
                }else{ 
                    null
                }
            }else if (e.keyCode==9){
                closeMenu();
            };
        //si on est sur le bouton du menu on écoute "entrer"
        }else if (e.keyCode === 13 && document.activeElement==openMenuButton) {
            e.preventDefault();
            document.activeElement.click();
        }
    })  
}
