import reducer from '../../redux/reducers/commentListReducer';
import { EMPTY_STRING } from "../../constants/common";
import { PAGE_DEFAULT } from '../../constants/api/dumMyApi';

const initialState = {
    list: [],
    loading: false,
    error: EMPTY_STRING,
    total: 0,
    curPage: PAGE_DEFAULT,
    visibleModal: false,
    post: {},
}

describe('commentListReducer test', () => {

    test('SHOW_LOADING', () => {
        expect(reducer(initialState, {type: 'COMMENTS/SHOW_LOADING'})).toEqual({
            ...initialState,
            loading: true
        });
    });

    test('HIDE_LOADING', () => {
        const state = {
            ...initialState,
            loading: true,
        }
        expect(reducer(state, {type: 'COMMENTS/HIDE_LOADING'})).toEqual({
            ...state,
            loading: false
        })
    });

    test('SET_PAGE', () => {
        expect(reducer(initialState, {type:'COMMENTS/SET_PAGE', curPage: 2})).toEqual({
            ...initialState,
            curPage: 2,
        })
    });

    test('SET_TOTAL', () => {
        expect(reducer(initialState, {type:'COMMENTS/SET_TOTAL', total: 10})).toEqual({
            ...initialState,
            total: 10,
        })
    });

    test('SET_POST', () => {
        const post = {id: '60d0fe4f5311236168a109ca'};
        expect(reducer(initialState, {type:'COMMENTS/SET_POST', post})).toEqual({
            ...initialState,
            post,
        })
    });

    test('LOAD_COMMENTS_SUCCESS', () => {
        const list = [
            {
                id: '60d0fe4f5311236168a109ca',
            },
            {
                id: '60d0fe4f5311236168a109b',
            }
        ]
        expect(reducer(initialState, { type: 'COMMENTS/LOAD_COMMENTS_SUCCESS', list })).toEqual({
            ...initialState,
            list,
        })
    });

    test('LOAD_COMMENTS_ERROR', () => {
        const error = 'fatal error'
        expect(reducer(initialState, {type: 'COMMENTS/LOAD_COMMENTS_ERROR', error})).toEqual({
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
            visibleModal: true,
            post: {id: '90d0fe4f5311236168a109ca'}
        };
        expect(reducer(state, { type: 'COMMENTS/RESET' })).toEqual({
            ...state,
            list: [],
            error: EMPTY_STRING,
            total: 0,
            curPage: PAGE_DEFAULT,
            visibleModal: false,
            post: {},
        })
    });

    test('VISIBLE_MODAL', () => {
        const state = {
            ...initialState,
            visibleModal: false,
        }
        expect(reducer(state, {type: 'COMMENTS/VISIBLE_MODAL'})).toEqual({
            ...state,
            visibleModal: true,
        })
    });

    test('NOT_VISIBLE_MODAL', () => {
        const state = {
            ...initialState,
            visibleModal: true,
        }
        expect(reducer(state, {type: 'COMMENTS/NOT_VISIBLE_MODAL'})).toEqual({
            ...state,
            visibleModal: false,
        })
    });

    test('UNKNOWN ACTION', () => {
        expect(reducer(initialState, {type: 'UNKNOWN'})).toEqual(initialState)
    })
});
