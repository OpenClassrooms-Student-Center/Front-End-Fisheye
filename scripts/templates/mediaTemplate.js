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
// implementing likes
let likeParagraph=document.createElement('p');
let FullHeart=document.createElement('em');
FullHeart.style.display='none';
let EmptyHeart=document.createElement('em');
const HeartBox=document.createElement('checkbox');
FullHeart.setAttribute('class', 'fa-heart fa-solid');
EmptyHeart.setAttribute('class','fa-heart fa-regular ');
HeartBox.appendChild(FullHeart);
HeartBox.appendChild(EmptyHeart);
const mediaLikesClone=mediaElement.likes;
likeParagraph.textContent=mediaElement.likes;
mediaDataSection.appendChild(likeParagraph);
mediaDataSection.appendChild(HeartBox);


//preparing eventListener
HeartBox.addEventListener('click',function(){ 

    if(mediaElement.likes==mediaLikesClone)
    {mediaElement.likes++; 
     FullHeart.style.display='flex';
     EmptyHeart.style.display='none';

likeParagraph.textContent=mediaElement.likes;}
    else{ mediaElement.likes--; 
        likeParagraph.textContent=mediaElement.likes;
        FullHeart.style.display='none';
        EmptyHeart.style.display='flex';}})


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