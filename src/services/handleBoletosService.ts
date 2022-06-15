import HandleWithDigitableNumberBoleto from './../helpers/handleBoletosHelper';
import objectReturn from './../factory/objectReturnFactory';
import apiError from "../error/types/apiError";

interface ObjectFieldsBoleto {
    dueDate: string;
    financialInstitution: string;
    coin: string;
    formattedAmount: number;
}

interface ObjectReturnApiBancks {
    ispb: string;
    name: string;
    code: number;
    fullName: string;
    message: string;
    type: string;
}

class HandleBoleto {

    public async handleBoleto(code: string): Promise<object> {
        const {
            handleDueDate,
            getFinancialInstitutionApi,
            handleFieldsBoleto,
            handleBarCod
        } = HandleWithDigitableNumberBoleto;

        const {objectReturnFactory} = objectReturn;

        const cleanCode = code.replace(/[^\d]+/g, '');

        if (cleanCode.length !== 47) {
            throw new apiError('number displayed is different from 47 digits', 'ERR_BAD_REQUEST', 400);

        }

        const fields: ObjectFieldsBoleto = await handleFieldsBoleto(cleanCode);

        if (fields.coin !== '9') {
            throw new apiError('Brazilian real incompatible currency', 'ERR_BAD_REQUEST', 400);
        }

        if (Number(fields.formattedAmount) === 0 || Number(fields.formattedAmount) < 0) {
            throw new apiError('Boleto do not display a defined value', 'ERR_BAD_REQUEST', 400);
        }

        const responseApiBancks: ObjectReturnApiBancks = await getFinancialInstitutionApi(fields.financialInstitution)

        if (responseApiBancks.type === 'BANK_CODE_NOT_FOUND') {
            throw new apiError(responseApiBancks.message, 'ERR_BAD_REQUEST', 400);
        }

        const dueDate = await handleDueDate(cleanCode)

        const BarCode = await handleBarCod(cleanCode);

        const objectRequest = await objectReturnFactory(BarCode, String(fields.formattedAmount), dueDate);

        return objectRequest;
    }

}

export default new HandleBoleto();