import { initialState, burgerIngredientsDataReducer } from './burger-ingredients-data';
import {
    GET_ITEMS_FAILED,
    GET_ITEMS_REQUEST,
    GET_ITEMS_SUCCESS,
} from "../actions/burger-ingredients-data";

const testIngredient = {
calories: 420,
carbohydrates: 53,
fat: 24,
image: "https://code.s3.yandex.net/react/code/bun-02.png",
image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
name: "Краторная булка N-200i",
price: 1255,
proteins: 80,
type: "bun",
__v: 0,
_id: "60d3b41abdacab0026a733c6"
}

describe('burgerIngredientsDataReducer reducer', () => {
    it('should return the initial state', () => {
        expect(burgerIngredientsDataReducer(undefined, {} as any)).toEqual({
            ingredients: [],
            itemsRequest: false,
            itemsFailed: false,
        });

    });
    it('should handle GET_ITEMS_FAILED', () => {
        expect(
            burgerIngredientsDataReducer(initialState, {
                type: GET_ITEMS_FAILED,
            })
        ).toEqual(
            expect.objectContaining({
                ...initialState,
                itemsRequest: false,
                itemsFailed: true,
            })
        );
    });
    it('should handle GET_ITEMS_REQUEST', () => {
        expect(
            burgerIngredientsDataReducer(initialState, {
                type: GET_ITEMS_REQUEST,
            })
        ).toEqual(
            expect.objectContaining({
                ...initialState,
                itemsRequest: true,
                itemsFailed: false,
            })
        );
    });
    it('should handle GET_ITEMS_SUCCESS', () => {
        expect(
            burgerIngredientsDataReducer(initialState, {
                type: GET_ITEMS_SUCCESS,
                ingredients: [testIngredient],
            })
        ).toEqual(
            expect.objectContaining({
                ingredients: [testIngredient],
                itemsRequest: false,
                itemsFailed: false,
            })
        );
    });
});