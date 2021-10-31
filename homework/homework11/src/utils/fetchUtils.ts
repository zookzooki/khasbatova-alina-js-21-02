export const createFetch = (url: string): any => (callback: any, errorCallback?: any) => {
    fetch(url)
        .then(response => response.json())
        .then(callback)
        .catch(errorCallback)
}
