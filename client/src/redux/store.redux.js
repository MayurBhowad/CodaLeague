import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';

//Reducers
import matchReducer from './reducers/match.reducer';
import teamReducer from './reducers/team.reducer';


const initialState = {};

const middleware = [thunk];

const reducer = combineReducers({
    team: teamReducer,
    match: matchReducer
});

const store = createStore(
    reducer,
    initialState,
    compose(
        applyMiddleware(...middleware),
        // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
)

export default store;