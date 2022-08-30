/** Function to sort by Likes,Dates or Title */
export function sortByLikes(a, b) {
    if (a.likes > b.likes) {
        return -1
    }
    if (a.likes < b.likes) {
        return 1
    }
    return 0;
}

export function sortByDate(a, b) {
    if (a.date > b.date) {
        return -1
    }
    if (a.date < b.date) {
        return 1
    }
    return 0;
}

export function sortByTitle(a, b) {
    if (a.title < b.title) {
        return -1
    }
    if (a.title > b.title) {
        return 1
    }
    return 0;
}
