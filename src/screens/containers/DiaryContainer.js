import Diary from '../components/Diary';
import {connect} from 'react-redux';
import {sendMessage} from '../../actions/';

const mapStateToProps = state => ({
    id: state.user.userId,
    mood: state.memory.mood,
    message: state.memory.message,
});

const mapDispatchToProps = dispatch => ({
    updateMood: mood => {
        dispatch({type: 'UPDATE_MOOD', payload: mood});
    },
    updateMessage: message => {
        dispatch({type: 'UPDATE_MESSAGE', payload: message});
    },
    sendMessage: props => {
        dispatch({type: 'OCCUPIED'});
        dispatch({type: 'UPDATE_MESSAGE', payload: ''});
        return sendMessage(props.id, props.mood, props.message, payload => {
            dispatch({type: 'UPDATE_URI', payload});
            dispatch({type: 'READY'});
        });
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Diary);