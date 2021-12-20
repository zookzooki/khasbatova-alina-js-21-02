const isIncludes = (firstStr, secondStr) => firstStr.toLowerCase().includes(secondStr.toLowerCase());

const truncate = (str, maxlength) => (str.length > parseInt(maxlength, 10)) && (maxlength >= 0)
    ? `${str.slice(0, maxlength)}...`
    : str;

const changeDateFormat = (str) => {
    const regexp = /(?<date>\d{2})\/(?<month>\d{2})\/(?<year>\d{4}) (?<hour>\d{2})-(?<minute>\d{2})/;
    return str.replace(regexp, '$<date>.$<month>.$<year> $<hour>:$<minute>');
}

const validateFIO = (str) => {
    const regexp = /^[а-яА-я]+ [а-яА-я]+( [а-яА-я]*(вна|вич))?$/;
    return regexp.test(str);
}

const changeToSnakeCase = (str) => str.split(/(?=[A-Z])/).join('_').toLowerCase();

const findComments = (str) => str.match( /(?<=<!--).*(?=-->)/g);

const findNumbers = (str) => str.match(/(\d+\.\d*)|\d+/g);

const searching = (str) => {
    const regexp = /^\w{4}-?\w{4}-?\w{4}-?\w{4}$/;
    if (regexp.test(str)) {
        return 'ведется поиск';
    } else {
        return 'неверный идентификатор';
    }
}

module.exports = {
    isIncludes, truncate, changeDateFormat, validateFIO, changeToSnakeCase, findComments, findNumbers, searching,
}
