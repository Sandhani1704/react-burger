import { initialState, constructorReducer } from './burgers-constructor';

import {
    ADD_INGREDIENT,
    DELETE_INGREDIENT,
    SORT_INGREDIENTS,
    CLEAR_PREV_ORDER,
    CHANGE_ACTIVE_TAB,
} from "../actions/burgers-constructor";

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
const testIngredient2 = {
    calories: 643,
    carbohydrates: 85,
    fat: 26,
    image: "https://code.s3.yandex.net/react/code/bun-01.png",
    image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
    image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
    name: "Флюоресцентная булка R2-D3",
    price: 988,
    proteins: 44,
    type: "bun",
    __v: 0,
    _id: "60d3b41abdacab0026a733c7"
}

describe('burger-constructor reducer', () => {
    it('should return the initial state', () => {
        expect(constructorReducer(undefined, {} as any)).toEqual({
            addedIngredients: [],
            currentTab: 'buns'
        });
    });
    it('should handle ADD_INGREDIENT', () => {
        expect(
            constructorReducer(initialState, {
                type: ADD_INGREDIENT,
                ingredient: testIngredient
            })
        ).toEqual(
            expect.objectContaining({
                addedIngredients: [testIngredient, testIngredient]
            })
        );
    });

    it('should handle DELETE_INGREDIENT', () => {
        expect(
            constructorReducer(
                {
                    ...initialState,
                    addedIngredients: [testIngredient]
                },
                {
                    type: DELETE_INGREDIENT,
                    index: 0
                }
            )
        ).toEqual(
            expect.objectContaining({
                addedIngredients: []
            })
        );
    });
    it('should handle SORT_INGREDIENTS', () => {
        expect(
            constructorReducer(
                { ...initialState, addedIngredients: [testIngredient, testIngredient2] },
                { type: SORT_INGREDIENTS, dragIndex: 0, hoverIndex: 1 }
            )
        ).toEqual(
            expect.objectContaining({
                ...initialState,
                addedIngredients: [testIngredient2, testIngredient],
            })
        );
    });

    it('should handle CLEAR_PREV_ORDER', () => {
        expect(
            constructorReducer(
                { ...initialState, addedIngredients: [testIngredient, testIngredient2] },
                { type: CLEAR_PREV_ORDER }
            )
        ).toEqual(
            expect.objectContaining({
                ...initialState,
                addedIngredients: [],
            })
        );
    });
    it('should handle CHANGE_ACTIVE_TAB', () => {
        expect(
            constructorReducer({
                ...initialState,
                currentTab: 'main'
            },
                { type: CHANGE_ACTIVE_TAB, activeTab: 'sauces' }
            )
        ).toEqual(
            expect.objectContaining({
                ...initialState,
                currentTab: 'sauces',
            })
        );
    });

})