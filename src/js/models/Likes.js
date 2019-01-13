export default class Likes {
    constructor(likes= []) {
        this.likes = likes;

    }

addLike(title,img,url){
        const like = {title,img,url};
        this.likes.push(like);
        console.log(this);

}

deleteLike(url){

        const index = this.likes.findIndex(el=>el.url ===url);
        console.log(index);
        this.likes.splice(index,1);
}

isLiked(url){
    return this.likes.findIndex(el => el.url=== url) !== -1; 

}

}