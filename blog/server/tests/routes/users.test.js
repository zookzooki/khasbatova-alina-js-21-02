const request = require('supertest');
const server = require('../../src/server');
const repository = require('../../src/repositories/apiRepository');
jest.mock('../../src/repositories/apiRepository');

describe('users router',() => {

    afterEach( async() => {
        jest.clearAllMocks();
        await server.close();
    });

    test('getUserList: should return user list', async () => {
        const expectedData = {
                data: [
                    {
                        id: "60d0fe4f5311236168a109ca",
                        title: "ms",
                        firstName: "Sara",
                        lastName: "Andersen",
                        picture: "https://randomuser.me/api/portraits/women/58.jpg"
                    },
                    {
                        id: "60d0fe4f5311236168a109cb",
                        title: "miss",
                        firstName: "Elza",
                        lastName: "VesteringP",
                        picture: "https://i.ibb.co/G3ZWntL/face-model-portrait-long-hair-photography-celebrity-actress-sweater-hair-mouth-nose-skin-head-superm.jpg"
                    },
                ],
                total: 2,
                page: 2,
        };
        repository.getUserListThirdParty.mockResolvedValue({
            data: {
                data: [
                    {
                        id: "60d0fe4f5311236168a109ca",
                        title: "ms",
                        firstName: "Sara",
                        lastName: "Andersen",
                        picture: "https://randomuser.me/api/portraits/women/58.jpg"
                    },
                    {
                        id: "60d0fe4f5311236168a109cb",
                        title: "miss",
                        firstName: "Elza",
                        lastName: "VesteringP",
                        picture: "https://i.ibb.co/G3ZWntL/face-model-portrait-long-hair-photography-celebrity-actress-sweater-hair-mouth-nose-skin-head-superm.jpg"
                    },
                ],
                total: 2,
                page: 1,
                limit: 20,
            },
            statusText: 'OK',
        });
        const result = await request(server).get('/api/user').send();
        expect(result.statusCode).toBe(201);
        expect(result.body).toEqual(expectedData);
    });

    test('getUserList: fetch to api error', async() => {
        const errorDesc = 'FETCH ERROR';
        repository.getUserListThirdParty.mockRejectedValue({ message: errorDesc });
        const result = await request(server).get('/api/user').send()
        expect(result.statusCode).toBe(400);
        expect(JSON.parse(result.text)).toBe(errorDesc);
    });

    test('getUserByIdShort: should return user info', async () => {
        const expectedData = {
            id: '60d0fe4f5311236168a109ca',
            firstName: 'Sara',
            picture: 'https://randomuser.me/api/portraits/women/58.jpg',
        };
        repository.getUserByIdThirdParty.mockResolvedValue({
            data: {
                id: '60d0fe4f5311236168a109ca',
                firstName: 'Sara',
                lastName: 'Andersen',
                title: 'ms',
                picture: 'https://randomuser.me/api/portraits/women/58.jpg',
            },
            statusText: 'OK',
        });
        const result = await request(server).get('/api/user/signin/60d0fe4f5311236168a109ca').send();
        expect(result.statusCode).toBe(201);
        expect(result.body).toEqual(expectedData);
    });

    test('getUserList: fetch to api error', async() => {
        const errorDesc = 'FETCH ERROR';
        repository.getUserByIdThirdParty.mockRejectedValue({ message: errorDesc });
        const result = await request(server).get('/api/user/signin/60d0fe4f5311236168a109ca').send()
        expect(result.statusCode).toBe(400);
        expect(JSON.parse(result.text)).toBe(errorDesc);
    });

    test('getUserById: should return user info', async () => {
        const expectedData = {
            id: '60d0fe4f5311236168a109ca',
            firstName: 'Sara',
            lastName: 'Andersen',
            title: 'ms',
            picture: 'https://randomuser.me/api/portraits/women/58.jpg',
            gender: 'female',
            email: 'sara.andersen@example.com',
            dateOfBirth: '2021-12-08T17:57:51.811Z',
            phone: '+78345345345345454',
            registerDate: '2021-06-21T21:02:07.374Z',
        };
        repository.getUserByIdThirdParty.mockResolvedValue({
            data: {
                id: '60d0fe4f5311236168a109ca',
                firstName: 'Sara',
                lastName: 'Andersen',
                title: 'ms',
                picture: 'https://randomuser.me/api/portraits/women/58.jpg',
                gender: 'female',
                email: 'sara.andersen@example.com',
                dateOfBirth: '2021-12-08T17:57:51.811Z',
                phone: '+78345345345345454',
                location: {
                    street: '9614, SÃ¸ndermarksvej',
                    city: 'Kongsvinger',
                    state: 'Nordjylland',
                    country: 'Denmark',
                    timezone: '-9:00'
                },
                registerDate: '2021-06-21T21:02:07.374Z',
                updatedDate: '2021-06-21T21:02:07.374Z',
            },
            statusText: 'OK',
        });
        const result = await request(server).get('/api/user/60d0fe4f5311236168a109ca').send();
        expect(result.statusCode).toBe(201);
        expect(result.body).toEqual(expectedData);
    });

    test('getUserListgetUserById: fetch to api error', async() => {
        const errorDesc = 'FETCH ERROR';
        repository.getUserByIdThirdParty.mockRejectedValue({ message: errorDesc });
        const result = await request(server).get('/api/user/60d0fe4f5311236168a109ca').send()
        expect(result.statusCode).toBe(400);
        expect(JSON.parse(result.text)).toBe(errorDesc);
    });

    test('createUser: should return user info', async () => {
        const expectedData = {
            id: '60d0fe4f5311236168a109ca',
            firstName: 'Sara',
            picture: 'https://randomuser.me/api/portraits/women/58.jpg',
        };
        repository.createUserThirdParty.mockResolvedValue({
            data: {
                id: '60d0fe4f5311236168a109ca',
                firstName: 'Sara',
                lastName: 'Andersen',
                title: 'ms',
                picture: 'https://randomuser.me/api/portraits/women/58.jpg'
            },
            statusText: 'OK',
        });
        const result = await request(server).post('/api/user/create')
            .send({
            firstName: 'Sara',
            lastName: 'Andersen',
            title: 'ms',
            picture: 'https://randomuser.me/api/portraits/women/58.jpg',
        })
            .send();
        expect(result.statusCode).toBe(201);
        expect(result.body).toEqual(expectedData);
    });

    test('createUser: fetch to api error', async() => {
        const errorDesc = 'FETCH ERROR';
        repository.createUserThirdParty.mockRejectedValue({ message: errorDesc });
        const result = await request(server).post('/api/user/create').send()
        expect(result.statusCode).toBe(400);
        expect(JSON.parse(result.text)).toBe(errorDesc);
    });

    test('getPostsByUser: should return user posts', async () => {
        const expectedData = {
            data: [
                {
                    id: "60d21b4667d0d8992e610c85",
                    image: "https://img.dummyapi.io/photo-1564694202779-bc908c327862.jpg",
                    text: "adult Labrador retriever",
                },
                {
                    id: "60d21bf867d0d8992e610e98",
                    image: "https://img.dummyapi.io/photo-1568572933382-74d440642117.jpg",
                    text: "black and white Husky",
                }
            ],
            total: 2,
            page: 1,
        };
        repository.getPostsByUserThirdParty.mockResolvedValue({
            data: {
                data: [
                    {
                        id: "60d21b4667d0d8992e610c85",
                        image: "https://img.dummyapi.io/photo-1564694202779-bc908c327862.jpg",
                        likes: 43,
                        tags: [
                            "animal",
                            "dog",
                            "golden retriever"
                        ],
                        text: "adult Labrador retriever",
                        publishDate: "2020-05-24T14:53:17.598Z",
                        owner: {
                            id: "60d0fe4f5311236168a109ca",
                            title: "ms",
                            firstName: "Sara",
                            lastName: "Andersen",
                            picture: "https://randomuser.me/api/portraits/women/58.jpg",
                            gender: "female",
                            dateOfBirth: "2021-12-08T17:57:51.811Z",
                            phone: "+78345345345345454"
                        },
                    },
                    {
                        id: "60d21bf867d0d8992e610e98",
                        image: "https://img.dummyapi.io/photo-1568572933382-74d440642117.jpg",
                        likes: 79,
                        tags: [
                            "dog",
                            "animal",
                            "husky"
                        ],
                        text: "black and white Husky",
                        publishDate: "2020-05-03T08:21:17.580Z",
                        owner: {
                            "id": "60d0fe4f5311236168a109ca",
                            "title": "ms",
                            "firstName": "Sara",
                            "lastName": "Andersen",
                            "picture": "https://randomuser.me/api/portraits/women/58.jpg",
                            "gender": "female",
                            "dateOfBirth": "2021-12-08T17:57:51.811Z",
                            "phone": "+78345345345345454"
                        }
                    }
                ],
                total: 2,
                page: 0,
                limit: 20,
            },
            statusText: 'OK',
        });
        const result = await request(server).get('/api/user/60d0fe4f5311236168a109ca/post').send();
        expect(result.statusCode).toBe(201);
        expect(result.body).toEqual(expectedData);
    });

    test('getPostsByUser: fetch to api error', async() => {
        const errorDesc = 'FETCH ERROR';
        repository.getPostsByUserThirdParty.mockRejectedValue({ message: errorDesc });
        const result = await request(server).get('/api/user/60d0fe4f5311236168a109ca/post').send()
        expect(result.statusCode).toBe(400);
        expect(JSON.parse(result.text)).toBe(errorDesc);
    });

    test('updateUser: should return user info', async () => {
        const expectedData = {
            id: '60d0fe4f5311236168a109ca',
            firstName: 'Sara',
            lastName: 'Andersen',
            title: 'ms',
            picture: 'https://randomuser.me/api/portraits/women/58.jpg',
            gender: 'female',
            email: 'sara.andersen@example.com',
            dateOfBirth: '2021-12-08T17:57:51.811Z',
            phone: '+78345345345345454',
            registerDate: '2021-06-21T21:02:07.374Z',
        };
        repository.updateUserThirdParty.mockResolvedValue({
            data: {
                id: '60d0fe4f5311236168a109ca',
                firstName: 'Sara',
                lastName: 'Andersen',
                title: 'ms',
                picture: 'https://randomuser.me/api/portraits/women/58.jpg',
                gender: 'female',
                email: 'sara.andersen@example.com',
                dateOfBirth: '2021-12-08T17:57:51.811Z',
                phone: '+78345345345345454',
                location: {
                    street: '9614, SÃ¸ndermarksvej',
                    city: 'Kongsvinger',
                    state: 'Nordjylland',
                    country: 'Denmark',
                    timezone: '-9:00'
                },
                registerDate: '2021-06-21T21:02:07.374Z',
                updatedDate: '2021-06-21T21:02:07.374Z',
            },
            statusText: 'OK',
        });
        const result = await request(server).put('/api/user/60d0fe4f5311236168a109ca').send();
        expect(result.statusCode).toBe(201);
        expect(result.body).toEqual(expectedData);
    });

    test('updateUser: fetch to api error', async() => {
        const errorDesc = 'FETCH ERROR';
        repository.updateUserThirdParty.mockRejectedValue({ message: errorDesc });
        const result = await request(server).put('/api/user/60d0fe4f5311236168a109ca').send()
        expect(result.statusCode).toBe(400);
        expect(JSON.parse(result.text)).toBe(errorDesc);
    });
});
