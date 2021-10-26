import { createFetch } from '../utils/fetchUtils.js';
import { UPLOAD_URL, key } from '../constants/imgBB.js';

const addImgToGallery = (url) => {
    const img = document.createElement('img');
    img.src = url;
    document.querySelector('.gallery').append(img);
}

const imgArr = localStorage.getItem('imgArr') ? JSON.parse(localStorage.getItem('imgArr')) : [];
imgArr.forEach(addImgToGallery);

export const uploadBase64UrlToImgBB = (file) => {
    const loaderBox = document.getElementById('loader');
    const reader = new FileReader();
    reader.readAsDataURL(file)
    reader.onload = () => {
        const formData = new FormData();
        formData.set('key', key)
        formData.set('image', reader.result.replace(/^.*,/, ''))
        const resp = createFetch(UPLOAD_URL, formData);
        resp((response) => {
            imgArr.push(response.data.display_url);
            localStorage.setItem('imgArr', JSON.stringify(imgArr));
            addImgToGallery(response.data.display_url);
            loaderBox.parentElement.removeChild(loaderBox);
            })
            .catch(console.error)
    }
}
