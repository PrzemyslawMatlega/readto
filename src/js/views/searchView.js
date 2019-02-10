import { state } from '../index';
import {elements} from './base';
import Likes from '../models/Likes';


export const toggleLikeBtn = (likeUrl) => {
  // const isL = state.like.isLiked(likeUrl);
  // const iconString = isL ? 'like2' : 'like';
  
  document.getElementById(`${likeUrl}`).classList.toggle('gold');
};

const renderArticle = (article) => {
  if (article.urlToImage == null || (article.urlToImage.slice(0, 2) != 'ht')) {
    article.urlToImage = `./img/news-${Math.ceil(Math.random() * 3)}.jpg`;
  }
  
  if (article.description == null) {
    article.description = '';
  }
  if (!state.like) state.like = new Likes();
  
  const isL = state.like.isLiked(article.url);

  const art = `
  
      <div class ="article">
        <div class = "article__photo">   
           <img src="${article.urlToImage}" class="article__photo-img" alt="">
        </div> 
        <div class ="article__content">
        <div class="article__title" href="${article.url}">
            <h2> ${article.title}</h2>
        </div>
        <div class="article__desc"> 
        ${article.description}
        </div>       
        <div class="article__like" data-id=${article.url}>      
            <svg>
               <use xlink:href="/img/Sprite.svg#heart" id="${article.url}" class=${isL ?'article__like-btn&#32;gold': 'article__like-btn'}></use>
            </svg>
        </div>       
      </div>
      </div>
        
        `;
  elements.content.insertAdjacentHTML('beforeend', art);
};

const createButton = (type, page) => `
        <svg id="content__buttons-btn" class="content__buttons-${type === 'prev' ? 'prev' : 'next'}" data-goto='${type === 'prev' ? page - 1 : page + 1}'>
           <use xlink:href="/img/Sprite.svg#${type === 'prev' ? 'sketch-1' : 'sketch'}"}></use>
        </svg>



`;

const renderButtons = (page) => {
  let buttons;
  
  if (page == 1) {
    buttons = `
    ${createButton('next', page)}

    `;
  } else {
    buttons = `
    ${createButton('prev', page)}
    ${createButton('next', page)}
    `;
  }
  
  elements.navbuttons.insertAdjacentHTML('beforeend', buttons);
};


export const render = (article, page) => {
  article.slice(0,12).forEach(renderArticle);

  if (page != 0) {
    renderButtons(page);
  }
};

export const getInput = () => elements.searchField.value;

export const clearInput = () => {
  elements.searchField.value = ''
};

export const clearResult = () => {
  elements.content.innerHTML = '';
};

export const clearButtons = ()=>{
  elements.navbuttons.innerHTML='';
}