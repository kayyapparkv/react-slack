import { combineReducers } from 'redux';

import * as actionTypes from '../actions/types';

const initialUserState = {
    currentUser: null,
    isLoading: true,
};

const user_reducer = (state = initialUserState, action) => {
    switch (action.type) {
        case actionTypes.SET_USER:
            return {
                currentUser: action.payload.currentUser,
                isLoading: false
            }
        default:
            return state;
    }
};

const initialLoaderState = {
    isLoading: false,
}

const loader_reducer = (state = initialLoaderState, action) => {
    switch (action.type) {
        case actionTypes.SET_LOADER:
            return {
                isLoading: action.payload.isLoading,
            }
        case actionTypes.REMOVE_LOADER:
            return {
                isLoading: action.payload.isLoading,
            }
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    user: user_reducer,
    loader: loader_reducer
});

export default rootReducer;