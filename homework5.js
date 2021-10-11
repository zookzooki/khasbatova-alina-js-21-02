// 1. На вход поступает массив, вывести массив, удалив неуникальные значения.
const data1 = [0, 1, 4, 5, 4, 1, 6, 1];
const res = [];
data1.forEach((el) => {
    if (!res.includes(el)) {
        res.push(el);
    }
});
console.log(`#1: ${res}`);

// 2. На вход поступает массив, реверсировать значения (подобно методу reverse) метод reverse не использовать.
const data2 = [0, 1, 4, 5, 3, 8, 6, 1];
const result = data2.reduce((res, el) => {
    res.unshift(el);
    return res;
}, []);
console.log(`#2: ${result}`);

// 3. На вход поступает массив, содержащий массивы, в которых хранится два элемента.
// Преобразовать массив в объект, где ключами являются нулевой индекс вложенныхых массивов, а значениями являются элементы с индексом один.
const data3 = [[0, 'a'], [1, 'b'], [2, 'c']];
const obj = Object.fromEntries(data3);
console.log(obj);

// 4. На вход поступает объект, вывести сумму числовых свойств объекта.
const data4 = { a: 1, b: 2, c: 3, d: 10 };
let sum = 0;
for (let key in data4) {
    sum += data4[key];
}
console.log(`#4: ${sum}`);

// 5. На вход поступает массив с числами, вывести среднее арифметическое элементов массива.
const data5 = [0, 1, 3, 4];
const summary = data5.reduce((res, el) => {
    res += el;
    return res;
}, 0);
console.log(`#5: ${summary/data5.length}`);

// 6. Создать функцию-конструктор для объекта "калькулятор", объект должен иметь поле, хранящее текущее значение и методы сложения,
// вычитания, умножения и деления, принимающие число и манипулирующий свойством значения в соответствии с назначением метода, а так же функцию, сбрасывающую значение в ноль.
function Calculator(firstNumber, secondNumber) {
    this.result = 0;
    this.firstNumber = firstNumber;
    this.secondNumber = secondNumber;
    this.addition = () => {
        this.result = this.firstNumber + this.secondNumber;
        console.log(`${this.firstNumber} + ${this.secondNumber} = ${this.result}`);
    }
    this.subtraction = () => {
        this.result = this.firstNumber - this.secondNumber;
        console.log(`${this.firstNumber} - ${this.secondNumber} = ${this.result}`);
    }
    this.multiplication = () => {
        this.result = this.firstNumber * this.secondNumber;
        console.log(`${this.firstNumber} * ${this.secondNumber} = ${this.result}`);
    }
    this.division = () => {
        this.result = this.firstNumber / this.secondNumber;
        console.log(`${this.firstNumber} / ${this.secondNumber} = ${this.result}`);
    }
    this.reset = () => this.result = 0;
}

const test6 = new Calculator(1, 2);
test6.addition();
test6.reset();

// 7. Функция принимает смешанный массив (содержащий значения чисел, строк и объектов),
// вернуть объект с полями numbers, strings и objects, содержащими массив со значениями, соответствующими названию поля.
const data7 = ['a', 3, 5, { a: 1 }, { b: 4}, 'c'];
const object = data7.reduce((res, el) => {
    if (typeof el === 'string') {
        res.strings.push(el);
    } else if (typeof el === 'number') {
        res.numbers.push(el);
    } else {
        res.objects.push(el);
    }
    return res;
}, {
    numbers: [],
    strings: [],
    objects: [],
});
console.log(object);

// 8. Функция принимает массив чисел и два числовых значения, вернуть новый массив, содержащий элементы первого массива,
// значение которых попадает под диапазон переданных в функцию чисел (второе переданное число может быть больше первого)
const data8 = [9, 5, 4, 7, 3, 5, 1];
const limitArr = (arr, start, end) => {
   return arr.filter((el) => {
        return (start < end) ? start <= el && el <=  end : end <= el && el <= start;
    });
};
console.log(`#8: ${limitArr(data8, 2, 5)}`);

// 9. Функция принимает две строки. Вывести true, если строки являются анаграммами, в противном случае false
const isAnagramma = (firstStr, secondStr) => {
    if (firstStr.length === secondStr.length) {
        return firstStr.split('').sort().join('') === secondStr.split('').sort().join('');
    }
    return false;
}
console.log(`#9: ${isAnagramma('лето', 'тело')}`);

// 10. Создать объект, выводящий в консоль все ключи и значения объекта в формате "ключ: значение" через запятую
// (считать, что значением ключа объекта не может быть объектом или массивом, содержащими объекты) сама функция в консоль выводиться не должна.
const testObject10 = {
    a: 1,
    b: [1, 2 ,3],
    c: 'abc',
    d: {e: 2},

   logInfo: function () {
       const arr = [['a', testObject10.a], ['b', testObject10.b], ['c', testObject10.c], ['d', testObject10.d]];
       const res10 = arr.filter((el) => typeof el[1] !== 'object').map(el => el.join(': ')).join(', ');
       console.log(res10);
   },
}
testObject10.logInfo();

// 11. Создать функцию-конструктор для объекта, содержащего методы serProp (установить значение свойства),
// метод принимает ключ (строка), значение (произвольное) и объект со свойствами writable, configurable, enumerable
// (разрешение перезаписи свойства, разрешение перечисления свойства и разрешение удаления свойства). Если какое-то из свойств в объекте отсутствует, действие должно быть разрешено

function TestObject() {
    this.serProp = function (key, value, { writable=true, configurable=true, enumerable=true } = {}) {
        Object.defineProperty(this, key, {
            value,
            writable,
            configurable,
            enumerable,
        });
    }
}
const test11 = new TestObject();
test11.serProp('name', 'Oleg',{ writable: false })
console.log(Object.getOwnPropertyDescriptors(test11));
