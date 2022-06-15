import controller from '../../src/controllers/handleBoletosController';
import ClassMockRequestandResponse from '../mock/mockReqAndRes';
import {
    CODE_SUCCES,
    CODE_ERROR_AMOUNT_CHARACTERS,
    ERROR_RESPONSE_AMOUNT_CHARACTERES,
    SUCCESS_RESPONSE,
    CODE_ERROR_CHARACTERS_COIN,
    ERROR_RESPONSE_CHARACTERES_COIN,
    CODE_ERROR_FORMATTED_AMOUNT,
    ERROR_RESPONSE_FORMATTED_AMOUN,
    ERROR_RESPONSE_BANK_CODE_NOT_FOUND,
    CODE_ERROR_BANK_CODE_NOT_FOUND
} from '../mock/mockObjectsData';


describe('Should be able test controller success', () => {

    it('should status 200 and object success', async () => {

        const request = ClassMockRequestandResponse.mockRequest();
        request.params.code = CODE_SUCCES;
        const response = ClassMockRequestandResponse.mockResponse();

        await controller.processBoleto(request, response);

        expect(response.json).toHaveBeenCalledTimes(1)
        expect(response.json).toHaveBeenCalledWith(SUCCESS_RESPONSE);
    });

    test('should status 400 and return error amount characteres', async () => {
        const request = ClassMockRequestandResponse.mockRequest();
        request.params.code = CODE_ERROR_AMOUNT_CHARACTERS;
        const response = ClassMockRequestandResponse.mockResponse();

        await controller.processBoleto(request, response);

        expect(response.status).toHaveBeenCalledWith(400);
        expect(response.json).toHaveBeenCalledWith(ERROR_RESPONSE_AMOUNT_CHARACTERES);
    });

    test('should return status 400 and return Brazilian real incompatible currency', async () => {
        const request = ClassMockRequestandResponse.mockRequest();
        request.params.code = CODE_ERROR_CHARACTERS_COIN;
        const response = ClassMockRequestandResponse.mockResponse();

        await controller.processBoleto(request, response);

        expect(response.status).toHaveBeenCalledWith(400);
        expect(response.json).toHaveBeenCalledWith(ERROR_RESPONSE_CHARACTERES_COIN);
    });

    test('should return status 400 and return Boleto do not display a defined value', async () => {
        const request = ClassMockRequestandResponse.mockRequest();
        request.params.code = CODE_ERROR_FORMATTED_AMOUNT;
        const response = ClassMockRequestandResponse.mockResponse();

        await controller.processBoleto(request, response);

        expect(response.status).toHaveBeenCalledWith(400);
        expect(response.json).toHaveBeenCalledWith(ERROR_RESPONSE_FORMATTED_AMOUN);
    });


    test('should return status 400 and return banck code not found', async () => {
        const request = ClassMockRequestandResponse.mockRequest();
        request.params.code = CODE_ERROR_BANK_CODE_NOT_FOUND;
        const response = ClassMockRequestandResponse.mockResponse();

        await controller.processBoleto(request, response);

        expect(response.status).toHaveBeenCalledWith(400);
        expect(response.json).toHaveBeenCalledWith(ERROR_RESPONSE_BANK_CODE_NOT_FOUND);
    });


})