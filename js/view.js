
let ConvertHTMLToString = async function (str) {
    let response = '';
    await fetch(str)
        .then(response => response.text())
        .then(text => {
           response = text;
        });
    return response;
}

class HomeHeader extends HTMLElement {
    async connectedCallback() {
        this.innerHTML = await ConvertHTMLToString("view/home-header.html");
    }
}

class HomeMain extends HTMLElement {
    async connectedCallback() {
        this.innerHTML = await ConvertHTMLToString("view/home-main.html");
    }
}

class HomeFooter extends HTMLElement {
    async connectedCallback() {
        this.innerHTML = await ConvertHTMLToString("view/home-footer.html");
    }
}


customElements.define('app-home-header', HomeHeader);
customElements.define('app-home-main', HomeMain);
customElements.define('app-home-footer', HomeFooter);
