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
    eat: { enumerable: false },
    say: { enumerable: false },
    rename: { enumerable: false },
});
Object.freeze(animal);

const cat = {
    say() {
        console.log('мяу-мяу');
    },
    hunt() {
        console.log(`${this.name} охотится`);
    }
}
Object.setPrototypeOf(cat, animal);
Object.defineProperties(cat, {
    say: { enumerable: false },
    hunt: { enumerable: false },
});
Object.freeze(cat);

const dog = {
    say() {
        console.log('гав-гав');
    },
}
Object.setPrototypeOf(dog, animal);
Object.defineProperties(dog, {
    say: { enumerable: false },
});
Object.freeze(dog);

const parrot = {
    say() {
        console.log('чирик');
    },
}
Object.setPrototypeOf(parrot, animal);
Object.defineProperties(parrot, {
    say: { enumerable: false },
});
Object.freeze(parrot);

animal.say();
animal.eat();
animal.rename('Гоша-Кеша');
console.log(animal.name);
animal.eat();
cat.eat();
cat.hunt();
console.log(Object.keys(cat));