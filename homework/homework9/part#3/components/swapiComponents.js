const createMan = (name, height, mass, gender) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${name}</td><td>${height}</td><td>${mass}</td><td>${gender}</td>`;
    return tr;
}

export const createPeopleList = (peopleArray) => {
    const body = document.createElement('tbody');
    peopleArray.forEach(man => {
        body.append(createMan(man.name, man.height, man.mass, man.gender));
    });
    return body;
}
