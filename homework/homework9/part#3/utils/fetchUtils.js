// Модуль с утилитами для fetch
export const createFetch = (url) => (callback, errorCallback) => {
    fetch(url)
        .then(response => response.json())
        .then(callback)
        .catch(errorCallback)
}
