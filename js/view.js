let ConvertElementToString = async function (str) {
    let response = '';
    await fetch(str)
        .then(response => response.text())
        .then(text => {
            response = text;
        });
    return response;
}

let getGameListToCardFormat = async function () {
    const api = JSON.parse(await ConvertElementToString("js/api/games.json"));
    const apiToJson = [];
    for (let i in api) {
        apiToJson.push(api[i]);
    }
    return apiToJson;
}

class HomeHeader extends HTMLElement {

    constructor() {
        super();
    }

    async connectedCallback() {
        this.innerHTML = await ConvertElementToString("view/home-header.html");
    }
}

class HomeMain extends HTMLElement {

    constructor() {
        super();
        // var text = this.getAttribute('text');       
    }

    async connectedCallback() {
        this.innerHTML = await ConvertElementToString("view/home-main.html");
    }
}

class HomeFooter extends HTMLElement {

    constructor() {
        super();
    }

    async connectedCallback() {
        this.innerHTML = await ConvertElementToString("view/home-footer.html");
    }
}


let CreateCard = function (cardImg, cardTitle, cardDescription, cardBtnTitle) {
    const view = `
    <div class=card-game>
        <div class="card">
            <img src="${cardImg}" class="card-img-top">
            <div class="card-body">
                <h5 class="card-title">${cardTitle}</h5>
                <p class="card-text">${cardDescription}</p>
            </div>
        </div>
    </div>
  `;
    return view;
}

class CardGame extends HTMLElement {

    constructor() {
        super();
    };

    async connectedCallback() {
        var index = this.getAttribute("index");
        let view = '';
        const api = await getGameListToCardFormat();
        for (let i in api) {
            if(i === index) {
                break;
            }
            const game = api[i];
            view = view + `\n<div class="col-lg-12 mb-3">
                    ${CreateCard(game.thumbnail, game.title, game.short_description)}
                </div>\n`;
        }
        this.innerHTML = view;
    };
}


customElements.define('app-home-header', HomeHeader);
customElements.define('app-home-main', HomeMain);
customElements.define('app-home-footer', HomeFooter);
customElements.define('app-card-game', CardGame);
