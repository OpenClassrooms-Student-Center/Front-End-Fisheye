function hydratePresentationFactory(data) {
    const{name, portrait} = data;
    const avatar = `../assets/Sample_Photos/PhotographersID/${portrait}`;
    getHydratingPage();
   
    function getHydratingPage() {
        const templateElm = document.getElementById("photographer__template");
        const page = document.importNode(templateElm.content, true);
        const img = page.querySelector(".photographer__profile");
        img.src = avatar;
        const h1 = page.querySelector(".photographer__name" );
        h1.textContent = name;
        const location = page.querySelector(".photographer__location");
        location.textContent = data.city;
        const quote = page.querySelector(".photographer__quote");
        quote.textContent = data.tagline;
        document.querySelector("#main").appendChild(page);
    }
   
}


export default hydratePresentationFactory
