export interface BoletoFields {
    dueDateFactor: string;
    financialInstitution: string;
    coin: string;
    amount: string;
}

export interface BoletoResponse {
    barCode: string;
    amount: string;
    expirationDate: string;
}

const DIGITABLE_LINE_LENGTH = 47;
const BAR_CODE_LENGTH = 44;
const DUE_DATE_BASE = Date.UTC(1997, 9, 7);
const DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000;

export function sanitizeDigitableLine(code: string): string {
    return code.replace(/\D/g, '');
}

export function isValidDigitableLine(code: string): boolean {
    return code.length === DIGITABLE_LINE_LENGTH;
}

export function parseBoletoFields(code: string): BoletoFields {
    const amountInCents = Number.parseInt(code.slice(37, 47), 10);

    return {
        dueDateFactor: code.slice(33, 37),
        financialInstitution: code.slice(0, 3),
        coin: code.slice(3, 4),
        amount: (amountInCents / 100).toFixed(2),
    };
}

export function calculateExpirationDate(code: string): string {
    const dueDateFactor = Number.parseInt(code.slice(33, 37), 10);
    const date = new Date(DUE_DATE_BASE + dueDateFactor * DAY_IN_MILLISECONDS);

    return date.toISOString().slice(0, 10);
}

export function convertToBarCode(code: string): string {
    const barCode = [
        code.slice(0, 4),
        code.slice(32, 47),
        code.slice(4, 9),
        code.slice(10, 20),
        code.slice(21, 31),
    ].join('');

    if (barCode.length !== BAR_CODE_LENGTH) {
        throw new Error('Could not generate a valid boleto bar code');
    }

    return barCode;
}
