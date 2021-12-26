import {
    WS_PRIVATE_CONNECTION_START,
    WS_PRIVATE_CONNECTION_ERROR,
    WS_PRIVATE_CONNECTION_CLOSED,
    WS_PRIVATE_GET_ORDERS,
    WS_PRIVATE_SET_ORDER,
    TWSPrivateActions
} from '../actions/ws-private-actions';
import { TOrder, TError } from '../../utils/types';

type TWSPState = {
    wsConnected: boolean;
    orders: Array<TOrder>;
    currentOrder: number;
    total: number;
    totalToday: number;
    error: TError | null;
}

export const initialState: TWSPState = {
    wsConnected: false,
    orders: [],
    currentOrder: 0,
    total: 0,
    totalToday: 0,
    error: null,
};

export const wsPrivateReducer = (state = initialState, action: TWSPrivateActions): TWSPState => {
    switch (action.type) {
        case WS_PRIVATE_CONNECTION_START:
            return {
                ...state,
                wsConnected: true
            };

        case WS_PRIVATE_CONNECTION_ERROR:
            return {
                ...state,
                wsConnected: false,
                error: action.payload
            };

        case WS_PRIVATE_CONNECTION_CLOSED:
            return {
                ...state,
                wsConnected: false,
                orders: [],
                total: 0,
                totalToday: 0,
            };

        case WS_PRIVATE_GET_ORDERS:
            return {
                ...state,
                orders: [...action.payload.orders],
                total: action.payload.total,
                totalToday: action.payload.totalToday
            };

        case WS_PRIVATE_SET_ORDER:
            return {
                ...state,
                currentOrder: action.number,
            };

        default:
            return state;
    }
};