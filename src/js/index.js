import Search from './models/Search';
import * as searchView from './views/searchView';
import Likes from './models/Likes';
import * as likesView from './views/likesView';
import { elements } from './views/base';



export const state = {};

//------------ SEARCH CONTROLER ---------------  

const newSearch = (page) => {

    searchView.clear();
    searchView.render(state.search.results, page)

}

const ctrlSearch = async (page = 0, trashClick = false) => {
        let topic;
        if(trashClick){
            await state.search.searchNews();
            newSearch(page);
        }
        else{
            if (page == 0) {
                topic = searchView.getInput();

                if (topic != '') {
                    state.search = new Search(topic, page = 1);
                }
                
            } 
            else {
                state.search.page = page;
            }

            await state.search.searchNews();
            newSearch(page);

        }


}


elements.search.addEventListener('submit', e => {
    e.preventDefault();
    ctrlSearch();
});

// ---------------------------------LIKE CONTROLERS------------------------------------

const controlLike = (likeUrl) => {

    const liked = state.search.results.find(el => {
        return el.url == likeUrl
    })

    if (!state.like) state.like = new Likes();

    if (!state.like.isLiked(likeUrl)) {
        state.like.addLike(liked.title, liked.urlToImage, likeUrl);
        likesView.renderLiked(liked.title,liked.urlToImage,likeUrl);
    } else {
        state.like.deleteLike(likeUrl)
        likesView.removeLiked(likeUrl);

    }

}


 
const navbarProgres = (progresNum) => {
    if (progresNum<6){

        if( elements.header.classList.contains(`progres-${progresNum+1}`) ){
            elements.header.classList.toggle(`progres-${progresNum+1}`) 
        }
        if(progresNum == 5 ){
            elements.header.classList.add(`progres-${progresNum}`) 
            elements.header.classList.remove(`progres-${progresNum-1}`)
            elements.logo.classList.add('shake')
        }
        else{
            elements.logo.classList.remove('shake')
            elements.header.classList.toggle(`progres-${progresNum}`) 
            elements.header.classList.remove(`progres-${progresNum-1}`)
        }
    }
}



elements.content.addEventListener('click', e => {
    let likeUrl = e.target.closest('.article__like')
    likeUrl = likeUrl.dataset.id;
    controlLike(likeUrl);
    searchView.toggleLikeBtn(likeUrl);
    navbarProgres(state.like.likes.length);
    
});
// -------------- Cleaning on trash click ------------
elements.trash.addEventListener('click', e =>{

    state.like.likes.forEach( el =>{
        likesView.removeLiked(el.url);
    });

    delete state.like;
    ctrlSearch(1, true);
    elements.header.classList.remove(`progres-5`)    
    likesView.toggleSideBar();

})

// --------------------------Pagination-------------------------------


elements.navbuttons.addEventListener('click', e => {
    const el = e.target.closest('#content__buttons-btn');
    const goToPage = parseInt(el.dataset.goto, 10);
    ctrlSearch(goToPage);

});

// ---------------Scroll hide/show navbar -----------------------------

let scrollPos = 0;

window.addEventListener('scroll', () => {

    if (!elements.sideBar.classList.contains('fullScreen')){
        if ((document.body.getBoundingClientRect()).top > scrollPos){
            elements.search_main.classList.remove('unvisible')
        }
        else{
            elements.search_main.classList.add('unvisible');
        }
    
        scrollPos = ((document.body.getBoundingClientRect()).top );
    }


})

// ------------- Sidebar Controler ------------ 

elements.logo.addEventListener('click', () =>{
        if(state.like.likes.length>4){
            elements.search_main.classList.add('unvisible');
            likesView.toggleSideBar();
        }

})

