class Globals {
    constructor () {
        this.data = {};
        if (!!window['__APP_GLOBALS__']) {
            Object.assign(this.data, window['__APP_GLOBALS__']);
        }
    }

    get(itemName) {
        return this.data[itemName];
    }
}

const GlobalsInstance = new Globals();

export default GlobalsInstance;