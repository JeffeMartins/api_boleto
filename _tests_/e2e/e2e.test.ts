import request from 'supertest';
import {app} from './../../src/app';
import {SUCCESS_RESPONSE} from './../mock/mockObjectsData';

describe('Test End To end', () => {
    it("Should return Sucesso, status 200", async () => {
            const response = await request(app).get("/boleto/21290001192110001210904475617405975870000002000");
            expect(response.body).toEqual(SUCCESS_RESPONSE);
        }
    );
});