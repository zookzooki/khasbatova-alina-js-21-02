////// объекты
const animal = {
    name: 'животное',
    eat() {
        console.log(`${this.name} ест`);
    },
    say() {
        console.log('неизвестное животное молчит');
    },
    rename(newName) {
        const regexp = /^[а-яА-я\s-]*$/;
        if (regexp.test(newName)) {
            this.name = newName;
        }
    }
};
Object.defineProperties(animal, {
    eat: { enumerable: false, writable: false, configurable:false },
    say: { enumerable: false, writable: false, configurable:false },
    rename: { enumerable: false },
});

const cat = {
    name: 'обычный кот',
    say() {
        console.log('мяу-мяу');
    },
    hunt() {
        console.log(`${this.name} охотится`);
    }
}
Object.setPrototypeOf(cat, animal);
Object.defineProperties(cat, {
    say: { enumerable: false, writable: false, configurable:false },
    hunt: { enumerable: false, writable: false, configurable:false },
});

const dog = {
    name: 'пес',
    say() {
        console.log('гав-гав');
    },
}
Object.setPrototypeOf(dog, animal);
Object.defineProperties(dog, {
    say: { enumerable: false, writable: false, configurable:false },
});

const parrot = {
    name: 'попугай',
    say() {
        console.log('чирик');
    },
}
Object.setPrototypeOf(parrot, animal);
Object.defineProperties(parrot, {
    say: { enumerable: false, writable: false, configurable:false },
});

animal.say();
animal.eat();
animal.rename('Гоша-Кеша');
console.log(animal.name);
animal.eat();
cat.eat();
cat.hunt();
console.log(Object.keys(cat));
