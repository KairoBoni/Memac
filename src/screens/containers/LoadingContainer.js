import Loading from '../components/Loading';
import {connect} from 'react-redux';
import {getNotifications, listenAuthStatus} from '../../actions/';

const mapStateToProps = state => ({
    id: state.user.userId,
});

const mapDispatchToProps = dispatch => ({
    listenAuthStatus: async () => {
        await listenAuthStatus(payload => {
            dispatch({ type: 'LOGIN', payload});
            getNotifications(payload);
        });
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Loading);