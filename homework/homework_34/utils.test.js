const { isIncludes, truncate, changeDateFormat, validateFIO, changeToSnakeCase, findComments, findNumbers, searching } = require('./utils');

describe('isIncludes', () => {
    it('return true if firstStr with lowercase includes secondStr with lowercase', () => {
        expect(isIncludes('в лесу родилась елочка', 'лес')).toBeTruthy();
    })

    it('return true if firstStr with lowercase includes secondStr with uppercase', () => {
        expect(isIncludes('в лесу родилась елочка', 'ЛЕС')).toBeTruthy();
    })

    it('return true if firstStr with uppercase includes secondStr with uppercase', () => {
        expect(isIncludes('в ЛЕСУ родилась елочка', 'ЛЕС')).toBeTruthy();
    })

    it('return true if firstStr with uppercase includes secondStr with lowercase', () => {
        expect(isIncludes('в ЛЕСУ родилась елочка', 'лес')).toBeTruthy();
    })

    it("return false if firstStr doesn't include secondStr", () => {
        expect(isIncludes('в лесу родилась елочка', 'лесочек')).toBeFalsy();
    })
});

describe('truncate', () => {
    const longText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
    it("return 'Lorem i...' if maxlength=7", () => {
        expect(truncate(longText, 7)).toBe('Lorem i...');
    })

    it("return '...' if maxlength=0", () => {
        expect(truncate(longText, 0)).toBe('...');
    })

    it("return text if maxlength > text length", () => {
        expect(truncate(longText, 100500)).toBe(longText);
    })

    it("return 'Lorem i...' if maxlength='7' (type is string)", () => {
        expect(truncate(longText, 7)).toBe('Lorem i...');
    })

    it("return 'Lorem i...' if maxlength=7.5", () => {
        expect(truncate(longText, 7.5)).toBe('Lorem i...');
    })

    it("return text if maxlength=-1", () => {
        expect(truncate(longText, -1)).toBe(longText);
    })
});

describe('changeDateFormat', () => {
    it("changes date if str='12/02/2021 12-00'", () => {
        expect(changeDateFormat('12/02/2021 12-00')).toBe('12.02.2021 12:00');
    })

    it("doesn't change date if str='12-02-2021 12-00'", () => {
        expect(changeDateFormat('12-02-2021 12-00')).toBe('12-02-2021 12-00');
    })

    it("doesn't change date if str='12/02/21 12-00'", () => {
        expect(changeDateFormat('12/02/21 12-00')).toBe('12/02/21 12-00');
    })

    it("doesn't change date if str='1/2/2021 12-00'", () => {
        expect(changeDateFormat('1/2/2021 12-00')).toBe('1/2/2021 12-00');
    })

    it("doesn't change date if str='12-02-2021, 12-00'", () => {
        expect(changeDateFormat('12-02-2021, 12-00')).toBe('12-02-2021, 12-00');
    })

    it("doesn't change date if str='12/02/2021 2-00'", () => {
        expect(changeDateFormat('12/02/2021 2-00')).toBe('12/02/2021 2-00');
    })

    it("doesn't change date if str='12/02/2021 12-1'", () => {
        expect(changeDateFormat('12/02/2021 12-1')).toBe('12/02/2021 12-1');
    })

    it("doesn't change date if str='12/02/2021 12:00'", () => {
        expect(changeDateFormat('12/02/2021 12:00')).toBe('12/02/2021 12:00');
    })
});

describe('validateFIO', () => {
    it("return true if str='Петр Петров Петрович'", () => {
        expect(validateFIO('Петр Петров Петрович')).toBeTruthy();
    })

    it("return true if str='Александра Александрова Александровна'", () => {
        expect(validateFIO('Александра Александрова Александровна')).toBeTruthy();
    })

    it("return true if str='Петр Петров'", () => {
        expect(validateFIO('Петр Петров')).toBeTruthy();
    })

    it("return false if str='Петр Петров Петровский'", () => {
        expect(validateFIO('Петр Петров Петровский')).toBeFalsy();
    })

    it("return false if str='Mark Петров'", () => {
        expect(validateFIO('Mark Петров')).toBeFalsy();
    })

    it("return false if str='Петр Mark'", () => {
        expect(validateFIO('Петр Mark')).toBeFalsy();
    })

    it("return false if str='Петр1 Петров'", () => {
        expect(validateFIO('Петр1 Петров')).toBeFalsy();
    })
});

describe('changeToSnakeCase', () => {
    it("return 'pamal_case' if str='PamalCase'", () => {
        expect(changeToSnakeCase('PamalCase')).toBe('pamal_case');
    });

    it("return 'pamal_case' if str='pamalCase'", () => {
        expect(changeToSnakeCase('pamalCase')).toBe('pamal_case');
    });

    it("return 'pamalcase' if str='Pamalcase'", () => {
        expect(changeToSnakeCase('Pamalcase')).toBe('pamalcase');
    });

    it("return 'pamalcase' if str='pamalcase'", () => {
        expect(changeToSnakeCase('pamalcase')).toBe('pamalcase');
    });

    it("return 'p_a_m_a_l_c_a_s_e' if str='PAMALCASE'", () => {
        expect(changeToSnakeCase('PAMALCASE')).toBe('p_a_m_a_l_c_a_s_e');
    });
});

describe('findComments', () => {
    it("return comment if has only one comment", () => {
        expect(findComments('<!--<title>Home work</title>-->')).toEqual(expect.arrayContaining(['<title>Home work</title>']));
    });

    it("return all comments", () => {
        expect(findComments('<!--<title>Home work1</title>-->\n<!--<title>Home work2</title>-->'))
            .toEqual(expect.arrayContaining(['<title>Home work1</title>', '<title>Home work2</title>',]));
    });

    it("return comment", () => {
        expect(findComments('<!--<title>Home work1</title>-->\n<title>Home work2</title>'))
            .toEqual(expect.arrayContaining(['<title>Home work1</title>']));
    });

    it("return empty array if no comments", () => {
        expect(findComments('<title>Home work1</title>\n<title>Home work2</title>'))
            .toEqual(expect.arrayContaining([]));
    });
});

describe('findNumbers', () => {
    it("return number if has one", () => {
        expect(findNumbers('one 2 three')).toEqual(expect.arrayContaining(['2']));
    });

    it("return all numbers", () => {
        expect(findNumbers('one 2 three 4 5')).toEqual(expect.arrayContaining(['2', '4', '5']));
    });

    it("return empty array numbers", () => {
        expect(findNumbers('one two three')).toEqual(expect.arrayContaining([]));
    });

    it("return float number", () => {
        expect(findNumbers('one 2 three 4.8 5')).toEqual(expect.arrayContaining(['2', '4.8', '5']));
    });
});

describe('searching', () => {
    it("return 'ведется поиск' if str consists of numbers", () => {
        expect(searching('1111222233334444')).toBe('ведется поиск');
    });

    it("return 'ведется поиск' if str consists of latin letters", () => {
        expect(searching('aaaabbbbccccdddd')).toBe('ведется поиск');
    });

    it("return 'ведется поиск' if str splits by '-'", () => {
        expect(searching('1111-2222-3333-4444')).toBe('ведется поиск');
    });

    it("return 'неверный идентификатор' if str splits by '/'", () => {
        expect(searching('1111/2222/3333/4444')).toBe('неверный идентификатор');
    });

    it("return 'неверный идентификатор' if str has other symbol", () => {
        expect(searching('111П222233334444')).toBe('неверный идентификатор');
    });

    it("return 'ведется поиск' if str consists of latin letters (upperCase)", () => {
        expect(searching('AAAABBBBCCCCDDDD')).toBe('ведется поиск');
    });

    it("return 'неверный идентификатор' if str is empty", () => {
        expect(searching('')).toBe('неверный идентификатор');
    });

    it("return 'неверный идентификатор' if str length < 16", () => {
        expect(searching('11112222333344')).toBe('неверный идентификатор');
    });

    it("return 'неверный идентификатор' if str length > 16", () => {
        expect(searching('111122223333444455')).toBe('неверный идентификатор');
    });

    it("return 'неверный идентификатор' if str block length > 4 with splits by '-'", () => {
        expect(searching('1111-2222-3333333-4444')).toBe('неверный идентификатор');
    });

    it("return 'ведется поиск' if str splits by '-' on 2 parts", () => {
        expect(searching('11112222-33334444')).toBe('ведется поиск');
    });
});
