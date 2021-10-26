// Модуль с утилитами для fetch
export const createFetch = (url, body) => (callback, errorCallback) => {
    return fetch(url, {
        method: 'POST',
        body,
    })
        .then(response => response.json())
        .then(callback)
        .catch(errorCallback)
}
