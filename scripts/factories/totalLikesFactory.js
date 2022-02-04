function totalLikesFactory() { 

    const allLikes = document.querySelectorAll(".numberOfLikes");
   
        function getTotalLikes() {

            const totalLikesContainer               = document.querySelector(".totalLikesContainer");
            const totalLikes                        = document.createElement("input");
            const heart                             = document.createElement("label");

            totalLikesContainer.style.position      = "fixed";
            totalLikesContainer.style.bottom        = "0";
            totalLikesContainer.style.right         = "170px";    
            totalLikesContainer.style.background    = "#D88876";
        
            totalLikes.style.fontSize               = "20px";
            totalLikes.style.height                 = "100px";
            totalLikes.style.width                  = "100px";
            totalLikes.classList.add("totalCounter");
            totalLikes.style.height                 = "50px";
            totalLikes.style.border                 = "none";
            totalLikes.style.width                  = "55px"; 
            totalLikes.style.fontSize               = "24px";
            totalLikes.style.background             = "#D88876";
            totalLikes.style.paddingLeft            = "20px";

            heart.innerHTML                         = '<i class="fas fa-heart"></i>';
            heart.style.fontSize                    = "24px";

            totalLikesContainer.appendChild(totalLikes);
            totalLikesContainer.appendChild(heart);

            let totalCounter = document.querySelector(".totalCounter");
            let allMyLikes = allLikes.length;
            total = 0;

            // Compteur de tous les likes 
            for (let i = 0; i < allMyLikes; ++i) {
                NewNumber = Number(allLikes[i].value);
                total += NewNumber;
            };

            totalCounter.value = total ; 

            // Correction d'un beug d'affichage
            totalLikesContainer.firstElementChild.classList.add('remove');
             
            if (totalLikesContainer.firstElementChild.classList.contains("remove")) {
                const child = totalLikesContainer.firstElementChild ;
                child.style.display = "block";
                child.nextSibling.style.display = "block";
                totalLikesContainer.style.display = "flex";
                heart.style.lineHeight = "50px"; 
                heart.style.paddingRight = "10px";
            }
        };    

    return { getTotalLikes }; 
    
};