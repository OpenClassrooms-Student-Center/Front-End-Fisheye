const filterButton = document.querySelector('#sort')


async function sortPortfolio(medias, sortType) {

    const mediaSortField = sortType === 'popularity' ? 'likes' : sortType
    let mediasSorted = []
console.log(medias)
    mediasSorted = medias.sort((a, b) =>  a[mediaSortField] < b[mediaSortField] ? -1 : 1)
    console.log(mediaSortField)
console.log(mediasSorted)
    // switch(sortType) {

    //     case 'popularity':
    //         mediasSorted = 
    //         break;

    //     case 'title':

    //         mediasSorted = medias.sort((a, b) => (a.likes > b.likes))
    //         break;

    //     case 'date':
    //         mediasSorted = medias.sort((a, b) => (a.date > b.date))
    //         break;
    // }

    return mediasSorted

}

const photographerName = document.querySelector('.presentation__name'),
    medias = document.querySelectorAll('.media__link')

filterButton.addEventListener('change', (e) => {
    
})


export { sortPortfolio }