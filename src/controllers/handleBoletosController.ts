import { Request, Response } from 'express';
import ApiError from '../error/types/apiError';
import HandleBoleto from '../services/handleBoletosService';

class HandleBoletos {

    public async processBoleto(req: Request, res: Response): Promise<Response> {
        try {
            const boleto = await HandleBoleto.handleBoleto(req.params.code);
            return res.status(200).json(boleto);
        } catch (error: unknown) {
            const apiError = error instanceof ApiError
                ? error
                : new ApiError('Internal server error', 'ERR_INTERNAL_SERVER', 500);

            return res.status(apiError.status).json({
                error: {
                    name: apiError.name,
                    message: apiError.message,
                },
            });
        }
    }
}

export default new HandleBoletos();
