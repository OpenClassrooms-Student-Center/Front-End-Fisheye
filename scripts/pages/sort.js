function getSortFactory() {

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
    arrowClose.innerHTML = '<i class="fas fa-chevron-down"></i>';
    arrowClose.style.position = "absolute";
    arrowClose.style.top = "15px";
    arrowClose.style.right = "10px"; 
    arrowClose.style.background = "none";
    arrowClose.style.border = "none";
    arrowClose.style.fontSize = "18px";
    arrowClose.style.color = "white";
    arrowClose.style.cursor = "pointer";

    const dateSort = document.createElement("li");
    dateSort.textContent = "Date";
    dateSort.style.fontSize = "18px";
    dateSort.style.height = "50px";
    dateSort.style.width = "170px";
    dateSort.style.lineHeight = "50px";
    dateSort.style.background = "#901C1C";
    dateSort.style.color = "white";
    dateSort.style.cursor = "pointer";
    dateSort.style.paddingLeft = "10px";
    dateSort.style.display = "none";

    const titleSort = document.createElement("li");
    titleSort.textContent = "Titre";
    titleSort.style.fontSize = "18px";
    titleSort.style.height = "50px";
    titleSort.style.width = "170px";
    titleSort.style.lineHeight = "50px";
    titleSort.style.background = "#901C1C";
    titleSort.style.color = "white";
    titleSort.style.cursor = "pointer";
    titleSort.style.paddingLeft = "10px"; 
    titleSort.style.display = "none";

    function closeSort() {
        arrowClose.addEventListener("click", () => {
            dateSort.style.display = "none";
            titleSort.style.display = "none";
        })
    };

    if (dateSort.style.display = "none" , titleSort.style.display = "none") {
        popularityBloc.addEventListener("mouseover", () => {
            dateSort.style.display = "block";
            titleSort.style.display = "block";
            closeSort();
        })
    };

    titleSort.addEventListener("click", () => {
        titleSort.style.background = "green";
    });

   


    main.appendChild(sortContainer);
    sortContainer.appendChild(titleContainer);
    sortContainer.appendChild(sortList);
    sortList.appendChild(popularityBloc);
    popularityBloc.appendChild(popularity);
    popularityBloc.appendChild(arrowClose);
    sortList.appendChild(dateSort);
    sortList.appendChild(titleSort);

};

getSortFactory();