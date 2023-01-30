const filterButton = document.querySelector('#sort')


async function sortPortfolio(medias, sortType) {

    const mediaSortField = sortType === 'popularity' ? 'likes' : sortType,
        returnValue = sortType === 'title' ? -1 : 1
    
    const mediasSorted = await medias.sort((a, b) =>  a[mediaSortField] < b[mediaSortField] ? returnValue : -returnValue)

    return mediasSorted

}

const photographerName = document.querySelector('.presentation__name'),
    medias = document.querySelectorAll('.media__link')

filterButton.addEventListener('change', (e) => {
    
})


export { sortPortfolio }