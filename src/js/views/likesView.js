import{elements} from './base';

export const renderLiked = (title,urlImage,url) => {
    const newLike = `
        <div class ="sideBar__article" href="${url}"> 
        
            <div class="overlay">
                <svg  class="overlay__like">
                    <use xlink:href="/img/Sprite.svg#heart" data-url="${url}" class="article__like-btn&#32;gold"}></use>
                    </svg>
            
                <div class ="overlay__title"> ${title} </div>
            </div>    
            <img src="${urlImage}">
        
        </div> 
    `
    elements.sideBar.insertAdjacentHTML('beforeend',newLike);

}
 export const removeLiked = (url) => {
      const el = document.querySelector(`.liked[href*="${url}"]`);
      if (el) el.remove();

    
 }