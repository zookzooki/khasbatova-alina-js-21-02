import { load, reset, visibleModal, notVisibleModal, updateProfile } from '../../redux/actions/profileAction';
import * as dummyApi from '../../api/dumMyApi';
import { EMPTY_FUNC } from "../../constants/common";

jest.mock('../../api/dumMyApi');

describe('profileAction test', () => {

    describe('load test', () => {

        const loadAction = load('60d0fe4f5311236168a109ca');

        test('should call showLoadingAction', async () => {
            const result = {
                data: 'success result',
            }
            await (dummyApi.getUserByIdShort as jest.Mock).mockResolvedValue(result);
            const dispatch = jest.fn();
            loadAction(dispatch);
            expect(dispatch).toBeCalledWith({type: 'PROFILE/SHOW_LOADING'});
        });

        test('should call loadSuccessAction', async () => {
            const apiResult = {
                id: '60d0fe4f5311236168a109ca',
                firstName: 'Sara',
            };
            (dummyApi.getUserById as jest.Mock).mockResolvedValue(JSON.stringify(apiResult));
            const dispatch = await jest
                .fn()
                .mockImplementationOnce(EMPTY_FUNC)
                .mockImplementationOnce((action) => {
                    expect(action).toEqual({
                        type: 'PROFILE/LOAD_PROFILE_SUCCESS',
                        list: apiResult,
                    })
                });
            loadAction(dispatch);
        });

        test('load: should call loadErrorAction', async () => {
            const error = {
                message: 'error result',
            };
            (dummyApi.getUserById as jest.Mock).mockRejectedValue(error);
            const dispatch = await jest
                .fn()
                .mockImplementationOnce(EMPTY_FUNC)
                .mockImplementationOnce((action) => {
                    expect(action).toEqual({
                        type: 'PROFILE/LOAD_PROFILE_ERROR',
                        error: error.message,
                    })
                });
            await loadAction(dispatch);
        });
    });

    describe('update test', () => {

        const loadAction = updateProfile('60d0fe4f5311236168a109ca', {
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
            await (dummyApi.updateUser as jest.Mock).mockResolvedValue(result);
            const dispatch = jest.fn();
            loadAction(dispatch);
            expect(dispatch).toBeCalledWith({type: 'PROFILE/SHOW_LOADING'});
        });

        test('should call loadSuccessAction', async () => {
            const apiResult = {
                id: '60d0fe4f5311236168a109ca',
                firstName: 'Sara',
            };
            (dummyApi.updateUser as jest.Mock).mockResolvedValue(JSON.stringify(apiResult));
            const dispatch = await jest
                .fn()
                .mockImplementationOnce(EMPTY_FUNC)
                .mockImplementationOnce((action) => {
                    expect(action).toEqual({
                        type: 'PROFILE/LOAD_PROFILE_SUCCESS',
                        list: apiResult,
                    })
                });
            loadAction(dispatch);
        });

        test('load: should call loadErrorAction', async () => {
            const error = {
                message: 'error result',
            };
            (dummyApi.updateUser as jest.Mock).mockRejectedValue(error);
            const dispatch = await jest
                .fn()
                .mockImplementationOnce(EMPTY_FUNC)
                .mockImplementationOnce((action) => {
                    expect(action).toEqual({
                        type: 'PROFILE/LOAD_PROFILE_ERROR',
                        error: error.message,
                    })
                });
            await loadAction(dispatch);
        });
    });

    describe('reset test', () => {
        const loadAction = reset();
        test('should call resetInfoAction', async () => {
            const dispatch = jest.fn();
            loadAction(dispatch);
            expect(dispatch).toBeCalledWith({type: 'PROFILE/RESET'})
        });
    });

    describe('visibleModal test', () => {
        const loadAction = visibleModal();
        test('should call visibleModalAction', async () => {
            const dispatch = jest.fn();
            loadAction(dispatch);
            expect(dispatch).toBeCalledWith({type: 'PROFILE/VISIBLE_MODAL'})
        });
    });

    describe('notVisibleModal test', () => {
        const loadAction = notVisibleModal();
        test('should call notVisibleModalAction', async () => {
            const dispatch = jest.fn();
            loadAction(dispatch);
            expect(dispatch).toBeCalledWith({type: 'PROFILE/NOT_VISIBLE_MODAL'})
        });
    });
});
