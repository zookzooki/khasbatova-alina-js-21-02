import reducer from '../../redux/reducers/profileReducer';
import { EMPTY_STRING } from "../../constants/common";

const initialState = {
    info: {},
    loading: false,
    error: EMPTY_STRING,
    visibleModal: false,
}

describe('profileReducer test', () => {

    test('SHOW_LOADING', () => {
        expect(reducer(initialState, {type: 'PROFILE/SHOW_LOADING'})).toEqual({
            ...initialState,
            loading: true
        });
    });

    test('HIDE_LOADING', () => {
        const state = {
            ...initialState,
            loading: true,
        }
        expect(reducer(state, {type: 'PROFILE/HIDE_LOADING'})).toEqual({
            ...state,
            loading: false
        })
    });

    test('LOAD_PROFILE_SUCCESS', () => {
        const info = {
            id: '60d0fe4f5311236168a109ca',
            firstName: 'Sara',
        };
        expect(reducer(initialState, { type: 'PROFILE/LOAD_PROFILE_SUCCESS', info })).toEqual({
            ...initialState,
            info,
            loading: false,
        })
    });

    test('LOAD_PROFILE_ERROR', () => {
        const error = 'fatal error'
        expect(reducer(initialState, {type: 'PROFILE/LOAD_PROFILE_ERROR', error})).toEqual({
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
        expect(reducer(state, { type: 'PROFILE/RESET' })).toEqual({
            ...state,
            info: {},
            visibleModal: false,
            error: EMPTY_STRING,
        })
    });

    test('VISIBLE_MODAL', () => {
        const state = {
            ...initialState,
            visibleModal: false,
        }
        expect(reducer(state, {type: 'PROFILE/VISIBLE_MODAL'})).toEqual({
            ...state,
            visibleModal: true,
        })
    });

    test('NOT_VISIBLE_MODAL', () => {
        const state = {
            ...initialState,
            visibleModal: true,
        }
        expect(reducer(state, {type: 'PROFILE/NOT_VISIBLE_MODAL'})).toEqual({
            ...state,
            visibleModal: false,
        })
    });

    test('UNKNOWN ACTION', () => {
        expect(reducer(initialState, {type: 'UNKNOWN'})).toEqual(initialState)
    })
});
