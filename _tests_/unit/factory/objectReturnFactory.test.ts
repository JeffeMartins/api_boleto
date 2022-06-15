import factoryRequest from '../../../src/factory/objectReturnFactory';
import {SUCCESS_RESPONSE} from './../../mock/mockObjectsData'

describe('Object response success', () => {
    it('Objecty retorn for user', async () => {

        const rest = await factoryRequest.objectReturnFactory(
            '21299758700000020000001121100012100447561740',
            '20.00',
            '2018-07-16');
        expect(rest)
            .toEqual(SUCCESS_RESPONSE);
    });
})
