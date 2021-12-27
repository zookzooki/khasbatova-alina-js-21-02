const repository = require('../../src/repositories/apiRepository');
const doRequest = require('../../src/api/common');
const { user_url, post_url } = require('../../config/apiConfig');
const { get, post, put } = require('../../config/serverConfig');
jest.mock('../../src/api/common');

describe('ApiRepository', () => {

    afterEach(() => {
        jest.clearAllMocks()
    });

    const data = 'some data';
    const body = 'body';
    const id = '60d0fe4f5311236168a109ca';
    const errorDesc = 'FETCH ERROR';
    const page = 1;
    const limit = 20;

    test('getUserByIdThirdParty: should return resolved', async () => {
        doRequest.mockResolvedValue(data);
        const resp = await repository.getUserByIdThirdParty(id);
        expect(doRequest).toBeCalledWith(get, `${user_url}/${id}`);
        expect(resp).toBe(data);
    });

    test('getUserByIdThirdParty: fetch to api error', (done) => {
        doRequest.mockRejectedValue({ message: errorDesc });
        repository.getUserByIdThirdParty(id).catch(error => {
            expect(error.message).toBe(errorDesc);
            done();
        })
    });

    test('createUserThirdParty: should return resolved', async () => {
        doRequest.mockResolvedValue(data);
        const resp = await repository.createUserThirdParty(body);
        expect(doRequest).toBeCalledWith(post, `${user_url}/create`, { body });
        expect(resp).toBe(data);
    });

    test('createUserThirdParty: fetch to api error', (done) => {
        doRequest.mockRejectedValue({ message: errorDesc });
        repository.createUserThirdParty(body).catch(error => {
            expect(error.message).toBe(errorDesc);
            done();
        })
    });

    test('getPostsByUserThirdParty: should return resolved', async () => {
        doRequest.mockResolvedValue(data);
        const resp = await repository.getPostsByUserThirdParty(id, page, limit);
        expect(doRequest).toBeCalledWith(get, `${user_url}/${id}/${post_url}`, {searchParams: { page: page-1, limit }});
        expect(resp).toBe(data);
    });

    test('getPostsByUserThirdParty: fetch to api error', (done) => {
        doRequest.mockRejectedValue({ message: errorDesc });
        repository.getPostsByUserThirdParty(body).catch(error => {
            expect(error.message).toBe(errorDesc);
            done();
        })
    });

    test('updateUserThirdParty: should return resolved', async () => {
        doRequest.mockResolvedValue(data);
        const resp = await repository.updateUserThirdParty(id, body);
        expect(doRequest).toBeCalledWith(put, `${user_url}/${id}`, { body });
        expect(resp).toBe(data);
    });

    test('updateUserThirdParty: fetch to api error', (done) => {
        doRequest.mockRejectedValue({ message: errorDesc });
        repository.updateUserThirdParty(body).catch(error => {
            expect(error.message).toBe(errorDesc);
            done();
        })
    });

    test('getUserListThirdParty: should return resolved', async () => {
        doRequest.mockResolvedValue(data);
        const resp = await repository.getUserListThirdParty(page, limit);
        expect(doRequest).toBeCalledWith(get, `${user_url}`, {searchParams: { page: page-1, limit }});
        expect(resp).toBe(data);
    });

    test('getUserListThirdParty: fetch to api error', (done) => {
        doRequest.mockRejectedValue({ message: errorDesc });
        repository.getUserListThirdParty(body).catch(error => {
            expect(error.message).toBe(errorDesc);
            done();
        })
    });

    test('getPostListThirdParty: should return resolved', async () => {
        doRequest.mockResolvedValue(data);
        const resp = await repository.getPostListThirdParty(page, limit);
        expect(doRequest).toBeCalledWith(get, `${post_url}`, {searchParams: { page: page-1, limit }});
        expect(resp).toBe(data);
    });

    test('getPostListThirdParty: fetch to api error', (done) => {
        doRequest.mockRejectedValue({ message: errorDesc });
        repository.getPostListThirdParty(body).catch(error => {
            expect(error.message).toBe(errorDesc);
            done();
        })
    });

    test('getCommentsByPostThirdParty: should return resolved', async () => {
        doRequest.mockResolvedValue(data);
        const resp = await repository.getCommentsByPostThirdParty(id, page, limit);
        expect(doRequest).toBeCalledWith(get, `${post_url}/${id}/comment`, {searchParams: { page: page-1, limit }});
        expect(resp).toBe(data);
    });

    test('getCommentsByPostThirdParty: fetch to api error', (done) => {
        doRequest.mockRejectedValue({ message: errorDesc });
        repository.getCommentsByPostThirdParty(body).catch(error => {
            expect(error.message).toBe(errorDesc);
            done();
        })
    });

});