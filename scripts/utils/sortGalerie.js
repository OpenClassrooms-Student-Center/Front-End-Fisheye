/*structure media.json{
			"id": nb,
			"photographerId": nb,
			"title": string,
			"image": string url,
          **or "video":  string url,
			"likes": nb,
			"date": string format yyyy-mm-dd,
			"price": nb
		},*/
let artistFirstName="Mimi";
let subGalerie=[];
let contentPath=""

function photographerFactory(data) {
    const { id, photographerId, title, image, video, likes, date, price_unit} = data;
    if (data.hasOwnProperty('image')){
        contentPath = `./assets/photographers/${artistFirstName}/${image}`
    }
    else if (data.hasOwnProperty('video')){
        contentPath = `./assets/photographers/${artistFirstName}/${video}`
    }
    else {contentPath ="blank"}
                
              
            function getUserCardDOM() {
                const articleGalerie = document.createElement( 'article' );   
                articleGalerie.setAttribute("class", "content_card");
                articleGalerie.setAttribute("aria-label", `galerie de ${artistFirstName}`);
        
                const leftDiv = document.createElement( 'div' );
                leftDiv.setAttribute( 'class', 'leftDiv');
                articleGalerie.appendChild(leftDiv);
                
                const rightDiv = document.createElement( 'div' );
                rightDiv.setAttribute( 'class', 'rightDiv');
                articleGalerie.appendChild(rightDiv);
                
                if (data.hasOwnProperty('image')){
                    const artistImg = document.createElement( 'img' );
                    artistImg.setAttribute( 'src', contentPath);  
                    articleGalerie.appendChild(artistImg);  
                }
                else if (data.hasOwnProperty('video')){
                    const artistVideo = document.createElement( 'video' );
                    artistVideo.setAttribute( 'width', '500px');  
                    artistVideo.setAttribute( 'height', '500px');  
                    articleGalerie.appendChild(artistVideo);
                    const videoSource = document.createElement( 'source' );
                    videoSource.setAttribute( 'src', contentPath);
                    artistVideo.appendChild(videoSource);
                }
                
                const mediaTitle = document.createElement( 'div' );
                mediaTitle.setAttribute( 'class', 'media-title');
                mediaTitle.textContent = title;
                      
                const mediaLikes = document.createElement( 'div' );
                mediaLikes.setAttribute( 'class', 'likes');
                mediaLikes.textContent = likes.toString()+'<3';
                
                leftDiv.appendChild(mediaTitle);
                rightDiv.appendChild(mediaLikes);
                
        
                return (articleGalerie);
            }
            return { artistFirstName, artistFirstName, getUserCardDOM }
        }
                

async function displayData(_subGalerie) {
    const galerieSection = document.querySelector(".galerie-section");
    
    _subGalerie.forEach((medium) => {
            const mediaCard = photographerFactory(medium);
            const userCardDOM = mediaCard.getUserCardDOM();
            galerieSection.appendChild(userCardDOM);
            
     });
};
                
        // Récupère les datas du photographe choisi et initialise l'affichage
const artist=parseInt(window.location.search.slice(-4,));
console.log(artist);


fetch('./data/photographers.json')
    .then(
        function(response) {
        if (response.status !== 200) {
            console.log('Problem. Status Code: ' +response.status);
            return;
        }
                
        response.json().then(function(data) {
            artistFirstName=data.photographers[artist].name.split(' ')[0];
            alert(artistFirstName);
            const artistNb=data.photographers[artist].id;
            console.log(artistNb);            
            for (let i=0; i<data.media.length; i++){
                if(data.media[i].photographerId==artistNb){
                    subGalerie.push(data.media[i]);
                    }    
            }
            console.log(subGalerie);                  
            displayData(subGalerie); 
        });
    })
    .catch(function(err) {
        console.log('Fetch Error :-S', err);
    });