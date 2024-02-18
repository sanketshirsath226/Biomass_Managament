import {LOGIN_USER_FAIL, LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS} from "../constants/userConstants";
import axios from "../config/axiosConfig";
import {PREDICT_BIOMASS_FAIL, PREDICT_BIOMASS_REQUEST, PREDICT_BIOMASS_SUCCESS} from "../constants/dashboardConstants";

export const predictBiomasss = (token,year,longitude,latitude) => async (dispatch) => {
    try {
        dispatch({ type: PREDICT_BIOMASS_REQUEST });
        const config = {
            headers: {
                "Content-Type": "application/json",
                "x-auth-token" : token
            },
        }
        console.log(token)
        const { data } = await axios.get('/api/v1/prediction/biomass',{
            params: {
                longitude:longitude,
                latitude: latitude,
                year: year
            }
        }, config);
        console.log(data)
        dispatch({
            type: PREDICT_BIOMASS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        console.log(error)
        dispatch({
            type: PREDICT_BIOMASS_FAIL,
            payload: {
                status_code : error.response.status,
                message : error.response.data.message
            },
        });
    }
}
