import { initialState, wsReducer } from './ws-reducer';
import {
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_ORDERS,
    WS_SET_ORDER,
    OPEN_POPUP_ORDER_INFO,
    CLOSE_POPUP_ORDER_INFO,
} from '../actions/ws-actions';

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

describe('wsReducer reducer', () => {
    it('should return the initial state', () => {
        expect(wsReducer(undefined, {} as any)).toEqual({
            wsConnected: false,
            orders: [],
            currentOrder: 0,
            total: 0,
            totalToday: 0,
            error: null,
            popupOrderInfo: false
        });
    });
    it('should handle WS_CONNECTION_SUCCESS', () => {
        expect(
            wsReducer(initialState, {
                type: WS_CONNECTION_SUCCESS,
            })
        ).toEqual(
            expect.objectContaining({
                ...initialState,
                wsConnected: true
            })
        );
    });
    it('should handle WS_CONNECTION_ERROR', () => {
        expect(
            wsReducer(initialState, {
                type: WS_CONNECTION_ERROR,
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
    it('should handle WS_CONNECTION_CLOSED', () => {
        expect(
            wsReducer(initialState, {
                type: WS_CONNECTION_CLOSED,
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
    it('should handle WS_GET_ORDERS', () => {
        expect(
            wsReducer(initialState, {
                type: WS_GET_ORDERS,
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
    it('should handle WS_SET_ORDER', () => {
        expect(
            wsReducer(initialState, {
                type: WS_SET_ORDER,
                number: 321
            })
        ).toEqual(
            expect.objectContaining({
                ...initialState,
                currentOrder: 321,
            })
        );
    });
    it('should handle OPEN_POPUP_ORDER_INFO', () => {
        expect(
            wsReducer(initialState, {
                type: OPEN_POPUP_ORDER_INFO,
            })
        ).toEqual(
            expect.objectContaining({
                ...initialState,
                popupOrderInfo: true
            })
        );
    });
    it('should handle CLOSE_POPUP_ORDER_INFO', () => {
        expect(
            wsReducer(initialState, {
                type: CLOSE_POPUP_ORDER_INFO,
            })
        ).toEqual(
            expect.objectContaining({
                ...initialState,
                wsConnected: true,
                popupOrderInfo: false
            })
        );
    });
});