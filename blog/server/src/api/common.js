const axios = require('axios');
const { app_id, app_id_field, base_url } = require('../../config/apiConfig');

const doRequest = async (method, path, {body, searchParams} = {}) => {
    const url = new URL(path, base_url);
    if (searchParams) {
        url.search = new URLSearchParams(searchParams).toString();
    }
    return axios({
        url: url.toString(),
        method,
        headers: {
            [app_id_field]: app_id,
            'Content-Type': 'application/json',
        },
        data:  JSON.stringify(body),
    });
};

module.exports = doRequest;
