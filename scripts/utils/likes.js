import { getPhotographerById } from "../pages/photographer.js";

export async function afficheTotalLikes() {
    const { medias } = await getPhotographerById();
    const allBtnLike = document.querySelectorAll(".btn__like");
    const likesElement = document.querySelector(".photographer__likes--count");

    
    const updateTotalLikes = () => {
        const totalLikes = medias.reduce((accumulateur, media) => accumulateur + media._likes, 0);
        likesElement.textContent = `${totalLikes}`;
    };
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