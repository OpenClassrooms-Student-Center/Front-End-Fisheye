import getCaroussel from "../utils/caroussel.js";

export default async function MediaTemplate(photographer, media , mediaElement){
    let mediaArticle=document.createElement('article');
    mediaArticle.setAttribute('class','mediaArticle');


//implementing mediaDataSection
let mediaDataSection=document.createElement('section');
mediaDataSection.setAttribute("class","mediaDataSection");
mediaDataSection.setAttribute("aria-label","media info");

//implementing name in mediaElementDataSection
const titleParagraph=document.createElement("p");
titleParagraph.textContent=mediaElement.title;
mediaDataSection.appendChild(titleParagraph);
//preparing eventListener
const caroussel=document.getElementById('caroussel');

//implementing media images and videos
let visualSection=document.createElement('section');
visualSection.setAttribute('class','visualSection');
if(mediaElement.image){



let img=document.createElement('img');
img.setAttribute('src',`assets/media/${photographer[0].name.substr(0, photographer[0].name.indexOf(' '))}/${mediaElement.image}`)
img.setAttribute('alt',`image ${mediaElement.title}`);
img.setAttribute("role","img");
img.setAttribute('class','mediaImg');
visualSection.appendChild(img);
mediaArticle.appendChild(visualSection);



}
else{


let video=document.createElement('video');
video.setAttribute('src',`assets/media/${photographer[0].name.substr(0, photographer[0].name.indexOf(' '))}/${mediaElement.video}`)
video.setAttribute('alt',`video ${mediaElement.title}`);
video.setAttribute('class','mediaVideo');
video.setAttribute(`controls`,``);
visualSection.appendChild(video);
mediaArticle.appendChild(visualSection);


}
visualSection.addEventListener('click',function (){getCaroussel(photographer[0],media,mediaElement);})
//adding mediaDataSection to article
mediaArticle.appendChild(mediaDataSection);
return(mediaArticle)
}