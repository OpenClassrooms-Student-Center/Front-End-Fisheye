function getSort() {

    const main = document.querySelector("#main");
    main.style.display = "flex";
    main.style.flexDirection = "column";

    const photographHeader = document.querySelector(".photograph-header");
    photographHeader.style.order = "1";
    const photographMedias = document.querySelector(".photograph-medias");
    photographMedias.style.order = "3";

    const sortContainer = document.createElement("div");
    sortContainer.style.order = "2";
    sortContainer.style.display = "flex";
    sortContainer.style.marginLeft ="100px";
    sortContainer.style.borderRadius = "5px";
    sortContainer.style.marginTop = "20px";

    const titleContainer = document.createElement("p");
    titleContainer.textContent = "Trier par";
    titleContainer.style.height = "50px";
    titleContainer.style.width = "80px";
    titleContainer.style.fontSize = "18px";
    titleContainer.style.fontWeight = "bold";
    titleContainer.style.marginRight ="10px";


    const sortList = document.createElement("ul");
    sortList.style.listStyle = "none";

    const popularityBloc = document.createElement("li");
    popularityBloc.textContent = "Popularité";
    popularityBloc.style.fontSize = "18px";
    popularityBloc.style.height = "50px";
    popularityBloc.style.width = "170px";
    popularityBloc.style.lineHeight = "50px";
    popularityBloc.style.background = "#901C1C";
    popularityBloc.style.color = "white";
    popularityBloc.style.cursor = "pointer"; 
    popularityBloc.style.position = "relative";
    popularityBloc.style.paddingLeft = "10px";

    const popularity = document.createElement("p");
    

    const arrowClose = document.createElement("button");
    arrowClose.innerHTML = '<i class="fas fa-chevron-up"></i>';
    arrowClose.style.position = "absolute";
    arrowClose.style.top = "15px";
    arrowClose.style.right = "10px"; 
    arrowClose.style.background = "none";
    arrowClose.style.border = "none";
    arrowClose.style.fontSize = "18px";
    arrowClose.style.color = "white";
    arrowClose.style.cursor = "pointer";

    const date = document.createElement("li");
    date.textContent = "Date";
    date.style.fontSize = "18px";
    date.style.height = "50px";
    date.style.width = "170px";
    date.style.lineHeight = "50px";
    date.style.background = "#901C1C";
    date.style.color = "white";
    date.style.cursor = "pointer";
    date.style.paddingLeft = "10px";
    date.style.display = "none";

    const title = document.createElement("li");
    title.textContent = "Titre";
    title.style.fontSize = "18px";
    title.style.height = "50px";
    title.style.width = "170px";
    title.style.lineHeight = "50px";
    title.style.background = "#901C1C";
    title.style.color = "white";
    title.style.cursor = "pointer";
    title.style.paddingLeft = "10px"; 
    title.style.display = "none";

    popularityBloc.addEventListener("click", () => {
        date.style.display = "block";
        title.style.display = "block";
    })

    arrowClose.addEventListener("click", () => {
        date.style.display = "none";
        title.style.display = "none";
    });  

    


    



    main.appendChild(sortContainer);
    sortContainer.appendChild(titleContainer);
    sortContainer.appendChild(sortList);
    sortList.appendChild(popularityBloc);
    popularityBloc.appendChild(popularity);
    popularityBloc.appendChild(arrowClose);
    sortList.appendChild(date);
    sortList.appendChild(title);
};

getSort();