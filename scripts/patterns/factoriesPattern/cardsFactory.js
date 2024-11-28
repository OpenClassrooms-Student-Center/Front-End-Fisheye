class cardFactory {
    createCard(data) {
        const card = new Card(data)

        // Création du HTML
        const cardSection = document.createElement ('section')
        //lien vers la page du photographe
        const cardLink = document.createElement ('a')
        const cardPhotographerName = document.createElement("h2")
        //Description et présentation du photographe Nolink
        const descriptionContainer = document.createAttribute('div')
        const photographeLocation = document.createElement('h3')
        const taglinePhotographe = document.createElement('h4')
        const photographePrice = document.createElement('p')


    }
}