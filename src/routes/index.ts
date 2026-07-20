import { Router } from 'express';
import HandleBoletos from '../controllers/handleBoletosController';

const routes = Router();
routes.get('/boleto/:code', (request, response) => HandleBoletos.processBoleto(request, response));

export default routes;
