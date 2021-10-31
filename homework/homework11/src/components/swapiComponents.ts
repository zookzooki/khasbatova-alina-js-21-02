export type ManType = {
    name: string;
    height: number | 'unknown';
    mass: number | 'unknown';
    gender: string;
};

export type Resp = {
    next: string,
    previous: string,
    results: Array<ManType>,
};

const createMan = (info: ManType): HTMLTableRowElement => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${info.name}</td><td>${info.height}</td><td>${info.mass}</td><td>${info.gender}</td>`;
    return tr;
}

export const createPeopleList = (peopleArray: Array<ManType>): HTMLTableSectionElement => {
    const body = document.createElement('tbody');
    peopleArray.forEach(man => {
        body.append(createMan({name: man.name, height: man.height, mass: man.mass, gender: man.gender}));
    });
    return body;
}
