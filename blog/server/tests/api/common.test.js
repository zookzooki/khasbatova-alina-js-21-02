const axios = require('axios');

const doRequest = require('../../src/api/common');

jest.mock('axios', () => jest.fn(() => {}));

describe('common', () => {
  test('doRequest: should call axios with search params, get method and app-id header', () => {
    const endpoint = 'endpoint';
    const pageParam = 'pageParam';
    const limitParam = 'limitParam';
    const page = 1;
    const limit = 10;
    doRequest('GET', endpoint, { searchParams: {pageParam: page, limitParam: limit }});
    expect(axios).toBeCalledWith(
      {headers: {"app-id": "618a88a67fd84d7a0d53ac62", 'Content-Type': 'application/json'},
        method: "GET",
        url: `https://dummyapi.io/data/v1/endpoint?${pageParam}=${page}&${limitParam}=${limit}`,
        data: undefined}
    );
  });
});
