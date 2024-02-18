import {
    CLEAR_ERRORS, GET_ALL_DEPOTS_FAIL, GET_ALL_DEPOTS_REQUEST, GET_ALL_DEPOTS_SUCCESS,
    LOAD_USER_FAIL,
    LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOGIN_USER_FAIL,
    LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGOUT_USER_FAIL, LOGOUT_USER_SUCCESS, REGISTER_USER_FAIL,
    REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, VERIFY_USER_FAIL,
    VERIFY_USER_REQUEST, VERIFY_USER_SUCCESS
} from "../constants/userConstants";

export const depotsReducer = (state = { message : "", depots: [] }, { type, payload }) => {

    switch (type) {
        case GET_ALL_DEPOTS_REQUEST:
            return {
                loading: true,
            };
        case GET_ALL_DEPOTS_SUCCESS:
            console.log(payload)
            return {
                ...state,
                loading: false,
                depots: payload,
            };
        case GET_ALL_DEPOTS_FAIL:
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
