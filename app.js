function showMenu() {
    const navbarToggler = document.getElementById("menu");
    let main = document.getElementsByClassName("main")[0];
    if (navbarToggler.className.includes("collapsed")) {
        main.style.padding = '9rem 1rem 3rem 1rem';
        main.style.height = 'calc(100% - 6rem)';
    } else {
        main.style.padding = '12rem 1rem 3rem 1rem';
        main.style.height = 'calc(100% - 30rem)';
    }
}

let count_game = 10;
let count = 0;
let end_point_principal = "js/api/games.json";
let end_point_current = end_point_principal;
let data;
let content = document.getElementById("contentMain");
let loadArea = document.getElementById("loadArea");
let btnLoad = document.getElementById("btnLoadMore");
let cardTitle = document.getElementById("cardTitle");


function btnCategory(category) {
    category = category;
}

const myHeaders = new Headers();
const myInit = {
    method: "GET",
    headers: myHeaders,
    mode: "cros",
    cache: "default"
};

function loadGames() {
    let ajax = new XMLHttpRequest();
    ajax.open("GET", end_point_principal, true);
    ajax.send();

    ajax.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            data = JSON.parse(this.responseText);

            setTimeout(() => {
                cache();
                loadArea.style.display = "block";
                printCard();
            }, 10);
        }
    }
}

loadGames();

function printCard() {

    let html_content = "";
    content.innerHTML = html_content;

    if (data.length > 0) {
        loadMore();
    } else {
        html_content = alert("Nenhum jogo cadastrado", "warning");
        content.innerHTML = html_content;
    }
}


function loadMore() {
    let html_content = "";
    let finaly = (count + count_game);

    if (finaly > data.length) {
        finaly = data.length;
        loadArea.style.display = "none";
    } 

    for (let i = count; i < (count + count_game); i++) {
        const game = data[i];
        html_content = html_content + `\n${CreateCard(game.thumbnail, game.title, game.short_description, game.game_url, game.genre, game.developer, game.release_date)}\n`;
    }

    count+=count_game;
    content.innerHTML += html_content;
}

alert = function (msg, tipo) {
    return `
    <div class="col col-12 col-mg-6">
        <div class="alert alert-${tipo}" role="alert">${msg}</div>
    </div>`;
}

CreateCard = function (cardImg, cardTitle, cardDescription, cardBtnTitle, cardGenre, cardDeveloper, cardData) {
    const view = `
    <div class="col col-12 col-mg-6 mb-3">
        <div class="card-game">
            <div class="card">
                <img src="${cardImg}" class="card-img-top">
                <div class="card-body">
                    <h5 class="card-title">${cardTitle}</h5>
                    <h5>
                        <span  class="badge bg-secondary mr-3">${cardGenre}</span>
                        <span  class="badge bg-info">${cardDeveloper}</span>
                    </h5>
                    <p><strong>Lançamento: ${cardData}</strong></p>
                    <p class="card-text">${cardDescription}</p>
                    <a href="${cardBtnTitle}" class="btn">Acessar Game</a>
                </div>
            </div>
        </div>
    </div>
  `;
    return view;
}

function cache() {

}

// const nav = document.querySelector("header");
// let lasScrolly = window.screenY;
// window.addEventListener("scroll", () => {
//     if(lasScrolly == window.screenY) {

//     } else {

//     }
// });