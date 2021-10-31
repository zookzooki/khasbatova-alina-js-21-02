import { swapi } from './api/swapi';
import {createPeopleList, ManType, Resp} from "./components/swapiComponents";
import { createFetch } from './utils/fetchUtils'

const table = document.querySelector('table');
const nameButton = document.querySelector('.arrow__name');
const heightButton = document.querySelector('.arrow__height');
const massButton = document.querySelector('.arrow__mass');
const genderButton = document.querySelector('.arrow__gender');
const nextButton = document.querySelector('.button__next');
const prevButton = document.querySelector('.button__prev');

let peopleArr: Array<ManType>;
let nextHref: string;
let prevHref: string;

const prepareData = (resp: Resp): void => {
    nextHref = resp.next;
    prevHref = resp.previous;
    if (!nextHref) {
        nextButton.setAttribute("disabled", "disabled");
    } else {
        nextButton.removeAttribute("disabled");
    }
    if (!prevHref) {
        prevButton.setAttribute("disabled", "disabled");
    } else {
        prevButton.removeAttribute("disabled");
    }
    peopleArr = resp.results.map((el: ManType) => {
        return { name: el.name, height: el.height, mass: el.mass, gender: el.gender };
    })
    if (table.querySelector('tbody')) {
        document.querySelector('table').removeChild(document.querySelector('tbody'));
    }
    document.querySelector('thead').after(createPeopleList(peopleArr));
}

swapi.getPeople((resp: Resp) => {
    prepareData(resp);
});

const updateStrTable = (sortArr: Array<ManType>): void => {
    document.querySelector('table').removeChild(document.querySelector('tbody'));
    document.querySelector('thead').after(createPeopleList(sortArr));
    document.querySelectorAll('.arrow').forEach(el => el.classList.remove('arrow__active'));
}

const sortNumbers = (a: number | 'unknown', b: number | 'unknown') => {
    if (a === 'unknown' && b === 'unknown') {
        return  0;
    }
    if (a === 'unknown' && b !== 'unknown') {
        return  1;
    }
    if (a !== 'unknown' && b === 'unknown') {
        return  -1;
    }
    if (a !== 'unknown' && b !== 'unknown') {
        return (a - b);
    }
}

nameButton.addEventListener('click', (e) => {
    updateStrTable(peopleArr.slice().sort((a: ManType, b:ManType) => a.name > b.name ? 1 : -1));
    (e.target as Element).classList.add('arrow__active');
    });

heightButton.addEventListener('click', (e) => {
    updateStrTable(peopleArr.slice().sort((a: ManType, b: ManType) => sortNumbers(a.height, b.height)));
    (e.target as Element).classList.add('arrow__active');
});

massButton.addEventListener('click', (e) => {
    updateStrTable(peopleArr.slice().sort((a: ManType, b: ManType) => sortNumbers(a.mass, b.mass)));
    (e.target as Element).classList.add('arrow__active');
});

genderButton.addEventListener('click', (e) => {
    updateStrTable(peopleArr.slice().sort((a: ManType, b:ManType) => a.gender > b.gender ? 1 : -1));
    (e.target as Element).classList.add('arrow__active');
});

nextButton.addEventListener('click', () => {
    const resp = createFetch(nextHref);
    resp((resp: Resp) => {
       prepareData(resp)
    });
});

prevButton.addEventListener('click', () => {
    const resp = createFetch(prevHref);
    resp((resp: Resp) => {
        prepareData(resp)
    });
});
