import {Request, Response} from 'express';
import HandleBoleto from './../services/handleBoletosService';

class HandleBoletos {

    public async processBoleto(req: Request, res: Response) {


        try {
            const boletoCode: string = req.params.code;
            const { handleBoleto } = HandleBoleto;

            const dueDate = await handleBoleto(boletoCode)

            return res.status(200).json(dueDate)

        } catch (err: any) {
            res.status(err.status || 409).json({
                error: {
                    name: err.name,
                    message: err.message || err.erros
                }
            });
        }

    }
}

export default new HandleBoletos();