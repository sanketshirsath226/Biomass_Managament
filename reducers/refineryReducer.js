import {
    CLEAR_ERRORS,
    GET_ALL_DEPOTS_FAIL,
    GET_ALL_DEPOTS_REQUEST,
    GET_ALL_DEPOTS_SUCCESS, GET_ALL_REFINERY_FAIL, GET_ALL_REFINERY_REQUEST, GET_ALL_REFINERY_SUCCESS
} from "../constants/userConstants";

export const refineryReducer = (state = { message : "", refinery: [] }, { type, payload }) => {

    switch (type) {
        case GET_ALL_REFINERY_REQUEST:
            return {
                loading: true,
            };
        case GET_ALL_REFINERY_SUCCESS:
            console.log(payload)
            return {
                ...state,
                loading: false,
                refinery: payload,
            };
        case GET_ALL_REFINERY_FAIL:
            return {
                loading: false,
                message : payload.message
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
}
