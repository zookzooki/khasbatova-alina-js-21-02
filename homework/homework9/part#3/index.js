import { swapi } from './api/swapi.js';
import {createPeopleList} from "./components/swapiComponents.js";
import { createFetch } from './utils/fetchUtils.js'

const table = document.querySelector('table');
const nameButton = document.querySelector('.arrow__name');
const heightButton = document.querySelector('.arrow__height');
const massButton = document.querySelector('.arrow__mass');
const genderButton = document.querySelector('.arrow__gender');
const nextButton = document.querySelector('.button__next');
const prevButton = document.querySelector('.button__prev');
let peopleArr;
let nextHref;
let prevHref;

const prepareData = (resp) => {
    console.log(resp);
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
    peopleArr = resp.results.map(el => {
        return { name: el.name, height: el.height, mass: el.mass, gender: el.gender };
    })
    if (table.querySelector('tbody')) {
        document.querySelector('table').removeChild(document.querySelector('tbody'));
    }
    document.querySelector('thead').after(createPeopleList(peopleArr));
}

swapi.getPeople(resp => {
    prepareData(resp);
})

const sortStrTable = (name) => peopleArr.slice().sort((a,b) => a[name] > b[name] ? 1 : -1);

const sortNumberTable = (name) => peopleArr.slice().sort((a,b) => (a[name] - b[name]) || (a[name] === 'unknown') -
    (b[name] === 'unknown'));

const updateStrTable = (sortArr) => {
    document.querySelector('table').removeChild(document.querySelector('tbody'));
    document.querySelector('thead').after(createPeopleList(sortArr));
    document.querySelectorAll('.arrow').forEach(el => el.classList.remove('arrow__active'));
}

nameButton.addEventListener('click', (e) => {
    updateStrTable(sortStrTable('name'));
       e.target.classList.add('arrow__active');
    });

heightButton.addEventListener('click', (e) => {
    updateStrTable(sortNumberTable('height'));
    e.target.classList.add('arrow__active');
});

massButton.addEventListener('click', (e) => {
    updateStrTable(sortNumberTable('mass'));
    e.target.classList.add('arrow__active');
});

genderButton.addEventListener('click', (e) => {
    updateStrTable(sortStrTable('gender'));
    e.target.classList.add('arrow__active');
});

nextButton.addEventListener('click', () => {
    const resp = createFetch(nextHref);
    resp(resp => {
       prepareData(resp)
    });
});

prevButton.addEventListener('click', () => {
    const resp = createFetch(prevHref);
    resp(resp => {
        prepareData(resp)
    });
});
