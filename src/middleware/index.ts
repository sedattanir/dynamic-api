import express from 'express';

interface IMiddleware {
    app: express.Application;
}

export class AppMiddleware implements IMiddleware {
    app: express.Application;

    constructor(app: express.Application) {
        this.app = app;
        this.init();
    }

    async init() {
        const fs = require('fs');
        let filesMiddleware: Array<string> = [];

        fs.readdirSync(__dirname).forEach(file => {
            if ( !file.includes('.map') && !file.includes('index.js') ) {
                console.log('Middleware file name is ' + file);
                filesMiddleware.push(file);
            }
        });
        
        this.loadFiles(filesMiddleware);
    }

    loadFiles(files: Array<string>) {
        for( let file of files ) {
            require('./' + file)(this.app);
        }
    }
}