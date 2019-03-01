const isTest = process.env.NODE_ENV === 'test';
const port = isTest ? Math.floor(Math.random() * (20000 - 10000) + 10000) : (process.env.PORT || 5556);

const express = require('express');
const httpModule = require('http');
const path = require('path');
const axios = require('axios');
//const socket = require('socket.io');
const argv = require('yargs').argv;
const isProd = argv.APP_MODE === 'production';

console.log(`Node.js Server isProd: ${isProd}`, argv);
httpModule.globalAgent.options.ca = require('ssl-root-cas/latest').create();
const bodyParser = require('body-parser');

const returnStatus = require('./network/returnStatus');
const AbstractNetworkComponent = require('./network/AbstractNetworkComponent');
const DummyAPI = require('./network/DummyAPI');
const networkMessages = require('../server/network/messages');

class ServerConstructor extends AbstractNetworkComponent {
    constructor () {
        super();
        this.mainTitle = 'Boilerplate';
        this.startAttempts = 0;
        this.startAttemptsLimit = 20;

        this.app = express();
        this.http = httpModule.Server(this.app);
        //socket(http);
        this.port = port;
        this.setupPaths();

//        socket.on('connection', function (socket) {
//            console.log('a user connected');
//            socket.on('disconnect', function () {
//                console.log('user disconnected');
//            });
//        });
        this.http.on('listening', () => console.log('Server started; port: ' + this.port));
        this.http.on('error', (err) => {
            if (err.errno === 'EADDRINUSE') {
                if (!isProd) {
                    if (this.startAttempts >= this.startAttemptsLimit) {
                        console.log(`Failed to start for ${this.startAttemptsLimit}; giving up...`);
                        return;
                    }
                    this.startAttempts++;
                    console.log(`Failed to start on port ${this.port}; will randomize port and try again;
        attempts so far: ${this.startAttempts} of ${this,this.startAttemptsLimit}`);
                    this.port++;                
                    this.tryListen();
                } else {
                    throw err;
                }
            }
        });
        this.tryListen();
        return this;
    }

    tryListen() {
        this.http.listen(this.port);
    }

    indexPage (req, res) {
        this._renderIndex(res);
    };
    _renderIndex (res) {
        res.render('index', {
            title: this.mainTitle,
            env: {
                isProd: isProd, // todo: make not a global
            }
        });
    }

    setupPaths () {
        this.app.set('view engine', 'jade');
        this.app.set('views', path.join(__dirname, 'views'));
        this.app.use(express.static('dist'));
        this.app.use( bodyParser.json() );

        this.dummyAPI = new DummyAPI({apiName: 'something'});
        this.dummyAPI.init(this.app); 

        this.app.get('/api/*', (req, res) => {
            res.setHeader('Content-Type', 'application/json');
            this.returnError(res, 404, networkMessages.API_NOT_FOUND);
        });

        this.app.get('*', this.indexPage.bind(this));

    }
}

const backendInstance = new ServerConstructor();
module.exports = backendInstance;