import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import someDataReducer from '../reducers/smth-by-param';

export default () => {
    const store = createStore(
        combineReducers({
            someData: someDataReducer
        }),
        applyMiddleware(thunkMiddleware)
    );

    return store;
};