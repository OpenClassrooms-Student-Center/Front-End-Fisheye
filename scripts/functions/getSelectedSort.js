

export default function getSelectedSort(data) {
    const selectedSort = document.querySelector("#select").value
    console.log(selectedSort)
    sortMedia(data)
};

function sortMedia(media) {

    console.table(media)
    let sortOption = Array.from(document.querySelector("select"))
    console.log(sortOption)
    let sortMedia = []
    sortOption.forEach((option, index) => { 
        console.log(option)
        console.log(index)
        if (index === 0) {
            sortMedia = media.sort((a,b) => {
                return b.likes - a.likes
            })
        } else if (index === 1) {
            sortMedia = media.sort((a,b) => {
                return new Date(a.date).valueOf() - new Date(b.date).valueOf()
            })
        } else if (index === 2) {
            sortMedia = media.sort((a,b) => {
                if (a.title.toLowerCase() < b.title.toLowerCase()) {
                    return -1
                } else  if (a.title.toLowerCase() > b.title.toLowerCase()) {
                    return 1
                }
            })
        }
        
    })
    console.log(sortMedia)
    return sortMedia

 }