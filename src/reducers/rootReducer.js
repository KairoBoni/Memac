import {combineReducers} from 'redux'
import {userReducer} from '../reducers/userReducer';
import {memoryReducer} from '../reducers/memoryReducer';

export const rootReducer = combineReducers({user: userReducer, memory: memoryReducer});