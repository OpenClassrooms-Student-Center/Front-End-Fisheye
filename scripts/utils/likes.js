import { getPhotographerById } from "../pages/photographer.js";
// cette fonction permet de mettre à jour le nombre total de likes et l'affiche
/**
 * @function afficheTotalLikes
 * @returns {Promise<void>}
 */
export async function afficheTotalLikes() {
    const { medias } = await getPhotographerById();
    const allBtnLike = document.querySelectorAll(".btn__like");
    const likesElement = document.querySelector(".photographer__likes--count");    
    /**
     * @function updateTotalLikes  
     * @returns {number} totalLikes 
     */
    function updateTotalLikes  () {
        const totalLikes = medias.reduce((accumulateur, media) => accumulateur + media._likes, 0);
        likesElement.textContent = `${totalLikes}`;
    };
    // Mettre à jour le nombre total de likes l'appuie sur la touche entrée incrémente et décrémente le nombre de likes
    updateTotalLikes();
    allBtnLike.forEach(btn => {
        btn.addEventListener("click", () => {
            const media = medias.find(media => media._id == btn.dataset.id);
            console.log("media-2", media);
            !btn.classList.contains("liked") ? media._likes++ : media._likes--;
            btn.classList.toggle("liked");
            const likesElement = btn.previousElementSibling;
            likesElement.textContent = `${media._likes}`;            
            updateTotalLikes();                       
        });       
    });    
};