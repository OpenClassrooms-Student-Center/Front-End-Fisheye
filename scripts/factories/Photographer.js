class PhotographerFactory {
    constructor(data) {
        this._data = new PhotographerModel(data)
        return new PhotographerTemplate(this._data)
    }
}
