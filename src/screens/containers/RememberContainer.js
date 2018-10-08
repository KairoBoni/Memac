import Remember from '../components/Remember';
import {connect} from 'react-redux';
import {searchMemory, deleteMemory} from '../../actions/';

const mapStateToProps = state => ({
    id: state.user.userId,
    mood: state.memory.mood,
    memories: state.memory.memories,
});

const mapDispatchToProps = dispatch => ({
    updateMood: mood => {
        dispatch({ type: 'UPDATE_MOOD', payload: mood});
    },
    searchMemory: (id, mood) => {
        searchMemory(id, mood, payload => {
            dispatch({ type: 'UPDATE_MEMORIES', payload});
        });
    },
    deleteMemory: (id, child, mood) => {
        dispatch({type: 'SET_OCCUPIED'});
        deleteMemory(id, child, () => {
            searchMemory(id, mood, payload => {
                dispatch({type: 'UPDATE_MEMORIES', payload});
                dispatch({type: 'SET_READY'});
            });
        });
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Remember);