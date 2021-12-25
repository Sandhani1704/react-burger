import { TOrder, TError } from "../../utils/types";
export const WS_PRIVATE_CONNECTION_START: 'WS_CONNECTION_START' = 'WS_CONNECTION_START';
export const WS_PRIVATE_CONNECTION_SUCCESS: 'WS_CONNECTION_SUCCESS' = 'WS_CONNECTION_SUCCESS';
export const WS_PRIVATE_CONNECTION_ERROR: 'WS_CONNECTION_ERROR' = 'WS_CONNECTION_ERROR';
export const WS_PRIVATE_CONNECTION_CLOSED: 'WS_CONNECTION_CLOSED' = 'WS_CONNECTION_CLOSED';
export const WS_PRIVATE_GET_ORDERS: 'WS_GET_ORDERS' = 'WS_GET_ORDERS';
export const WS_PRIVATE_SET_ORDER: 'WS_SET_ORDER' = 'WS_SET_ORDER';
export const WS_PRIVATE_SEND_MESSAGE: 'WS_SEND_MESSAGE' = 'WS_SEND_MESSAGE';

type TWSConnectionPrivateSuccessAction = {
    type: typeof WS_PRIVATE_CONNECTION_SUCCESS
}

type TWSConnectionPrivateStartAction = {
    type: typeof WS_PRIVATE_CONNECTION_START
}

type TWSConnectionPrivateErrorAction = {
    type: typeof WS_PRIVATE_CONNECTION_ERROR;
    payload: TError | null;
}

type TWSConnectionPrivateClosedAction = {
    type: typeof WS_PRIVATE_CONNECTION_CLOSED
}

// type TWSCloseConnectionAction = {
//     type: typeof WS_CLOSE_CONNECTION
// }

type TWSGetOrdersPrivateAction = {
    type: typeof WS_PRIVATE_GET_ORDERS;
    payload: { orders: Array<TOrder>; total: number; totalToday: number }
}

type TWSSetOrderPrivateAction = {
    type: typeof WS_PRIVATE_SET_ORDER;
    number: number;
}

type TWSSendPrivateMessage = {
    type: typeof WS_PRIVATE_SEND_MESSAGE;
}

export const wsPrivateActions = {
    wsInit: WS_PRIVATE_CONNECTION_START as typeof WS_PRIVATE_CONNECTION_START,
    onOpen: WS_PRIVATE_CONNECTION_SUCCESS as typeof WS_PRIVATE_CONNECTION_SUCCESS,
    onError: WS_PRIVATE_CONNECTION_ERROR as typeof WS_PRIVATE_CONNECTION_ERROR,
    onClose: WS_PRIVATE_CONNECTION_CLOSED as typeof WS_PRIVATE_CONNECTION_CLOSED,
    onMessage: WS_PRIVATE_GET_ORDERS as typeof WS_PRIVATE_GET_ORDERS,
    wsSendMessage: WS_PRIVATE_SEND_MESSAGE as typeof WS_PRIVATE_SEND_MESSAGE,
};

export type TWsPrivateActions = typeof wsPrivateActions;

export type TWSPrivateActions = TWSConnectionPrivateSuccessAction |
TWSConnectionPrivateStartAction |
TWSConnectionPrivateErrorAction |
TWSConnectionPrivateClosedAction |
TWSGetOrdersPrivateAction |
TWSSetOrderPrivateAction | TWSSendPrivateMessage