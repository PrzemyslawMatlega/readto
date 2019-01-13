
 
 export default class Search{
    constructor(topic, page, tag){
        this.topic = topic,
        this.page = page,
        this.tag = tag
    }
    
        async szukaj() {
            try{
            let result = await fetch(`https://newsapi.org/v2/everything?q=${this.topic}&page=${this.page}&apiKey=f91802ab95c647b89548b25e8fdf1b05`);
            result = await result.json();
            this.results = result.articles;
    
        }
        catch(error){       
            console.log(error)
        } 
        
    }

    async searchTrend() {
        try{
        let result = await fetch(`https://newsapi.org/v2/top-headlines?category=${this.tag}&country=us&apiKey=f91802ab95c647b89548b25e8fdf1b05`);
        result = await result.json();
        this.results = result.articles;

    }
    catch(error){       
        console.log(error)
    }
    
}


    
}
 
