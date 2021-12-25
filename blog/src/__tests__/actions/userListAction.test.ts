import { load, updateCurPage, reset } from '../../redux/actions/userListAction';
import * as dummyApi from '../../api/dumMyApi';
import { EMPTY_FUNC } from "../../constants/common";

jest.mock('../../api/dumMyApi');

describe('userListActions test', () => {

    const loadAction = load(1);

    test('load: should call showLoadingAction', async () => {
        const result = {
            data: 'success result',
        }
        await (dummyApi.getUsersInfo as jest.Mock).mockResolvedValue(result);
        const dispatch = jest.fn();
        loadAction(dispatch);
        expect(dispatch).toBeCalledWith({ type: 'USERS/SHOW_LOADING'})
    });

    test('load: should call loadSuccessAction', async () => {
        const apiResult =  {
            data: [
                {
                    id: '60d0fe4f5311236168a109ca',
                    firstName: 'Sara',
                    },
                {
                id: '60d0fe4f5311236168a109b',
                firstName: 'Kara',
                }
        ]};
        (dummyApi.getUsersInfo as jest.Mock).mockResolvedValue(JSON.stringify(apiResult));
        const dispatch = await jest
            .fn()
            .mockImplementationOnce(EMPTY_FUNC)
            .mockImplementationOnce((action) => {
                expect(action).toEqual({
                    type: 'USERS/LOAD_USERS_SUCCESS',
                    list: apiResult,
                })
            });
        loadAction(dispatch);
    });

    test('load: should call loadErrorAction', async () => {
        const error = {
            message: 'error result',
        };
        (dummyApi.getUsersInfo as jest.Mock).mockRejectedValue(error);
        const dispatch = await jest
            .fn()
            .mockImplementationOnce(EMPTY_FUNC)
            .mockImplementationOnce((action) => {
                expect(action).toEqual({
                    type: 'USERS/LOAD_USERS_ERROR',
                    error: error.message,
                })
            });
        await loadAction(dispatch);
    });

    test('load: should call setPageAction', async () => {
        const apiResult = {
            page: 2
        };
        (dummyApi.getUsersInfo as jest.Mock).mockResolvedValue(JSON.stringify(apiResult));
        const dispatch = await jest
            .fn()
            .mockImplementationOnce(EMPTY_FUNC)
            .mockImplementationOnce(EMPTY_FUNC)
            .mockImplementationOnce((action) => {
                expect(action).toEqual({
                    type: 'USERS/SET_PAGE',
                    curPage: apiResult.page,
                })
            });
        loadAction(dispatch);
    });

    describe('updateCurPage test', () => {
        const loadAction = updateCurPage(3);
        test('should call setPageAction', async () => {
            const dispatch = jest.fn();
            loadAction(dispatch);
            expect(dispatch).toBeCalledWith({type: 'USERS/SET_PAGE', curPage: 3})
        });
    });

    describe('reset test', () => {
        const loadAction = reset();
        test('should call resetInfoAction', async () => {
            const dispatch = jest.fn();
            loadAction(dispatch);
            expect(dispatch).toBeCalledWith({type: 'USERS/RESET'})
        });
    });
});
