/**
 * Listens to the filter and returns its value.
 */
document.getElementById('filtres').addEventListener('change', function() {        
    typeSort = this.value;
    sortData();       
    displayImage(data);
});


async function sortData(){
    if (typeSort === "pop"){
        data[1].sort(function(a,b){return a.likes - b.likes});
        data[1].reverse();
    } else if (typeSort === "date"){
        data[1].sort(function(a,b){return a.date - b.date});
        data[1].reverse();
    } else if (typeSort === "titre"){
        data[1].sort((a, b) => a.title.localeCompare(b.title))
    }
}