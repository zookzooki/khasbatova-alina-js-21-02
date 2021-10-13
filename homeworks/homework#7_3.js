////// классы
class Animal {
    constructor(name) {
        this._name = name;
    }
    eat() {
        console.log(`${this.name} ест`);
    };

    say() {
        console.log('неизвестное животное молчит');
    };

    get name() {
        return this._name;
    }

    rename(newName) {
        const regexp = /^[а-яА-я\s-]*$/;
        if (regexp.test(newName)) {
            this._name = newName;
        }
    };
}

class Cat extends Animal {
    constructor(name) {
        super(name);
    }

    say () {
        console.log('мяу-мяу');
    };

    hunt() {
        console.log(`${this.name} охотится`);
    }
}

class Dog extends Animal {
    constructor(name) {
        super(name);
    }

    say() {
        console.log('гав-гав');
    };
}

class Parrot extends Animal {
    constructor(name) {
        super(name);
    }

    say() {
        console.log('чирик');
    };
}

const animal = new Animal('животное');
const cat = new Cat('Ириска');
const dog = new Cat('Шарик');
const parrot = new Parrot('Гоша');

animal.eat();
console.log(cat.name);
cat.eat();
cat.hunt();
cat.rename('Борис');
console.log(cat.name);
cat.eat();
console.log(dog.name);
console.log(parrot.name);
