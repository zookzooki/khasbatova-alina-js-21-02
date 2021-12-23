const { mapThirdPartyUserToUserShort, mapThirdPartyUserToUser, mapThirdPartyPostList, mapThirdPartyUserList } = require('../../src/mappers/userMapper')

describe('userMapper', () => {
    test('mapThirdPartyUserToUserShort: should to be success', () => {
        const input = {
            id: '60d0fe4f5311236168a109ca',
            firstName: 'Sara',
            lastName: 'Andersen',
            title: 'ms',
            picture: 'https://randomuser.me/api/portraits/women/58.jpg',
        };
        const expected = {
            id: '60d0fe4f5311236168a109ca',
            firstName: 'Sara',
            picture: 'https://randomuser.me/api/portraits/women/58.jpg',
        };
        expect(mapThirdPartyUserToUserShort(input)).toEqual(expected);
    });

    test('mapThirdPartyUserToUserShort: should to be success with undefined', () => {
        expect(mapThirdPartyUserToUserShort()).toBeNull();
    });

    test('mapThirdPartyUserToUser: should to be success', () => {
        const input = {
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
        };
        const expected = {
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
        expect(mapThirdPartyUserToUser(input)).toEqual(expected);
    });

    test('mapThirdPartyUserToUser: should to be success with undefined', () => {
        expect(mapThirdPartyUserToUser()).toBeNull();
    });

    test('mapThirdPartyPostList: should to be success', () => {
        const input = {
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
            limit: 20
        };
        const expected = {
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
        expect(mapThirdPartyPostList(input)).toEqual(expected);
    });

    test('mapThirdPartyPostList: should to be success with undefined', () => {
        expect(mapThirdPartyPostList()).toBeNull();
    });

    test('mapThirdPartyUserList: should to be success', () => {
        const input = {
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
            page: 0,
            limit: 20,
        };
        const expected = {
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
        };
        expect(mapThirdPartyUserList(input)).toEqual(expected);
    });

    test('mapThirdPartyUserList: should to be success with undefined', () => {
        expect(mapThirdPartyUserList()).toBeNull();
    });
});