import { ProductData } from "@/types/product/productTypes";

type Action =
    | { type: 'SET_FAVORITES'; payload: ProductData[] }
    | { type: "ADD_FAVORITE"; payload: ProductData }
    | { type: "REMOVE_FAVORITE"; payload: string }; // id

export const favoriteProductReducer = (
    state: ProductData[],
    action: Action
): ProductData[] => {
    switch (action.type) {
        case 'SET_FAVORITES':
            return action.payload;
        case "ADD_FAVORITE":
            if (state.some((p) => p._id === action.payload._id)) return state;
            return [...state, { ...action.payload }];

        case "REMOVE_FAVORITE":
            return state.filter((p) => p._id !== action.payload);

        default:
            return state;
    }
};