import {
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_ORDERS,
    WS_SET_ORDER,
    TWSActions,
} from '../actions/ws-actions';
import { TOrder, TError } from '../../utils/types';

type TWSState = {
    wsConnected: boolean;
    orders: Array<TOrder>;
    currentOrder: number;
    total: number;
    totalToday: number;
    error: TError | null,
}

export const initialState: TWSState = {
    wsConnected: false,
    orders: [],
    currentOrder: 0,
    total: 0,
    totalToday: 0,
    error: null,
};

export const wsReducer = (state = initialState, action: TWSActions): TWSState => {
    switch (action.type) {
        case WS_CONNECTION_SUCCESS:
            return {
                ...state,
                wsConnected: true
            };

        case WS_CONNECTION_CLOSED:
            return {
                ...state,
                orders: [],
                total: 0,
                totalToday: 0,
                wsConnected: false,
            };

        case WS_GET_ORDERS:
            return {
                ...state,
                orders: [...action.payload.orders],
                total: action.payload.total,
                totalToday: action.payload.totalToday
            };

        case WS_SET_ORDER:
            return {
                ...state,
                currentOrder: action.number,
            };
        case WS_CONNECTION_ERROR:
            return {
                ...state,
                wsConnected: false,
                error: action.payload
            }

        default:
            return state;
    }
};