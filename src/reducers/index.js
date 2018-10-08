import {combineReducers} from 'redux'
import {userReducer} from './userReducer';
import {memoryReducer} from './memoryReducer';
import {appStateReducer} from './appStateReducer';

export const rootReducer = combineReducers({user: userReducer, memory: memoryReducer, appState: appStateReducer});