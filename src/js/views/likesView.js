import{elements} from './base';

export const renderLiked = (title,urlImage,url) => {
    const newLike = `
        <div class ="sideBar__article" href="${url}"> 
        
            <div class="overlay">
                <div class ="overlay__title"> ${title} </div>
                <a target="_blank" rel="noopener noreferrer" href="${url}"> 
                    <svg  class="overlay__like">
                        <use xlink:href="/img/Sprite.svg#book"}></use>
                    </svg>
                </a>
            </div>    
            <img src="${urlImage}">
        
        </div> 
    `
    elements.sideBar.insertAdjacentHTML('afterbegin',newLike);

}
 export const removeLiked = (url) => {
      const el = document.querySelector(`.sideBar__article[href*="${url}"]`);
      if (el) el.remove();

    
 }

 export const toggleSideBar = () =>{
    elements.sideBar.classList.toggle('fullScreen');
    elements.content__main.classList.toggle('nondisplay');

 }