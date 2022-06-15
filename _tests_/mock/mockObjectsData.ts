export const SUCCESS_RESPONSE = {
    barCode: '21299758700000020000001121100012100447561740',
    amount: '20.00',
    expirationDate: '2018-07-16'
}

export const ERROR_RESPONSE_AMOUNT_CHARACTERES = {
    error: {
        name: "ERR_BAD_REQUEST",
        message: "number displayed is different from 47 digits"
    }
}

export const ERROR_RESPONSE_CHARACTERES_COIN = {
    error: {
        name: "ERR_BAD_REQUEST",
        message: "Brazilian real incompatible currency"
    }
}

export const ERROR_RESPONSE_BANK_CODE_NOT_FOUND = {
    error: {
        name: "ERR_BAD_REQUEST",
        message: "Código bancário não encontrado"
    }
}

export const ERROR_RESPONSE_FORMATTED_AMOUN = {
    error: {
        name: "ERR_BAD_REQUEST",
        message: "Boleto do not display a defined value"
    }
}

export const MOCK_FIELDS_BOLETO = {
    dueDate: '7587',
    financialInstitution: '212',
    coin: '9',
    formattedAmount: '20.00'
}

export const CODE_SUCCES = '21290001192110001210904475617405975870000002000';
export const BAR_CODE = '21299758700000020000001121100012100447561740';
export const DUE_DATE = '2018-07-16';

export const CODE_ERROR_AMOUNT_CHARACTERS = '212900011921100012109044756174059758700000020';
export const CODE_ERROR_CHARACTERS_COIN = '21200001192110001210904475617405975870000002000';
export const CODE_ERROR_FORMATTED_AMOUNT = '21290001192110001210904475617405975870000000000';
export const CODE_ERROR_BANK_CODE_NOT_FOUND = '21190001192110001210904475617405975870000002000';



