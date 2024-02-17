import {
    createStore,
    combineReducers,
    applyMiddleware
} from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {profileReducer, userReducer} from './reducers/userReducer';
import {HarvestorDashboardReducer} from "./reducers/dsahboardReducer";

const reducer = combineReducers({
    user: userReducer,
    profile: profileReducer,
    harvestDashboard : HarvestorDashboardReducer
});

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(thunk))
);

export default store;
