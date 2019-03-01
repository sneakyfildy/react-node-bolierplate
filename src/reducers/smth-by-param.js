import types from '../action_types';
const somethingByParamDefaultState = {
    items: null,
    isLoading: false
};

export default (state = somethingByParamDefaultState, action) => {
    switch (action.type) {
        case types.SOMETHING_RECEIVED:
            return {
                items: action.data,
                isLoading: false
            };
        case types.SOMETHING_IS_LOADING:
            return {
                ...state,
                isLoading: !!action.value
            };
        default:
            return state;
    }
};
