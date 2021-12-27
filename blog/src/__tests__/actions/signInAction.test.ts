import { load, create, reset } from '../../redux/actions/signInAction';
import * as dummyApi from '../../api/dumMyApi';
import { EMPTY_FUNC } from "../../constants/common";

jest.mock('../../api/dumMyApi');

describe('userListActions test', () => {

    describe('load test', () => {

        const loadAction = load('60d0fe4f5311236168a109ca');

        test('should call showLoadingAction', async () => {
            const result = {
                data: 'success result',
            }
            await (dummyApi.getUserByIdShort as jest.Mock).mockResolvedValue(result);
            const dispatch = jest.fn();
            loadAction(dispatch);
            expect(dispatch).toBeCalledWith({type: 'SIGNIN/SHOW_LOADING'})
        });

        test('should call loadSuccessAction', async () => {
            const apiResult = {
                        id: '60d0fe4f5311236168a109ca',
                        firstName: 'Sara',
            };
            (dummyApi.getUserByIdShort as jest.Mock).mockResolvedValue(JSON.stringify(apiResult));
            const dispatch = await jest
                .fn()
                .mockImplementationOnce(EMPTY_FUNC)
                .mockImplementationOnce((action) => {
                    expect(action).toEqual({
                        type: 'SIGNIN/LOAD_USERS_SUCCESS',
                        list: apiResult,
                    })
                });
            loadAction(dispatch);
        });

        test('load: should call loadErrorAction', async () => {
            const error = {
                message: 'error result',
            };
            (dummyApi.getUserByIdShort as jest.Mock).mockRejectedValue(error);
            const dispatch = await jest
                .fn()
                .mockImplementationOnce(EMPTY_FUNC)
                .mockImplementationOnce((action) => {
                    expect(action).toEqual({
                        type: 'SIGNIN/LOAD_USERS_ERROR',
                        error: error.message,
                    })
                });
            await loadAction(dispatch);
        });

        test('should call redirectAction', async () => {
            const apiResult = {
                page: 2
            };
            (dummyApi.getUserByIdShort as jest.Mock).mockResolvedValue(JSON.stringify(apiResult));
            const dispatch = await jest
                .fn()
                .mockImplementationOnce(EMPTY_FUNC)
                .mockImplementationOnce(EMPTY_FUNC)
                .mockImplementationOnce((action) => {
                    expect(action).toEqual({
                        type: 'SIGNIN/CHANGE_REDIRECT',
                    })
                });
            loadAction(dispatch);
        });
    });

    describe('create test', () => {

        const loadAction = create({
            id: '60d0fe4f5311236168a109ca',
            firstName: 'Sara',
            lastName: 'Andersen',
            title: 'ms',
            picture: 'https://randomuser.me/api/portraits/women/58.jpg',
            gender: 'female',
            email: 'sara.andersen@example.com',
            dateOfBirth: '2021-12-08T17:57:51.811Z',
            phone: '+78345345345345454',
            registerDate: '2021-06-21T21:02:07.374Z',
        });

        test('should call showLoadingAction', async () => {
            const result = {
                data: 'success result',
            }
            await (dummyApi.createUser as jest.Mock).mockResolvedValue(result);
            const dispatch = jest.fn();
            loadAction(dispatch);
            expect(dispatch).toBeCalledWith({type: 'SIGNIN/SHOW_LOADING'})
        });

        test('should call loadSuccessAction', async () => {
            const apiResult = {
                id: '60d0fe4f5311236168a109ca',
                firstName: 'Sara',
            };
            (dummyApi.createUser as jest.Mock).mockResolvedValue(JSON.stringify(apiResult));
            const dispatch = await jest
                .fn()
                .mockImplementationOnce(EMPTY_FUNC)
                .mockImplementationOnce((action) => {
                    expect(action).toEqual({
                        type: 'SIGNIN/LOAD_USERS_SUCCESS',
                        list: apiResult,
                    })
                });
            loadAction(dispatch);
        });

        test('load: should call loadErrorAction', async () => {
            const error = {
                message: 'error result',
            };
            (dummyApi.createUser as jest.Mock).mockRejectedValue(error);
            const dispatch = await jest
                .fn()
                .mockImplementationOnce(EMPTY_FUNC)
                .mockImplementationOnce((action) => {
                    expect(action).toEqual({
                        type: 'SIGNIN/LOAD_USERS_ERROR',
                        error: error.message,
                    })
                });
            await loadAction(dispatch);
        });

        test('should call redirectAction', async () => {
            const apiResult = {
                page: 2
            };
            (dummyApi.createUser as jest.Mock).mockResolvedValue(JSON.stringify(apiResult));
            const dispatch = await jest
                .fn()
                .mockImplementationOnce(EMPTY_FUNC)
                .mockImplementationOnce(EMPTY_FUNC)
                .mockImplementationOnce((action) => {
                    expect(action).toEqual({
                        type: 'SIGNIN/CHANGE_REDIRECT',
                    })
                });
            loadAction(dispatch);
        });
    });

    describe('reset test', () => {
        const loadAction = reset();
        test('should call resetInfoAction', async () => {
            const dispatch = jest.fn();
            loadAction(dispatch);
            expect(dispatch).toBeCalledWith({type: 'SIGNIN/RESET_INFO'})
        });
    });
});
