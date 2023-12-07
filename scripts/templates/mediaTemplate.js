export default function MediaTemplate(photographer, media ){
    let mediaArticle=document.createElement('article');
if(media.image){

let visualSection=document.createElement('section');
visualSection.setAttribute('class','visualSection');
let img=document.createElement('img');
img.setAttribute('src',`assets/media/${photographer[0].name.substr(0, photographer[0].name.indexOf(' '))}/${media.image}`)
img.setAttribute('alt',`${media.title}`);
img.setAttribute("role","img");
img.setAttribute('class','mediaImg');
visualSection.appendChild(img);
let mediaDataSection=document.createElement('section');
mediaArticle.appendChild(visualSection);
mediaArticle.appendChild(mediaDataSection);
}
else{

let visualSection=document.createElement('section');
visualSection.setAttribute('class','visualSection');
let video=document.createElement('video');
video.setAttribute('src',`assets/media/${photographer[0].name.substr(0, photographer[0].name.indexOf(' '))}/${media.video}`)
video.setAttribute('alt',`${media.title}`);
video.setAttribute('class','mediaVideo');
visualSection.appendChild(video);
let mediaDataSection=document.createElement('section');
mediaArticle.appendChild(visualSection);
mediaArticle.appendChild(mediaDataSection);
}
return(mediaArticle)
}