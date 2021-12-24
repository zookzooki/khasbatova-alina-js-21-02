const request = require('supertest');
const server = require('../../src/server');
const repository = require('../../src/repositories/apiRepository');
jest.mock('../../src/repositories/apiRepository');

describe('posts router', () => {
    afterEach(async () => {
        jest.clearAllMocks();
        await server.close();
    });

    test('getPostList: should return post list', async () => {
        const expectedData = {
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
                        picture: "https://randomuser.me/api/portraits/women/58.jpg"
                    }
                },
                {
                    id: "60d21b4967d0d8992e610c90",
                    image: "https://img.dummyapi.io/photo-1510414696678-2415ad8474aa.jpg",
                    likes: 31,
                    tags: [
                        "snow",
                        "ice",
                        "mountain"
                    ],
                    text: "ice caves in the wild landscape photo of ice near ...",
                    publishDate: "2020-05-24T07:44:17.738Z",
                    owner: {
                        id: "60d0fe4f5311236168a10a0b",
                        title: "miss",
                        firstName: "Margarita",
                        lastName: "Vicente",
                        picture: "https://randomuser.me/api/portraits/med/women/5.jpg"
                    }
                }
            ],
            total: 2,
            page: 1,
        };
        repository.getPostListThirdParty.mockResolvedValue({
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
                            picture: "https://randomuser.me/api/portraits/women/58.jpg"
                        }
                    },
                    {
                        id: "60d21b4967d0d8992e610c90",
                        image: "https://img.dummyapi.io/photo-1510414696678-2415ad8474aa.jpg",
                        likes: 31,
                        tags: [
                            "snow",
                            "ice",
                            "mountain"
                        ],
                        text: "ice caves in the wild landscape photo of ice near ...",
                        publishDate: "2020-05-24T07:44:17.738Z",
                        owner: {
                            id: "60d0fe4f5311236168a10a0b",
                            title: "miss",
                            firstName: "Margarita",
                            lastName: "Vicente",
                            picture: "https://randomuser.me/api/portraits/med/women/5.jpg"
                        }
                    }
                ],
                total: 2,
                page: 0,
                limit: 20,
            },
            statusText: 'OK',
        });
        const result = await request(server).get('/api/post').send();
        expect(result.statusCode).toBe(201);
        expect(result.body).toEqual(expectedData);
    });

    test('getPostList: fetch to api error', async () => {
        const errorDesc = 'FETCH ERROR';
        repository.getPostListThirdParty.mockRejectedValue({message: errorDesc});
        const result = await request(server).get('/api/post').send()
        expect(result.statusCode).toBe(400);
        expect(JSON.parse(result.text)).toBe(errorDesc);
    });

    test('getCommentsByPost: should return comments list', async () => {
        const expectedData = {
            data: [
                {
                    id: "60d21b4667d0d8992e610c85",
                    text: "beautifull",
                },
                {
                    id: "60d21b4967d0d8992e610c90",
                    text: "Hi",
                }
            ],
            total: 2,
            page: 1,
        };
        repository.getCommentsByPostThirdParty.mockResolvedValue({
            data: {
                data: [
                    {
                        id: "60d21b4667d0d8992e610c85",
                        text: "beautifull",
                    },
                    {
                        id: "60d21b4967d0d8992e610c90",
                        text: "Hi",
                    }
                ],
                total: 2,
                page: 0,
                limit: 20,
            },
            statusText: 'OK',
        });
        const result = await request(server).get('/api/post/60d21b4667d0d8992e610c85/comment').send();
        expect(result.statusCode).toBe(201);
        expect(result.body).toEqual(expectedData);
    });

    test('getCommentsByPost: fetch to api error', async () => {
        const errorDesc = 'FETCH ERROR';
        repository.getCommentsByPostThirdParty.mockRejectedValue({message: errorDesc});
        const result = await request(server).get('/api/post/60d21b4667d0d8992e610c85/comment').send()
        expect(result.statusCode).toBe(400);
        expect(JSON.parse(result.text)).toBe(errorDesc);
    });
});