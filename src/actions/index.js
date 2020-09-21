import * as actioTypes from './types';


export const setUser = user => {
    return {
        type: actioTypes.SET_USER,
        payload: {
            currentUser: user
        }
    }
};

export const setLoader = () => {
    return {
        type: actioTypes.SET_LOADER,
        payload: {
            isLoading: true
        }
    }
};

export const RemoveLoader = () => {
    return {
        type: actioTypes.REMOVE_LOADER,
        payload: {
            isLoading: false
        }
    }
};