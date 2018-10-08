import Main from '../components/Main';
import {connect} from 'react-redux';
import {signOut} from '../../actions/';

const mapStateToProps = state => ({
    id: state.user.userId,
    ready: state.appState.ready,
});

const mapDispatchToProps = dispatch => ({
    signOut: () => { 
        dispatch({ type: 'SET_OCCUPIED'});
        signOut (() => {
            dispatch({ type: 'LOGOUT'});
            dispatch({ type: 'RESET_MEMORIES'});
            dispatch({ type: 'SET_READY'});
        });
    },
    changeSeason: () => {
        console.log('make the change season function!');
    }      
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);