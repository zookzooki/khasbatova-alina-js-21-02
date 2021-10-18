////// функции-конструкторы
function Animal(name) {
    this.name = name;
    this.eat = function() {
        console.log(`${this.name} ест`);
    };
    this.say = function() {
        console.log('неизвестное животное молчит');
    };
    this.rename = function(newName) {
        const regexp = /^[а-яА-я\s-]*$/;
        if (regexp.test(newName)) {
            this.name = newName;
        }
    };
}

function Cat(name) {
    Animal.call(this, name);
    this.say = function () {
        console.log('мяу-мяу');
    };
    this.hunt = function () {
        console.log(`${this.name} охотится`);
    }
}

function Dog(name) {
    Animal.call(this, name);
    this.say = function() {
        console.log('гав-гав');
    };
}

function Parrot(name) {
    Animal.call(this, name);
    this.say = function () {
        console.log('чирик');
    };
}

const animal = new Animal('животное');
Object.defineProperties(animal, {
    eat: { enumerable: false, writable: false, configurable:false },
    say: { enumerable: false, writable: false, configurable:false },
    rename: { enumerable: false },
});

const cat = new Cat('Ириска');
Object.defineProperties(cat, {
    say: { enumerable: false, writable: false, configurable:false },
    hunt: { enumerable: false, writable: false, configurable:false },
    eat: { enumerable: false, writable: false, configurable:false },
    rename: { enumerable: false },
});

const dog = new Dog('Шарик');
Object.defineProperties(dog, {
    say: { enumerable: false, writable: false, configurable:false },
    eat: { enumerable: false, writable: false, configurable:false },
    rename: { enumerable: false },
});

const parrot = new Parrot('Гоша');
Object.defineProperties(parrot, {
    say: { enumerable: false, writable: false, configurable:false },
    eat: { enumerable: false, writable: false, configurable:false },
    rename: { enumerable: false },
});

animal.eat();
console.log(cat.name);
cat.eat();
cat.hunt();
cat.rename('Борис');
console.log(cat.name);
cat.eat();
console.log(Object.keys(cat));
console.log(dog.name);
console.log(parrot.name);
