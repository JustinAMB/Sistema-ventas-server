import express,{Application} from 'express';
import category from '../routes/category.routes';
import person from '../routes/person.routes';
import sell from '../routes/sell.routes';
import cors from 'cors';

import morgan from 'morgan';

class Server{
    private app!: Application;
    private port!: string;
    private apiPaths={
        category: '/api/category',
        person: '/api/person',
        sell: '/api/sell',
    }
    constructor(){
        this.app=express();
        this.port=process.env.PORT || '73';
        this.middlewares();
        this.routes();
        
    }

    middlewares(){
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use( express.static('public') );
    }
    routes(){
        console.log('routess');
        this.app.use(this.apiPaths.category, category);
        this.app.use(this.apiPaths.person, person);
        this.app.use(this.apiPaths.sell, sell);
        
    }
    listen(){
        this.app.listen(this.port,()=>{
            console.log(`Server running on port ${this.port}`);
        });

    }
}

export default Server;