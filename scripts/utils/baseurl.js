/**
 * Singleton
 */
class BaseURL {
    constructor(){
        if(window.location.href[window.location.href.length -1] === '/'){
            BaseURL.base = window.location.href
        }
        else {

            BaseURL.base = window.location.href
            let queueURL = BaseURL.base.substring (BaseURL.base.lastIndexOf( "/" )+1 );
            BaseURL.base = BaseURL.base.replace(queueURL, "")
        }
    }
}