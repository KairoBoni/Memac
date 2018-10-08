import Login from '../components/Login';
import {connect} from 'react-redux';
import {login, signUp, fbLogin} from '../../actions/';

const mapStateToProps = state => ({
    id: state.user.userId,
});

const mapDispatchToProps = dispatch => ({
    login: async (email, password) => { 
        const payload = await login(email, password);
        dispatch({ type: 'LOGIN', payload});
    },
    signUp: async (email, password) => {
        const payload = await signUp(email, password);
        dispatch({ type: 'LOGIN', payload});
    },
    fbLogin: async () => {
        const payload = await fbLogin();
        dispatch({ type: 'LOGIN', payload});
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);