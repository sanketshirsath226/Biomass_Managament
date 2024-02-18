import {
    createStore,
    combineReducers,
    applyMiddleware
} from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {profileReducer, userReducer} from './reducers/userReducer';
import {HarvestorDashboardReducer} from "./reducers/dsahboardReducer";
import {depotsReducer} from "./reducers/depotsReducer";
import {refineryReducer} from "./reducers/refineryReducer";

const reducer = combineReducers({
    user: userReducer,
    profile: profileReducer,
    harvestDashboard : HarvestorDashboardReducer,
    depot : depotsReducer,
    refinery : refineryReducer
});

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(thunk))
);

export default store;
