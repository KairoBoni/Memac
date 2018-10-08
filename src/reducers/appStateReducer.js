const initialState = {
    //transitionLock: false,
    ready: true,
};

export const appStateReducer = (state = initialState, action) => {
    switch (action.type) {
        //case 'TRANSITION_LOCK':
        //    return {...state, transitionLock: true};
        //case 'TRANSITION_UNLOCK':
        //    return {...state, transitionLock: false};
        case 'SET_OCCUPIED':
            return {...state, ready: false};
        case 'SET_READY':
            return {...state, ready: true};
        default:
            return state;
    }
}