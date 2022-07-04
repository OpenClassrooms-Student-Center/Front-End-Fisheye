export { Sorter }

class Sorter {
    constructor(media, sorter) {
        this.media = media
        this.sorter = sorter
    }

    // Renvoie un tableau de media correspondant à la valeur du sorter
    mediaSorted() {
        if (this.sorter === 'like') {
            return Array.from(this.media).sort((a, b) => b.likes - a.likes)
        } else if (this.sorter === 'date') {
            return Array.from(this.media).sort(
                (a, b) => new Date(b.date) - new Date(a.date)
            )
        } else if (this.sorter === 'title') {
            return Array.from(this.media).sort((a, b) =>
                a.title.localeCompare(b.title)
            )
        } else {
            throw new Error('Unknown type format')
        }
    }
}
