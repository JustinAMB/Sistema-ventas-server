import express,{Application} from 'express';
import category from '../routes/category.routes';
import person from '../routes/person.routes';
import sell from '../routes/sell.routes';
import user from '../routes/user.routes';
import product from '../routes/product.routes';

import upload from '../routes/upload.routes';
import cors from 'cors';

import morgan from 'morgan';

class Server{
    private app!: Application;
    private port!: string;
    private apiPaths={
        category: '/api/category',
        person: '/api/person',
        sell: '/api/sell',
        user: '/api/user',
        product: '/api/product',
        upload: '/api/upload',
    }
    constructor(){
        this.app=express();
        this.port=process.env.PORT || '73';
        this.middlewares();
        this.routes();
        
    }

    middlewares(){
        this.app.use(cors());
        this.app.use(morgan('dev'));
        
        this.app.use(express.json());
        this.app.use( express.static('public') );
    }
    routes(){
        console.log('routess');
        this.app.use(this.apiPaths.category, category);
        this.app.use(this.apiPaths.person, person);
        this.app.use(this.apiPaths.sell, sell);
        this.app.use(this.apiPaths.user, user);
        this.app.use(this.apiPaths.product, product);
        this.app.use(this.apiPaths.upload, upload);
        
    }
    listen(){
        this.app.listen(this.port,()=>{
            console.log(`Server running on port ${this.port}`);
        });

    }
}

export default Server;