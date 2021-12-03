import {SET_COORDINATES, CLEAR_COORDINATES} from "../action-types";

const initialState = {
    coordinates: [],
    fromHere: false
};

export default function map(state = initialState, action) {
    switch (action.type) {
        case SET_COORDINATES:
            return {
                coordinates: action.payload.coordinates,
                fromHere: action.payload.fromHere
            };

        case CLEAR_COORDINATES:
            return {
                coordinates: [],
                fromHere: false
            };
        default:
            return state;
    }
};