import axios from 'axios';
import types from '../action_types';

export const gotSomethingByParam = (data = []) => ({
    type: types.SOMETHING_RECEIVED,
    data
});

export const setSomethingLoading = (value = void 0) => ({
    type: types.SOMETHING_IS_LOADING,
    value
});

export const getSomethingByParam = (param) => {
    // intentionally not using async/await just to show that it is possible
    return (dispatch) => {
        dispatch(setSomethingLoading(true));
        axios.get(`/api/something`, {
            params: {
                param: param
            }
        }).then((res) => {
            dispatch(gotSomethingByParam(res.data.data));
        }).catch((err) => {
            dispatch(setSomethingLoading(false));
            console.log('Failed to fetch something by param:', err.response.data.reason);
        });
    };
};
