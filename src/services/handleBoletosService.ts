import {
    FinancialInstitutionNotFoundError,
    getFinancialInstitution,
} from '../clients/brasilApiClient';
import {
    BoletoResponse,
    calculateExpirationDate,
    convertToBarCode,
    isValidDigitableLine,
    parseBoletoFields,
    sanitizeDigitableLine,
} from '../domain/boleto';
import ApiError from '../error/types/apiError';

class HandleBoleto {

    public async handleBoleto(code: string): Promise<BoletoResponse> {
        const cleanCode = sanitizeDigitableLine(code);

        if (!isValidDigitableLine(cleanCode)) {
            throw new ApiError('number displayed is different from 47 digits', 'ERR_BAD_REQUEST', 400);
        }

        const fields = parseBoletoFields(cleanCode);

        if (fields.coin !== '9') {
            throw new ApiError('Brazilian real incompatible currency', 'ERR_BAD_REQUEST', 400);
        }

        if (Number(fields.amount) <= 0) {
            throw new ApiError('Boleto do not display a defined value', 'ERR_BAD_REQUEST', 400);
        }

        try {
            await getFinancialInstitution(fields.financialInstitution);
        } catch (error) {
            if (error instanceof FinancialInstitutionNotFoundError) {
                throw new ApiError(error.message, 'ERR_BAD_REQUEST', 400);
            }

            throw error;
        }

        return {
            barCode: convertToBarCode(cleanCode),
            amount: fields.amount,
            expirationDate: calculateExpirationDate(cleanCode),
        };
    }
}

export default new HandleBoleto();
