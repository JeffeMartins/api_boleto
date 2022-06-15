import HandleWithDigitableNumberBoleto from '../../../src/helpers/handleBoletosHelper';
import {MOCK_FIELDS_BOLETO, CODE_SUCCES, BAR_CODE, DUE_DATE} from './../../mock/mockObjectsData';

describe('Handle boleto number', () => {

    it('Generating barCode from code boleto', () => {
        expect(HandleWithDigitableNumberBoleto.handleBarCod(CODE_SUCCES)).toEqual(BAR_CODE);
    })

    it('Verify length barCode', () => {
        expect(HandleWithDigitableNumberBoleto.handleBarCod(CODE_SUCCES)).toHaveLength(44);
    })

    it('handle due date', async () => {
        const ret = await HandleWithDigitableNumberBoleto.handleDueDate(CODE_SUCCES);
        expect(ret).toEqual(DUE_DATE);
    })

    it('Get financial institution api', async () => {
        const ret = await HandleWithDigitableNumberBoleto.getFinancialInstitutionApi('001');
        expect(ret).toHaveProperty('fullName', 'Banco do Brasil S.A.');
    })

    it('Fields boleto', async () => {
        const ret = await HandleWithDigitableNumberBoleto.handleFieldsBoleto(CODE_SUCCES);
        expect(ret).toEqual(MOCK_FIELDS_BOLETO);
    })

})