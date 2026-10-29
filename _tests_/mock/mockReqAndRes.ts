import {vi} from 'vitest';
class MockRequestAndResponse {
    public mockRequest = () => {
        const req: any = {}
        req.body = vi.fn().mockReturnValue(req)
        req.params = vi.fn().mockReturnValue(req)
        return req
    };

    public mockResponse = () => {
        const res: any = {}
        res.send = vi.fn().mockReturnValue(res)
        res.status = vi.fn().mockReturnValue(res)
        res.json = vi.fn().mockReturnValue(res)
        return res
    };
}


export default new MockRequestAndResponse();
