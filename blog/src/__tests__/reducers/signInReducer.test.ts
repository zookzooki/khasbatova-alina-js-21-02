import reducer from '../../redux/reducers/signInReducer';
import { EMPTY_STRING } from "../../constants/common";

const initialState = {
    loading: false,
    error: EMPTY_STRING,
    isAuth: false,
    info: {},
    redirect: false,
}

describe('signInReducer test', () => {

    test('SHOW_LOADING', () => {
        expect(reducer(initialState, {type: 'SIGNIN/SHOW_LOADING'})).toEqual({
            ...initialState,
            loading: true
        });
    });

    test('HIDE_LOADING', () => {
        const state = {
            ...initialState,
            loading: true,
        }
        expect(reducer(state, {type: 'SIGNIN/HIDE_LOADING'})).toEqual({
            ...state,
            loading: false
        })
    });

    test('LOAD_USER_SUCCESS', () => {
        const info = {
                id: '60d0fe4f5311236168a109ca',
                firstName: 'Sara',
            };
        expect(reducer(initialState, { type: 'SIGNIN/LOAD_USERS_SUCCESS', info })).toEqual({
            ...initialState,
            info,
            loading: false,
            isAuth: true,
            error: '',
        })
    });

    test('LOAD_USER_ERROR', () => {
        const error = 'fatal error'
        expect(reducer(initialState, {type: 'SIGNIN/LOAD_USERS_ERROR', error})).toEqual({
            ...initialState,
            error,
        })
    });

    test('RESET', () => {
        const state = {
            info: {
                    id: '60d0fe4f5311236168a109ca',
                    firstName: 'Sara',
                },
           isAuth: true,
        };
        expect(reducer(state, { type: 'SIGNIN/RESET_INFO' })).toEqual({
            ...state,
            info: {},
            isAuth: false,
        })
    });

    test('CHANGE_REDIRECT', () => {
        expect(reducer(initialState, {type: 'SIGNIN/CHANGE_REDIRECT'})).toEqual({
            ...initialState,
            redirect: true
        });
    });

    test('CANCEL_REDIRECT', () => {
        const state = {
            ...initialState,
            redirect: true,
        }
        expect(reducer(state, {type: 'SIGNIN/CANCEL_REDIRECT'})).toEqual({
            ...state,
            redirect: false
        })
    });

    test('UNKNOWN ACTION', () => {
        expect(reducer(initialState, {type: 'UNKNOWN'})).toEqual(initialState)
    })
});
