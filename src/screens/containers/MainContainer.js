import Main from '../components/Main';
import {connect} from 'react-redux';
import {signOut} from '../../actions/';

const mapStateToProps = state => ({
    id: state.user.userId,
    ready: state.memory.ready,
});

const mapDispatchToProps = dispatch => ({
    signOut: async () => { 
        await dispatch({ type: 'OCCUPIED'});
        await signOut ();
        dispatch({ type: 'LOGOUT'});
        dispatch({ type: 'RESET_MEMORIES'});
        await dispatch({ type: 'READY'});
    },      
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);