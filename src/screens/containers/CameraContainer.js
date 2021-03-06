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
        dispatch({type: 'UPDATE_MOOD', payload: mood});
    },
    selectImage: cb => {
        selectImage(payload => {
            dispatch({type: 'UPDATE_URI', payload});
            cb();
        });
    },
    selectVideo: cb => {
        selectVideo(payload => {
            dispatch({type: 'UPDATE_URI', payload});
            cb();
        });
    },
    sendMemory: (id, mood, uri, type) => {
        dispatch({type: 'SET_OCCUPIED'});
        return sendMemory(id, mood, uri, type, payload => {
            dispatch({type: 'UPDATE_URI', payload});
            dispatch({type: 'SET_READY'});
        });
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Camera);