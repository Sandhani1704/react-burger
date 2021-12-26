import { TOrder, TError } from "../../utils/types";
export const WS_CONNECTION_START: 'WS_CONNECTION_START' = 'WS_CONNECTION_START';
export const WS_CONNECTION_SUCCESS: 'WS_CONNECTION_SUCCESS' = 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_ERROR: 'WS_CONNECTION_ERROR' = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSED: 'WS_CONNECTION_CLOSED' = 'WS_CONNECTION_CLOSED';
export const WS_GET_ORDERS: 'WS_GET_ORDERS' = 'WS_GET_ORDERS';
export const WS_SET_ORDER: 'WS_SET_ORDER' = 'WS_SET_ORDER';
export const WS_SEND_MESSAGE: 'WS_SEND_MESSAGE' = 'WS_SEND_MESSAGE';
export const CLOSE_POPUP_ORDER_INFO: 'CLOSE_POPUP_ORDER_INFO' = 'CLOSE_POPUP_ORDER_INFO'; 
export const OPEN_POPUP_ORDER_INFO: 'OPEN_POPUP_ORDER_INFO' = 'OPEN_POPUP_ORDER_INFO';

type TWSOpenPopupOrderInfoAction = {
    type: typeof OPEN_POPUP_ORDER_INFO
}

type TWSClosePopupOrderInfoAction = {
    type: typeof CLOSE_POPUP_ORDER_INFO
}

type TWSConnectionSuccessAction = {
    type: typeof WS_CONNECTION_SUCCESS
}

type TWSConnectionStartAction = {
    type: typeof WS_CONNECTION_START
}

type TWSConnectionErrorAction = {
    type: typeof WS_CONNECTION_ERROR;
    payload: TError | null;
}

type TWSConnectionClosedAction = {
    type: typeof WS_CONNECTION_CLOSED
}

type TWSGetOrdersAction = {
    type: typeof WS_GET_ORDERS;
    payload: { orders: Array<TOrder>; total: number; totalToday: number }
}

type TWSSetOrderAction = {
    type: typeof WS_SET_ORDER;
    number: number;
}

type TWSSendMessage = {
    type: typeof WS_SEND_MESSAGE;
}

export const wsActions = {
    wsInit: WS_CONNECTION_START as typeof WS_CONNECTION_START,
    onOpen: WS_CONNECTION_SUCCESS as typeof WS_CONNECTION_SUCCESS,
    onError: WS_CONNECTION_ERROR as typeof WS_CONNECTION_ERROR,
    onClose: WS_CONNECTION_CLOSED as typeof WS_CONNECTION_CLOSED,
    onMessage: WS_GET_ORDERS as typeof WS_GET_ORDERS,
    wsSendMessage: WS_SEND_MESSAGE as typeof WS_SEND_MESSAGE,
};

export type TWsActions = typeof wsActions;

export type TWSActions = TWSConnectionSuccessAction |
    TWSConnectionStartAction |
    TWSConnectionErrorAction |
    TWSConnectionClosedAction |
    TWSGetOrdersAction |
    TWSSetOrderAction | TWSSendMessage | TWSClosePopupOrderInfoAction 
    | TWSOpenPopupOrderInfoAction 