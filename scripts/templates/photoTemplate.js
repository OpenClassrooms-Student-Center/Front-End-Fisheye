 export default function photographerTemplate(data) {
    const  { name,id,city, country,tagline, price, portrait } = data;

    const picture = `assets/photographers/${portrait}`;


    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        article.setAttribute(`aria-label`,` ${name}`)
        const a=document.createElement('a');
        a.setAttribute('class','link');
        a.setAttribute(`aria-label`,`lien vers la page de ${name}`)
        a.setAttribute('href',`photographer.html?id=${id}`)
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        img.setAttribute(`alt`,`photo de ${name }`)
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        const p= document.createElement('p');
        p.setAttribute('class','info');

        const localisation=document.createElement('span');
        localisation.setAttribute('class','localisation');
        localisation.textContent=city+', '+country;

        const tag=document.createElement('span');
        tag.setAttribute('class','tag');
        tag.textContent=tagline;
        const prix=document.createElement('span');
        prix.setAttribute('class','price');
        prix.textContent=`${price}€/jour`;
// creating p

        p.appendChild(localisation);
        p.appendChild(tag);
        p.appendChild(prix);
       

        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(p);
        a.appendChild(article);
     
        return (a);
    }
    return { name, picture, getUserCardDOM }


   
}







    