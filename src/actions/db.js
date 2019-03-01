import 'babel-polyfill';
import axios from 'axios';
import moment from 'moment';

import types from '../action_types';

export const gotSomething = (data) => ({
    type: types.SOMETHING_RECEIVED,
    data
});

export const getSomething = () => {
    return async (dispatch) => {
        try {
            const somethings = (await axios.get(`/api/something`)).data;
            dispatch(gotSomething(somethings));
        }catch (err) {
            console.log('Failed to fetch something', err);
        }
    };
};

// max is not included
function rand(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}