import { initialState, userReducer } from './user-info';
import {
    GET_USER_REQUEST,
    SET_USER_INFO,
    REMOVE_USER_INFO,
    RESPONSED_EMAIL,
    SET_LOGIN_REQUEST_ERROR,
    SET_REGISTER_REQUEST_ERROR,
    SET_LOGOUT_REQUEST_ERROR,
    REFRESH_TOKEN_REQUEST,
    REFRESH_TOKEN_ERROR,
    REFRESH_TOKEN_SUCCESS,
} from "../actions/user-info";

describe('userReducer reducer', () => {
    it('should return the initial state', () => {
        expect(userReducer(undefined, {} as any)).toEqual({
            userUnfo: { name: "", email: "" },
            userRequest: false,
            registerError: '',
            loginError: '',
            logOutError: '',
            isResponsedEmail: false,
            refreshTokenRequest: false,
            refreshTokenSuccess: false,
            refreshTokenError: false,
        });
    });
    it('should handle GET_USER_REQUEST', () => {
        expect(
            userReducer(initialState, {
                type: GET_USER_REQUEST,
            })
        ).toEqual(
            expect.objectContaining({
                ...initialState,
                userRequest: true,
            })
        );
    });
    it('should handle SET_USER_INFO', () => {
        expect(
            userReducer(initialState, {
                type: SET_USER_INFO,
                user: { name: 'Anna', email: 'angalkina1704@gmail.com' }
            })
        ).toEqual(
            expect.objectContaining({
                ...initialState,
                userRequest: false,
                userUnfo: {
                    name: 'Anna',
                    email: 'angalkina1704@gmail.com'
                },
            })
        );
    });
    it('should handle REMOVE_USER_INFO', () => {
        expect(
            userReducer(initialState, {
                type: REMOVE_USER_INFO,
            })
        ).toEqual(
            expect.objectContaining({
                ...initialState,
                userRequest: false,
                userUnfo: {
                    name: '',
                    email: ''
                },
            })
        );
    });
    it('should handle RESPONSED_EMAIL', () => {
        expect(
            userReducer(initialState, {
                type: RESPONSED_EMAIL,
            })
        ).toEqual(
            expect.objectContaining({
                ...initialState,
                isResponsedEmail: true,
            })
        );
    });
    it('should handle SET_LOGIN_REQUEST_ERROR', () => {
        expect(
            userReducer(initialState, {
                type: SET_LOGIN_REQUEST_ERROR,
                message: 'Test error'
            })
        ).toEqual(
            expect.objectContaining({
                ...initialState,
                loginError: 'Test error',
            })
        );
    });
    it('should handle SET_REGISTER_REQUEST_ERROR', () => {
        expect(
            userReducer(initialState, {
                type: SET_REGISTER_REQUEST_ERROR,
                message: 'Test error'
            })
        ).toEqual(
            expect.objectContaining({
                ...initialState,
                registerError: 'Test error',
            })
        );
    });
    it('should handle SET_LOGOUT_REQUEST_ERROR', () => {
        expect(
            userReducer(initialState, {
                type: SET_LOGOUT_REQUEST_ERROR,
                message: 'Test error'
            })
        ).toEqual(
            expect.objectContaining({
                ...initialState,
                logOutError: 'Test error',
            })
        );
    });
    it('should handle REFRESH_TOKEN_REQUEST', () => {
        expect(
            userReducer(initialState, {
                type: REFRESH_TOKEN_REQUEST,
            })
        ).toEqual(
            expect.objectContaining({
                ...initialState,
                refreshTokenRequest: true,
                refreshTokenSuccess: false,
                refreshTokenError: false,
            })
        );
    });
    it('should handle REFRESH_TOKEN_ERROR', () => {
        expect(
            userReducer(initialState, {
                type: REFRESH_TOKEN_ERROR,
            })
        ).toEqual(
            expect.objectContaining({
                ...initialState,
                refreshTokenRequest: false,
                refreshTokenSuccess: false,
                refreshTokenError: true,
            })
        );
    });
    it('should handle REFRESH_TOKEN_SUCCESS', () => {
        expect(
            userReducer(initialState, {
                type: REFRESH_TOKEN_SUCCESS,
            })
        ).toEqual(
            expect.objectContaining({
                ...initialState,
                refreshTokenRequest: false,
                refreshTokenSuccess: true,
                refreshTokenError: false,
            })
        );
    });
});