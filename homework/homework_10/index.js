import { uploadBase64UrlToImgBB } from "./components/img.js";
import { moveLeftAnimation } from "./components/loader.js";

const input = document.getElementById('fileInput');
const uploadButton = document.getElementById('uploadButton');

uploadButton.addEventListener('click', () => {
    moveLeftAnimation();
    uploadBase64UrlToImgBB(input.files[0]);
});
