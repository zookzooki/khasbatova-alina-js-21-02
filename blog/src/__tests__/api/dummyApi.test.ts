import fetchMock from 'jest-fetch-mock';
import { getUsersInfo, getUserById, getUserByIdShort, createUser, updateUser, getPostList, getCommentsByPost, getPostsByUser } from '../../api/dumMyApi';

describe('dummyApi tests', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  describe('getUsersInfo', () => {
    test('should call fetch with url and options', () => {
      const fetchResponse = {
        data: 'any data',
      };
      fetchMock.mockResponse(JSON.stringify(fetchResponse));
      const fetchOptions = {
        method: 'GET',
      };
      const url = 'http://localhost:3007/api/user?page=1&limit=10';
      getUsersInfo(1, 10);
      expect(fetchMock).toBeCalledWith(url, fetchOptions);
    });

    test('should return response.data', async () => {
      const fetchResponse = {
        data: 'any data'
      }
      fetchMock.mockResponse(JSON.stringify(fetchResponse));
      const result = await getUsersInfo(1, 10);
      expect(JSON.parse(result).data).toBe(fetchResponse.data);
    });

    test('should return fetch error', async () => {
      const error = {
        message: 'fetch error',
      }
      fetchMock.mockReject(() => Promise.reject(error));
      try {
        const result = await getUsersInfo(1, 10);
      } catch (e) {
        expect(e.message).toBe(error.message);
      }
    });
  });

  describe('getUserById', () => {
    test('should call fetch with url and options', () => {
      const fetchResponse = {
        data: 'any data',
      };
      fetchMock.mockResponse(JSON.stringify(fetchResponse));
      const fetchOptions = {
        method: 'GET',
      };
      const url = 'http://localhost:3007/api/user/60d0fe4f5311236168a109ca';
      getUserById('60d0fe4f5311236168a109ca');
      expect(fetchMock).toBeCalledWith(url, fetchOptions);
    });

    test('should return response.data', async () => {
      const fetchResponse = {
        data: 'any data'
      }
      fetchMock.mockResponse(JSON.stringify(fetchResponse));
      const result = await getUserById('60d0fe4f5311236168a109ca');
      expect(JSON.parse(result).data).toBe(fetchResponse.data);
    });

    test('should return fetch error', async () => {
      const error = {
        message: 'fetch error',
      }
      fetchMock.mockReject(() => Promise.reject(error));
      try {
        const result = await getUserById('60d0fe4f5311236168a109ca');
      } catch (e) {
        expect(e.message).toBe(error.message);
      }
    });
  });

  describe('getUserByIdShort', () => {
    test('should call fetch with url and options', () => {
      const fetchResponse = {
        data: 'any data',
      };
      fetchMock.mockResponse(JSON.stringify(fetchResponse));
      const fetchOptions = {
        method: 'GET',
      };
      const url = 'http://localhost:3007/api/user/signin/60d0fe4f5311236168a109ca';
      getUserByIdShort('60d0fe4f5311236168a109ca');
      expect(fetchMock).toBeCalledWith(url, fetchOptions);
    });

    test('should return response.data', async () => {
      const fetchResponse = {
        data: 'any data'
      }
      fetchMock.mockResponse(JSON.stringify(fetchResponse));
      const result = await getUserByIdShort('60d0fe4f5311236168a109ca');
      expect(JSON.parse(result).data).toBe(fetchResponse.data);
    });

    test('should return fetch error', async () => {
      const error = {
        message: 'fetch error',
      }
      fetchMock.mockReject(() => Promise.reject(error));
      try {
        const result = await getUserByIdShort('60d0fe4f5311236168a109ca');
      } catch (e) {
        expect(e.message).toBe(error.message);
      }
    });
  });

    test('createUser: should call fetch with url and options', () => {
      const fetchResponse = {
        data: 'any data',
      };
      const body = {
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
      }
      fetchMock.mockResponse(JSON.stringify(fetchResponse));
      const fetchOptions = {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
        body: JSON.stringify(body),
      };
      const url = 'http://localhost:3007/api/user/create';
      createUser(body);
      expect(fetchMock).toBeCalledWith(url, fetchOptions);
    });

  test('updateUser: should call fetch with url and options', () => {
    const fetchResponse = {
      data: 'any data',
    };
    const id = '60d0fe4f5311236168a109ca';
    const body = {
      firstName: 'Sara',
      lastName: 'Andersen',
      title: 'ms',
      picture: 'https://randomuser.me/api/portraits/women/58.jpg',
      gender: 'female',
      email: 'sara.andersen@example.com',
      dateOfBirth: '2021-12-08T17:57:51.811Z',
      phone: '+78345345345345454',
      registerDate: '2021-06-21T21:02:07.374Z',
    }
    fetchMock.mockResponse(JSON.stringify(fetchResponse));
    const fetchOptions = {
      method: 'PUT',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(body),
    };
    const url = `http://localhost:3007/api/user/${id}`;
    updateUser(id, body);
    expect(fetchMock).toBeCalledWith(url, fetchOptions);
  });

  test('getPostList: should call fetch with url and options', () => {
      const fetchResponse = {
        data: 'any data',
      };
      fetchMock.mockResponse(JSON.stringify(fetchResponse));
      const fetchOptions = {
        method: 'GET',
      };
      const url = 'http://localhost:3007/api/post?page=1&limit=10';
      getPostList(1, 10);
      expect(fetchMock).toBeCalledWith(url, fetchOptions);
  });

  test('getCommentsByPost: should call fetch with url and options', () => {
    const fetchResponse = {
      data: 'any data',
    };
    fetchMock.mockResponse(JSON.stringify(fetchResponse));
    const fetchOptions = {
      method: 'GET',
    };
    const url = 'http://localhost:3007/api/post/60d0fe4f5311236168a109ca/comment?page=1&limit=10';
    getCommentsByPost('60d0fe4f5311236168a109ca', 1, 10);
    expect(fetchMock).toBeCalledWith(url, fetchOptions);
  });

  test('getPostsByUser: should call fetch with url and options', () => {
    const fetchResponse = {
      data: 'any data',
    };
    fetchMock.mockResponse(JSON.stringify(fetchResponse));
    const fetchOptions = {
      method: 'GET',
    };
    const url = 'http://localhost:3007/api/user/60d0fe4f5311236168a109ca/post?page=1&limit=10';
    getPostsByUser('60d0fe4f5311236168a109ca', 1, 10);
    expect(fetchMock).toBeCalledWith(url, fetchOptions);
  });
});
