const nameInput = document.querySelector('.new-user__name');
const phoneInput = document.querySelector('.new-user__phone');
const addButton = document.querySelector('.add');
const redButton = document.querySelector('button.theme-red');
const greenButton = document.querySelector('button.theme-green');
const blueButton = document.querySelector('button.theme-blue');
const table = document.querySelector('table');

// валидация
const validateName = (name) => /^[A-zА-я]*$/.test(name);
const validatePhone = (name) => /^[\d-+]*$/.test(name);
let inputNameValue = '';
let inputPhoneValue = '';
nameInput.addEventListener('input', (e) => {
        if (validateName(e.target.value)) {
            inputNameValue = e.target.value;
        }
});
nameInput.addEventListener('input', () => {
    nameInput.value = inputNameValue;
});
phoneInput.addEventListener('input', (e) => {
    if (validatePhone(e.target.value)) {
        inputPhoneValue = e.target.value;
    }
});
phoneInput.addEventListener('input', () => {
    phoneInput.value = inputPhoneValue;
});

// добавление новой строки в таблицу
addButton.addEventListener('click', () => {
    const newStr = document.createElement('tr');
    newStr.innerHTML = '<td><p class="table-name"</p></td><td><p class="table-phone"></td><td> <button class="delete">X</button></td>';
    let lastStr = document.querySelector('table').querySelector('tr:last-child');
    lastStr.after(newStr);
    lastStr = document.querySelector('table').querySelector('tr:last-child');
    lastStr.querySelector('.table-name').textContent = inputNameValue;
    lastStr.querySelector('.table-phone').textContent = inputPhoneValue;
    nameInput.value = '';
    phoneInput.value = '';
    inputNameValue = '';
    inputPhoneValue = '';
});

// изменение темы
redButton.addEventListener('click', () => {
    table.className = 'theme-red';
});
greenButton.addEventListener('click', () => {
    table.className = 'theme-green';
});
blueButton.addEventListener('click', () => {
    table.className = 'theme-blue';
});

// удаление строки
table.addEventListener('click', (e) => {
    const deletingElement = e.target.parentElement.parentElement;
    deletingElement.parentElement.removeChild(deletingElement);
});
