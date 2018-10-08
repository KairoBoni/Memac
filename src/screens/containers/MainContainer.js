import Main from '../components/Main';
import {connect} from 'react-redux';
import {signOut} from '../../actions/';

const mapStateToProps = state => ({
    id: state.user.userId,
    ready: state.appState.ready,
});

const mapDispatchToProps = dispatch => ({
    signOut: async () => { 
        dispatch({ type: 'SET_OCCUPIED'});
        await signOut (() => {
            dispatch({ type: 'LOGOUT'});
            dispatch({ type: 'RESET_MEMORIES'});
        });
        dispatch({ type: 'SET_READY'});
    },      
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);