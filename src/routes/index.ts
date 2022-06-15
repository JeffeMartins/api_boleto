import {Router} from 'express'
import HandleBoletos from './../controllers/handleBoletosController';

const routes = Router();
const { processBoleto } = HandleBoletos;

routes.get('/boleto/:code',  processBoleto)

export default routes;