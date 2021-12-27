import reducer from '../../redux/reducers/postListReducer';
import { EMPTY_STRING } from "../../constants/common";
import { PAGE_DEFAULT } from '../../constants/api/dumMyApi';

const initialState = {
    list: [],
    loading: false,
    error: EMPTY_STRING,
    total: 0,
    curPage: PAGE_DEFAULT,
}

describe('postListReducer test', () => {

    test('SHOW_LOADING', () => {
        expect(reducer(initialState, {type: 'POSTS/SHOW_LOADING'})).toEqual({
            ...initialState,
            loading: true
        });
    });

    test('HIDE_LOADING', () => {
        const state = {
            ...initialState,
            loading: true,
        }
        expect(reducer(state, {type: 'POSTS/HIDE_LOADING'})).toEqual({
            ...state,
            loading: false
        })
    });

    test('SET_PAGE', () => {
        expect(reducer(initialState, {type:'POSTS/SET_PAGE', curPage: 2})).toEqual({
            ...initialState,
            curPage: 2,
        })
    });

    test('SET_TOTAL', () => {
        expect(reducer(initialState, {type:'POSTS/SET_TOTAL', total: 10})).toEqual({
            ...initialState,
            total: 10,
        })
    });

    test('LOAD_POSTS_SUCCESS', () => {
        const list = [
            {
                id: '60d0fe4f5311236168a109ca',
            },
            {
                id: '60d0fe4f5311236168a109b',
            }
        ]
        expect(reducer(initialState, { type: 'POSTS/LOAD_POSTS_SUCCESS', list })).toEqual({
            ...initialState,
            list
        })
    });

    test('LOAD_POSTS_ERROR', () => {
        const error = 'fatal error'
        expect(reducer(initialState, {type: 'POSTS/LOAD_POSTS_ERROR', error})).toEqual({
            ...initialState,
            error,
        })
    });

    test('RESET', () => {
        const state = {
            list: [
                {
                    id: '60d0fe4f5311236168a109ca',
                },
            ],
            error: 'error',
            total: 10,
            curPage: 5,
        };
        expect(reducer(state, { type: 'POSTS/RESET' })).toEqual({
            ...state,
            list: [],
            error: EMPTY_STRING,
            total: 0,
            curPage: PAGE_DEFAULT,
        })
    });

    test('UNKNOWN ACTION', () => {
        expect(reducer(initialState, {type: 'UNKNOWN'})).toEqual(initialState)
    })
});
