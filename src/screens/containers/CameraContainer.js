import Camera from '../components/Camera';
import {connect} from 'react-redux';
import {selectImage, selectVideo, sendMemory} from '../../actions/';

const mapStateToProps = state => ({
    id: state.user.userId,
    mood: state.memory.mood,
    uri: state.memory.uri,
    type: state.memory.type,
});

const mapDispatchToProps = dispatch => ({
    updateMood: mood => {
        dispatch({ type: 'UPDATE_MOOD', payload: mood});
    },
    selectImage: () => {
        selectImage(payload => {
            dispatch({ type: 'UPDATE_URI', payload});
        });
    },
    selectVideo: () => {
        selectVideo(payload => {
            dispatch({ type: 'UPDATE_URI', payload});
        });
    },
    sendMemory: (id, mood, uri, type) => {
        dispatch({type: 'OCCUPIED'});
        return sendMemory(id, mood, uri, type, payload => {
            dispatch({ type: 'UPDATE_URI', payload});
            dispatch({type: 'READY'});
        });
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Camera);