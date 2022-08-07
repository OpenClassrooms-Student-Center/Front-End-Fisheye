class photographerConstructor {
    constructor(data) {
        this._name = data.name
        this._city = data.city
        this._country = data.country
        this._id = data.id
        this._tagline = data.tagline
  
      }
  
      get name() {
        return this._name
      } 
  
      get city() {
        return this._city
      } 
      
      get country() {
        return this._country
      }
  
      get id() {
        return this._id
      }
  
      get tagline() {
        return this._tagline
      } 
  
  } 
  
  