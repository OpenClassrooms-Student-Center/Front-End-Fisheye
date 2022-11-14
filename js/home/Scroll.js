'use strict';
/////////////////////////////////////////

export default class Scroll {
    // Retrieve the user's position, to bring them back to the top of the page
    scrollButton() {
        window.addEventListener("scroll", () => {
            let button = document.getElementById("main-photographers-link");
            let y = window.scrollY;

            if (y >= 130) {
                button.style.display = "block";
            } else {
                button.style.display = "none";
            }
        });
    }
}
