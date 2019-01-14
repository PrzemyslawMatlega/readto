import Search from './models/Search';
import * as searchView from './views/searchView';
import Likes from './models/Likes';
import * as likesView from './views/likesView';
import {
    elements
} from './views/base';



export const state = {};

//------------ SEARCH CONTROLER ---------------  

const newSearch = (page) => {

    searchView.clearResult();
    searchView.clearInput();
    searchView.clearButtons();
    searchView.render(state.search.results, page)

}

const ctrlSearch = async (page = 0) => {
    let topic;
    if (page == 0) {
        topic = searchView.getInput();
        if (topic != '') {
            state.search = new Search(topic, page = 1, '');
        }
    } else {
        state.search.page = page;
    }
    await state.search.szukaj();
    newSearch(page);

}


const ctrlSearchTrend = async (tag) => {
    state.search = new Search('', 0, tag);
    await state.search.searchTrend();
    newSearch(0);

}
elements.search.addEventListener('submit', e => {
    e.preventDefault();
    ctrlSearch();

});

// ---------------------------------LIKE CONTROLER------------------------------------

const controlLike = (likeUrl) => {

    const liked = state.search.results.find(el => {
        return el.url == likeUrl
    })

    if (!state.like) state.like = new Likes();

    if (!state.like.isLiked(likeUrl)) {
        state.like.addLike(liked.title, liked.urlToImage, likeUrl);
        // likesView.renderLike(liked.title,liked.urlToImage,likeUrl);
    } else {
        state.like.deleteLike(likeUrl)
        // likesView.delLike(likeUrl);

    }

}

 
const navbarProgres = (progresNum) => {
    if (progresNum<6){

        if( elements.header.classList.contains(`progres-${progresNum+1}`) ){
            elements.header.classList.toggle(`progres-${progresNum+1}`) 
        }
        else{ }
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

// --------------------------EVENT LISTENERS -------------------------------


elements.navbuttons.addEventListener('click', e => {
    const el = e.target.closest('#content__buttons-btn');
    const goToPage = parseInt(el.dataset.goto, 10);
    ctrlSearch(goToPage);

});

// ---------------Scroll hide/show navbar -----------------------------

let scrollPos = 0;

window.addEventListener('scroll', e => {

    if ((document.body.getBoundingClientRect()).top > scrollPos){
        elements.search_main.classList.remove('unvisible')
    }
    else{
        elements.search_main.classList.add('unvisible');
    }

    scrollPos = ((document.body.getBoundingClientRect()).top );


})


// ------------- Sidebar Controler ------------ 

elements.logo.addEventListener('click', () =>{
        if(state.like.likes.length>4){
            
        }

})



// document.querySelector('.fire').addEventListener('click', e => {


//     const add = document.querySelector('.trends')
//     if (add.style.display === "none") {
//         add.style.display = "block";
//         document.querySelector('.fireImg').setAttribute('src','./img/burn.png' )
//     } else {
//         add.style.display = "none";
//         document.querySelector('.fireImg').setAttribute('src','./img/burn-bw.png' )
//     }


// })

// document.querySelector('.trends').addEventListener('click', e => {
//     const tags = e.target.closest('.trend')
//     const tag = tags.dataset.type;
//     ctrlSearchTrend(tag);
// });


// document.querySelector('.openLikes').addEventListener('click', e => {
//     document.getElementById('mySidenav').style.width = "500px";

// });

// document.querySelector('.closeBtn').addEventListener('click', e => {
//     document.getElementById('mySidenav').style.width = "0px";

// });