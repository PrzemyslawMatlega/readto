import{elements} from './base';

export const renderLiked = (title,urlImage,url) => {
    const newLike = `
        <div class ="sideBar__article" href="${url}"> 
        
            <div class ="sideBar__article-main"> 
                <img src="${urlImage}">
                <svg>
                <use xlink:href="/img/Sprite.svg#heart" data-url="${url}" class="article__like-btn&#32;gold"}></use>
                </svg>
            </div>
            <div class ="sideBar__article-text"> ${title} </div>
        
        </div> 
    `
    elements.sideBar.insertAdjacentHTML('beforeend',newLike);

}
 export const removeLiked = (url) => {
      const el = document.querySelector(`.liked[href*="${url}"]`);
      if (el) el.remove();

    
 }