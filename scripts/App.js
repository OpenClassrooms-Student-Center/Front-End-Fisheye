class App {
    constructor (){
        this.$photographerWrapper = document.querySelector('.photographer_section')
        this.$photographerWrapperProfile = document.querySelector('.photograph-header')
        this.$photographerMedia = document.querySelector('.photograph-content')  
        this.photographerApi = new PhotographerApi('/data/photographers.json')  
    }

    async main(){
        const photographersData = await this.photographerApi.getPhotographers()
        let params = (new URL(document.location)).searchParams
        let idphotograph = params.get('id')
        let url = window.location.href.split("?")
        
        if(url.length > 1){
            console.log('page photographer');
            console.log(idphotograph)
            photographersData.forEach(photographer =>{
                if(photographer.id == idphotograph){
                    const TemplateProfile = new PhotographerProfile(photographer)
                    this.$photographerWrapperProfile.appendChild(TemplateProfile.createPhotographerProfile())
                   
                    const TemplateMedia = new PhotographerMedia(media)
                    this.$photographerMedia.appendChild(TemplateMedia.createPhotographerMedia)
                    
                } 
                
                
                
                
                return true
            })
            
        }else{
            photographersData.forEach(photographer =>{
                const Template = new PhotographerCard(photographer)
                this.$photographerWrapper.appendChild(Template.createPhotographerCard())
                
    
                console.log('homepage');
            })
            
        }
        


        

    }
    
}



const app = new App()
app.main()