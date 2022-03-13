import { initialState, wsPrivateReducer } from './ws-private-reducer';
import {
    WS_PRIVATE_CONNECTION_START,
    WS_PRIVATE_CONNECTION_ERROR,
    WS_PRIVATE_CONNECTION_CLOSED,
    WS_PRIVATE_GET_ORDERS,
    WS_PRIVATE_SET_ORDER,
} from '../actions/ws-private-actions';

const testOrder = {
    _id: '6133d47647707f001b152b87',
    ingredients: ["60d3b41abdacab0026a733c7", "60d3b41abdacab0026a733c7"],
    status: 'done',
    name: 'Space флюоресцентный бургер',
    date: '2021-09-04T20:17:58.229Z',
    updatedAt: '2021-09-04T20:17:58.374Z',
    number: '2528',
    price: 4324
}

const testError = {
    success: 'true',
    message: 'test error',
    type: 'done',
    code: 123
}

describe('wsPrivateReducer reducer', () => {
    it('should return the initial state', () => {
        expect(wsPrivateReducer(undefined, {} as any)).toEqual({
            wsConnected: false,
            orders: [],
            currentOrder: 0,
            total: 0,
            totalToday: 0,
            error: null,
        });
    });
    it('should handle WS_PRIVATE_CONNECTION_START', () => {
        expect(
            wsPrivateReducer(initialState, {
                type: WS_PRIVATE_CONNECTION_START,
            })
        ).toEqual(
            expect.objectContaining({
                ...initialState,
                wsConnected: true
            })
        );
    });
    it('should handle WS_PRIVATE_CONNECTION_ERROR', () => {
        expect(
            wsPrivateReducer(initialState, {
                type: WS_PRIVATE_CONNECTION_ERROR,
                payload: testError
            })
        ).toEqual(
            expect.objectContaining({
                ...initialState,
                wsConnected: false,
                error: testError
            })
        );
    });
    it('should handle WS_PRIVATE_CONNECTION_CLOSED', () => {
        expect(
            wsPrivateReducer(initialState, {
                type: WS_PRIVATE_CONNECTION_CLOSED,
            })
        ).toEqual(
            expect.objectContaining({
                ...initialState,
                wsConnected: false,
                orders: [],
                total: 0,
                totalToday: 0,
            })
        );
    });
    it('should handle WS_PRIVATE_GET_ORDERS', () => {
        expect(
            wsPrivateReducer(initialState, {
                type: WS_PRIVATE_GET_ORDERS,
                payload: { orders: [testOrder], total: 500, totalToday: 30 }
            })
        ).toEqual(
            expect.objectContaining({
                ...initialState,
                orders: [testOrder],
                total: 500,
                totalToday: 30
            })
        );
    });
    it('should handle WS_PRIVATE_SET_ORDER', () => {
        expect(
            wsPrivateReducer(initialState, {
                type: WS_PRIVATE_SET_ORDER,
                number: 123
            })
        ).toEqual(
            expect.objectContaining({
                ...initialState,
                currentOrder: 123,
            })
        );
    });
});