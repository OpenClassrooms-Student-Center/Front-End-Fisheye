export default async function MediaTemplate(photographer, media ){
    let mediaArticle=document.createElement('article');
    mediaArticle.setAttribute('class','mediaArticle');


//implementing mediaDataSection
let mediaDataSection=document.createElement('section');
mediaDataSection.setAttribute("class","mediaDataSection");

if(media.image){

let visualSection=document.createElement('section');
visualSection.setAttribute('class','visualSection');

let img=document.createElement('img');
img.setAttribute('src',`assets/media/${photographer[0].name.substr(0, photographer[0].name.indexOf(' '))}/${media.image}`)
img.setAttribute('alt',`image ${media.title}`);
img.setAttribute("role","img");
img.setAttribute('class','mediaImg');
visualSection.appendChild(img);
mediaArticle.appendChild(visualSection);


//implementing name in mediaDataSection
const titleParagraph=document.createElement("p");
titleParagraph.textContent=media.title;
mediaDataSection.appendChild(titleParagraph);
mediaArticle.appendChild(mediaDataSection);
}
else{

let visualSection=document.createElement('section');
visualSection.setAttribute('class','visualSection');
let video=document.createElement('video');
video.setAttribute('src',`assets/media/${photographer[0].name.substr(0, photographer[0].name.indexOf(' '))}/${media.video}`)
video.setAttribute('alt',`video ${media.title}`);
video.setAttribute('class','mediaVideo');
video.setAttribute(`controls`,``);
visualSection.appendChild(video);
mediaArticle.appendChild(visualSection);



//implementing name in mediaDataSection
const titleParagraph=document.createElement("p");
titleParagraph.textContent=media.title;
mediaDataSection.appendChild(titleParagraph);
mediaArticle.appendChild(mediaDataSection);

mediaArticle.appendChild(mediaDataSection);
}
return(mediaArticle)
}