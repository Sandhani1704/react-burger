import { initialState, ingredientReducer } from './ingredient-details';
import {
    DISPLAY_INGREDIENT_INFO,
    HIDE_INGREDIENT_INFO,
} from "../actions/ingredient-details";

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

describe('ingredientReducer reducer', () => {
    it('should return the initial state', () => {
        expect(ingredientReducer(undefined, {} as any)).toEqual({
            selectedIngredient: null,
        });
    });
    it('should handle GET_ITEMS_FAILED', () => {
        expect(
            ingredientReducer(initialState, {
                type: DISPLAY_INGREDIENT_INFO,
                info: testIngredient
            })
        ).toEqual(
            expect.objectContaining({
                ...initialState,
                selectedIngredient: testIngredient
            })
        );
    });
    it('should handle HIDE_INGREDIENT_INFO', () => {
        expect(
            ingredientReducer(initialState, {
                type: HIDE_INGREDIENT_INFO,
            })
        ).toEqual(
            expect.objectContaining({
                ...initialState,
                selectedIngredient: null
            })
        );
    });
});