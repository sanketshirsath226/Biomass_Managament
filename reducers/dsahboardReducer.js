import {
    CLEAR_ERRORS,
    USER_DETAILS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_RESET,
    USER_DETAILS_SUCCESS
} from "../constants/userConstants";
import {PREDCIT_BIOMASS_RESET, PREDICT_BIOMASS_FAIL, PREDICT_BIOMASS_REQUEST, PREDICT_BIOMASS_SUCCESS} from "../constants/dashboardConstants";

export const HarvestorDashboardReducer = (state = { biomassPrediction: {},error:{} }, { type, payload }) => {
    switch (type) {
        case PREDICT_BIOMASS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case PREDICT_BIOMASS_SUCCESS:
            return {
                loading: false,
                biomassPrediction: payload,
            };
        case PREDICT_BIOMASS_FAIL:
            return {
                ...state,
                loading: false,
                error: payload,
            };
        case PREDCIT_BIOMASS_RESET:
            return {
                ...state,
                biomassPrediction: {},
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};
