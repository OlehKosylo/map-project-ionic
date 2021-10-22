import {SET_COORDINATES, CLEAR_COORDINATES} from "../action-types";

const initialState = {
    coordinates: [],
};

export default function map(state = initialState, action) {
    switch (action.type) {
        case SET_COORDINATES:
            return {
                coordinates: action.payload
            };

        case CLEAR_COORDINATES:
            return {
                coordinates: []
            };
        default:
            return state;
    }
};