import {
    calculateExpirationDate,
    convertToBarCode,
    isValidDigitableLine,
    parseBoletoFields,
    sanitizeDigitableLine,
} from '../../../src/domain/boleto';
import {
    BAR_CODE,
    CODE_SUCCES,
    DUE_DATE,
    MOCK_FIELDS_BOLETO,
} from '../../mock/mockObjectsData';

describe('Boleto domain', () => {
    it('sanitizes a formatted digitable line', () => {
        expect(sanitizeDigitableLine('21290.00119 21100.012109 04475.617405 9 75870000002000'))
            .toBe(CODE_SUCCES);
    });

    it('validates the required number of digits', () => {
        expect(isValidDigitableLine(CODE_SUCCES)).toBe(true);
        expect(isValidDigitableLine(CODE_SUCCES.slice(1))).toBe(false);
    });

    it('extracts boleto fields and formats cents as currency', () => {
        const fields = parseBoletoFields(CODE_SUCCES);

        expect(fields).toEqual({
            dueDateFactor: MOCK_FIELDS_BOLETO.dueDate,
            financialInstitution: MOCK_FIELDS_BOLETO.financialInstitution,
            coin: MOCK_FIELDS_BOLETO.coin,
            amount: MOCK_FIELDS_BOLETO.formattedAmount,
        });
    });

    it('uses all ten amount digits', () => {
        const codeWithLargeAmount = `${CODE_SUCCES.slice(0, 37)}1234567890`;

        expect(parseBoletoFields(codeWithLargeAmount).amount).toBe('12345678.90');
    });

    it('calculates the expiration date independently of local timezone', () => {
        expect(calculateExpirationDate(CODE_SUCCES)).toBe(DUE_DATE);
    });

    it('converts the digitable line to a 44-digit bar code', () => {
        expect(convertToBarCode(CODE_SUCCES)).toBe(BAR_CODE);
        expect(convertToBarCode(CODE_SUCCES)).toHaveLength(44);
    });
});
