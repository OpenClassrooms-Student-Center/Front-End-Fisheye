//Mettre le code JavaScript lié à la page photographer.html
// function mediaFactory(data) {
//     const {id, photographerId, title, image, video, likes, date, price} = data;

//     const picturePath = `assets/photographers/${photographerId}/${image}`
//     const videoPath = `assets/photographers/${photographerId}/${video}`

    
//     const article = document.createElement( 'article' );
//     article.classList.add('article');
//     article.setAttribute("data-id", data.id);

//     if (image) {
//         const div = document.createElement( 'div' );
//         const img = document.createElement( 'img' );
//         img.setAttribute("src", picturePath);
//         img.alt= ` ${title} `;
//         img.classList.add('mediaImg');
//         article.appendChild(div);
//         div.appendChild(img);
//     } else if (video) {
//         const div = document.createElement( 'div' );
//         const video = document.createElement( 'video' );
//         video.setAttribute("src", videoPath);
//         video.setAttribute("aria-label", title)
//         video.classList.add('mediaVideo');
//         video.setAttribute("controls", true);
//         video.setAttribute("poster", "");
//         article.appendChild(div);
//         div.appendChild(video);
//     }





//     return article;
    
//     // return {photographerId, id, title, image, image, video, date, price, getUserMedia}
// }

// export {mediaFactory};