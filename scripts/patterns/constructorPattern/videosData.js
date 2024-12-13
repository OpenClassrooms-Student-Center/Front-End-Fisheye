import mediaData from "./mediaData.js";

export default class videosData extends  mediaData{
        constructor(data){
           super(data);
            this._video = data.video                     
    }
}