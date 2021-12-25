import reducer from '../../redux/reducers/userListReducer'
import { EMPTY_STRING } from "../../constants/common";
import { PAGE_DEFAULT } from '../../constants/api/dumMyApi';

const initialState = {
    list: [],
    loading: false,
    error: EMPTY_STRING,
    total: 0,
    curPage: PAGE_DEFAULT,
}

describe('userListReducer test', () => {

    test('SHOW_LOADING', () => {
        expect(reducer(initialState, {type: 'USERS/SHOW_LOADING'})).toEqual({
            ...initialState,
            loading: true
        });
    });

    test('HIDE_LOADING', () => {
        const state = {
            ...initialState,
            loading: true,
        }
        expect(reducer(state, {type: 'USERS/HIDE_LOADING'})).toEqual({
            ...state,
            loading: false
        })
    });

    test('SET_PAGE', () => {
        expect(reducer(initialState, {type:'USERS/SET_PAGE', curPage: 2})).toEqual({
            ...initialState,
            curPage: 2,
        })
    });

    test('SET_TOTAL', () => {
        expect(reducer(initialState, {type:'USERS/SET_TOTAL', total: 10})).toEqual({
            ...initialState,
            total: 10,
        })
    });

    test('LOAD_USERS_SUCCESS', () => {
        const list = [
            {
                id: '60d0fe4f5311236168a109ca',
                firstName: 'Sara',
            },
            {
                id: '60d0fe4f5311236168a109b',
                firstName: 'Kara',
            }
        ];
        expect(reducer(initialState, { type: 'USERS/LOAD_USERS_SUCCESS', list })).toEqual({
            ...initialState,
            list
        })
    });

    test('LOAD_USERS_ERROR', () => {
        const error = 'fatal error'
        expect(reducer(initialState, {type: 'USERS/LOAD_USERS_ERROR', error})).toEqual({
            ...initialState,
            error,
        })
    });

    test('RESET', () => {
        const state = {
            list: [
                {
                id: '60d0fe4f5311236168a109ca',
                firstName: 'Sara',
                },
            ],
            loading: false,
            error: 'error',
            total: 10,
            curPage: 5,
        };
        expect(reducer(state, { type: 'USERS/RESET' })).toEqual({
            ...state,
            list: [],
            error: '',
            total: 0,
            curPage: PAGE_DEFAULT,
        })
    });

    test('UNKNOWN ACTION', () => {
        expect(reducer(initialState, {type: 'UNKNOWN'})).toEqual(initialState)
    })
});
