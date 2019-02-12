export default class Search {
    constructor(topic, page) {
        this.topic = topic,
            this.page = page

    }

    async searchNews() {
        try {
            let result = await fetch(`https://newsapi.org/v2/everything?q=${this.topic}&page=${this.page}&apiKey=f91802ab95c647b89548b25e8fdf1b05`);
            result = await result.json();
            
            this.results = result.articles;

        } catch (error) {
            console.log(error)
        }

    }
}