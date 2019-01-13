
export const renderLike = (title,urlImage,url) => {
    const newLike = `
        <div class ="liked" href="${url}"> 
            <div class ="likedImg"> 
                <img src="${urlImage}">
                <img src="../img/close.png" class="closeImg" data-url="${url}"> 
            </div>
            <p> ${title} </p>
        </div> 
    `
    document.querySelector(".sideArt").insertAdjacentHTML('afterbegin',newLike);

}
 export const delLike = (url) => {
      const el = document.querySelector(`.liked[href*="${url}"]`);
      if (el) el.remove();

    
 }