import { Router } from 'express';

interface IAppRouter {
    router: Router;
}

export class AppRouter implements IAppRouter {
    router: Router;
    constructor() {
        this.router = Router();
        this.init();
    }

    async init() {
        const fs = require('fs');
        let filesRoute: Array<string> = [];

        fs.readdirSync(__dirname).forEach(file => {
            if ( !file.includes('.map') && !file.includes('index.js') ) {
                console.log('Route file name is ' + file);
                filesRoute.push(file);
            }
        });
        
        this.loadFiles(filesRoute);
    }

    loadFiles(files: Array<string>) {
        for( let file of files ) {
            require('./' + file)(this.router);
        }
    }

    get() {
        //@ts-ignore
        return (typeof this.router !== 'undefined' )? this.router: new Router([]);
    }
}