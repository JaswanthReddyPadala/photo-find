var accessKey = 'yFMKPaTXKn2X2qOyHeTuwyCXqeAj_Xx7KJLnIeXGGOM';
//Xg9iCCp7u4viMa-tXn2fuobt7YPL_S_TOKpw-XfpnEQ
// yFMKPaTXKn2X2qOyHeTuwyCXqeAj_Xx7KJLnIeXGGOM
var searchUrl = `https://api.unsplash.com/search/photos?client_id=${accessKey}`; 
var featuredUrl = `https://api.unsplash.com/photos?client_id=${accessKey}`; 
var randomUrl = `https://api.unsplash.com/photos/random?client_id=${accessKey}`;
var query = document.querySelector("#searchInput").value;
var searchBtn = document.querySelector("#searchBtn");
var headerImage = document.querySelector("header");
var main = document.querySelector("main");
var navItem = document.querySelectorAll(".nav-item");
var loadBtn = document.querySelector(".loadmore p");
var per = 20;
var pageNum = 1;
window.addEventListener("load", function randomPic(){
    fetch(randomUrl)
    .then(photos => photos.json())
    .then(pics => {
        headerImage.style.backgroundImage = `url('${pics["urls"]["regular"]}')`
    }
);
});


window.addEventListener("load", function onloadFeatured(){
    pageNum=1;
    fetch(featuredUrl+`&per_page=${per}&page=${pageNum}`)
    .then(photos => photos.json())
    .then(pics => {
            pics.forEach(pic => {
                var imgelement = document.createElement('img');
                imgelement.setAttribute("class","picture");
                imgelement.setAttribute('src', pic["urls"]["thumb"]);
                main.appendChild(imgelement);
        });
    })
});

function navClick(index){
    console.log(navItem[index].innerHTML);
    query = navItem[index].innerHTML;
    displayMain(query, main);
}
searchBtn.addEventListener("click", function handleEvent(){
    displayMain(query, main);
});

function clearElement(main){
    while (main.firstChild) {
        main.removeChild(main.firstChild);
    }
}
function handleError(){
var errorMsg = document.createElement('h2');
errorMsg.textContent = "Sorry, we couldn't able to find what you're looking for. Please try with different valid keywords.";
errorMsg.setAttribute('class',"error-msg");
main.appendChild(errorMsg);
}

function displayMain(value,main) {
    clearElement(main);
    pageNum=1;
    fetch(searchUrl+`&query=${value}&per_page=${per}&page=${pageNum}`)
    .then(photos => photos.json())
    .then(pics => {
            pics["results"].forEach(pic => {
                var imgelement = document.createElement('img');
                imgelement.setAttribute("class","picture");
                imgelement.setAttribute('src', pic["urls"]["regular"]);
                main.appendChild(imgelement);
        });
    }).catch(handleError());
}

function loadmore(value){
    pageNum +=1;
    if (value === ""){
        fetch(featuredUrl+`&query=${value}&per_page=${per}&page=${pageNum}`)
    .then(photos => photos.json())
    .then(pics => {
            pics.forEach(pic => {
                var imgelement = document.createElement('img');
                imgelement.setAttribute("class","picture");
                imgelement.setAttribute('src', pic["urls"]["thumb"]);
                main.appendChild(imgelement);
        });
    })
    }
    else{
        fetch(searchUrl+`&query=${value}&per_page=${per}&page=${pageNum}`)
        .then(photos => photos.json())
        .then(pics => {
            pics["results"].forEach(pic => {
                var imgelement = document.createElement('img');
                imgelement.setAttribute("class","picture");
                imgelement.setAttribute('src', pic["urls"]["regular"]);
                main.appendChild(imgelement);
            });
        })
    }
}

loadBtn.addEventListener("click", function handleLoadBtn(){
    loadmore(query);
});

// var _docHeight = (document.height !== undefined) ? document.height : document.body.offsetHeight;

// window.onscroll = function (){
//     if(window.pageYOffset > main.scrollHeight-300){
//         console.log(window.pageYOffset, query);
//         loadmore(query);
//     }
// }
// window.addEventListener("scroll", function listenscroll(){
//     var page_height = document.body.offsetHeight ? document.body.offsetHeight : document.height;
//     if (main.scrollTop + main.clientHeight >= main.scrollHeight){
//         per +=20; 
//         alert("down");
//         displayMain(value);
//     }
// })