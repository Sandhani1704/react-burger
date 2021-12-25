import type { MiddlewareAPI, AnyAction } from 'redux';
import { TWsPrivateActions } from '../actions/ws-private-actions';
import { TWsActions } from '../actions/ws-actions';

export const socketMiddleware = (wsActions: TWsActions | TWsPrivateActions) => {
  return (store: MiddlewareAPI) => {
    let socket: WebSocket | null = null;
    return (next: (i: AnyAction) => void) => (action: AnyAction) => {
      const { dispatch } = store;
      const { type, payload, wsUrl, token } = action;
      const { wsInit, wsSendMessage, onOpen, onClose, onError, onMessage } = wsActions;
      
      if (type === wsInit) {
        socket = token
          ? new WebSocket(`${wsUrl}?token=${token}`)
          : new WebSocket(`${wsUrl}`);
      }
      if (socket?.readyState === 1 && type === onClose) {
        socket?.close()
      }
            if (socket) {
        socket.onopen = (event) => {
          dispatch({ type: onOpen, payload: event });
        };
        socket.onerror = (event) => {
          dispatch({ type: onError, payload: event });
        };
        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;
          dispatch({ type: onMessage, payload: restParsedData });
        };
        socket.onclose = (event) => {
          dispatch({ type: onClose, payload: event });
        };
        if (type === wsSendMessage) {
          const message = token ? { ...payload, token } : { ...payload };
          socket.send(JSON.stringify(message));
        }
      }
      next(action);
    };
  };
};
