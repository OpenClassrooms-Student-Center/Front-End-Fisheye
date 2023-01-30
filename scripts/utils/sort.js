async function sortPortfolio(medias, sortType) {

    const mediaSortField = sortType === 'popularity' ? 'likes' : sortType,
        returnValue = sortType === 'title' ? -1 : 1
    
    const mediasSorted = await medias.sort((a, b) =>  a[mediaSortField] < b[mediaSortField] ? returnValue : -returnValue)

    return mediasSorted

}





export { sortPortfolio }