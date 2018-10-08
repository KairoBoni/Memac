import {season} from '../utils/Season.js';
const initialState = {
    mood: season,
    message: 'Hello!',
    uri: null,
    type: null,
    memories: [],
    index: 0,
    text: '',
};

export const memoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_MOOD':
            return {...state, mood: action.payload};
        case 'UPDATE_MESSAGE':
            return {...state, message: action.payload};
        case 'UPDATE_URI':
            return {...state, uri: action.payload.uri, type: action.payload.type};
        case 'UPDATE_MEMORIES':
            return {...state, memories: action.payload};    
        case 'CHANGE_INDEX':
            const index = (state.index - action.payload + state.memories.length) % state.memories.length 
            return {...state, index};
        case 'RESET_MEMORIES':
            return initialState;
        case 'UPDATE_TEXT':
            return {...state, text: action.payload};
        default:
            return state;
    }
}