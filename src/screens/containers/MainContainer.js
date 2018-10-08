import Main from '../components/Main';
import {connect} from 'react-redux';
import {signOut} from '../../actions/';

const mapStateToProps = state => ({
    ready: state.appState.ready,
    season: state.memory.season,
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
        dispatch({type: 'CHANGE_SEASON'});
    }      
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);