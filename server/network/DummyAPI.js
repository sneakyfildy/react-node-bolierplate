const AbstractAPI = require('./AbstractAPI');

class DummyAPI extends AbstractAPI {
    constructor(cfg) {
        super(cfg);
    }

    _commonGet (query) {
        return new Promise((resolve, reject) => {
                resolve([
                    {
                        text: 'item 1',
                        someKey: 'some key 1'
                    },
                    {
                        text: 'item 2',
                        someKey: 'some key 2'
                    }
                ]);
            }
        )
    }

    _commonPost (items) {
        //return this.dbi.addItems(items);
    }

    _commonDelete () {
        //return this.dbi.clear();
    }
}

module.exports = DummyAPI;