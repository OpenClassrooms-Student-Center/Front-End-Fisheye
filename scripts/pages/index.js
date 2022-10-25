// -------------------------------- //
// ---> Fichier de lancement <--- //

import { Photographer } from '../constructor/photographerModel.js'
import { PhotographersApi } from '../Api/api.js'


class AppFactory {
    constructor() {
        this.Api = new PhotographersApi("data/photographers.json")
    }

    async init() {
        // on recupere tous les photographes
        const data = await this.Api.getAllPhotgraphers()
        console.log(data);
        // selectionne l element parent
        const photographersSection = document.querySelector(".photographer_section")
        // on fabrique l array de photographes
        let photographers = data.map(photographer => new Photographer(photographer))
        console.log(photographers)
        // render template 
        let forIndex = ''
        let title = ''
        photographers.forEach(photographer => {
            console.log(photographer);
            forIndex += photographer.getUserCardDOM()
        })
        photographersSection.insertAdjacentHTML('beforeend', forIndex)

    }

}

const app = new AppFactory()
app.init()





