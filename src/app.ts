import express from 'express';
import routes from './routes/index'
import cors from 'cors';

export const app = express();

app.disable('x-powered-by');app.use(require('helmet')());app.use(cors());
app.use(express.json());

app.use(routes);
