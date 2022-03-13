import { initialState, orderReducer } from './order-details';
import {
    GET_ORDER_REQUEST,
    GET_ORDER_SUCCESS,
    GET_ORDER_FAILED,
    HIDE_ORDER_INFO,
} from "../actions/order-details";

const testOrder = {
    _id: '6133d47647707f001b152b87',
    ingredients: ['60d3b41abdacab0026a733c6'],
    owner: { name: 'Anna' },
    status: 'done',
    name: 'Space флюоресцентный бургер',
    date: '2021-09-04T20:17:58.229Z',
    updatedAt: '2021-09-04T20:17:58.374Z',
    number: '2538',
    price: 2156
}

describe('orderReducer reducer', () => {
    it('should return the initial state', () => {
        expect(orderReducer(undefined, {} as any)).toEqual({
            numberOrder: null,
            orderRequest: false,
            orderRequestFaild: false,
        });
    });
    it('should handle GET_ORDER_REQUEST', () => {
        expect(
            orderReducer(initialState, {
                type: GET_ORDER_REQUEST,
            })
        ).toEqual(
            expect.objectContaining({
                ...initialState,
                numberOrder: null,
                orderRequest: true,
                orderRequestFaild: false,
            })
        );
    });
    it('should handle GET_ORDER_SUCCESS', () => {
        expect(
            orderReducer(initialState, {
                type: GET_ORDER_SUCCESS,
                order: testOrder,
            })
        ).toEqual(
            expect.objectContaining({
                ...initialState,
                orderRequest: false,
                numberOrder: testOrder,
            })
        );
    });
    it('should handle GET_ORDER_FAILED', () => {
        expect(
            orderReducer(initialState, {
                type: GET_ORDER_FAILED,
            })
        ).toEqual(
            expect.objectContaining({
                ...initialState,
                orderRequestFaild: true,
            })
        );
    });
    it('should handle HIDE_ORDER_INFO', () => {
        expect(
            orderReducer(initialState, {
                type: HIDE_ORDER_INFO,
            })
        ).toEqual(
            expect.objectContaining({
                ...initialState,
                numberOrder: null,
            })
        );
    });
});