import Presentation from '../components/Presentation';
import {connect} from 'react-redux';
 
const mapStateToProps = state => ({
    memoryCount: state.memory.memories.length,
    memories: state.memory.memories,
    index: state.memory.index,
});

const mapDispatchToProps = dispatch => ({
    changeIndex: dir => {
        dispatch({type: 'CHANGE_INDEX', payload: dir});
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Presentation);