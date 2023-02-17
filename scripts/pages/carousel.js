const items = document.getElementById("image_carousel")
console.log("items =>", items)
const nbSlide = items.length
const suivant = document.getElementsByClassName('active')
let count = 0;

export function slideSuivante(){
    items[count].classList.remove('active')
    if(count < nbSlide - 1){
        count++;
    }else{
        count = 0;
    }

    items[count].classList.add('active')
    console.log(count);
}


suivant.addEventListener('click', slideSuivante)
